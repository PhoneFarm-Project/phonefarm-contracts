const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const ether = require('@openzeppelin/test-helpers/src/ether');
const Sale = artifacts.require('Sale');
const PhoneToken = artifacts.require('PhoneToken');
const DaiToken = artifacts.require('DaiToken');
const WETH = artifacts.require('WETH');
const UniswapV2Factory = artifacts.require('UniswapV2Factory');
const UniswapV2Router02 = artifacts.require('UniswapV2Router02');
const IUniswapV2Pair = artifacts.require('IUniswapV2Pair');

const { expect } = require('chai');
const balance = require('@openzeppelin/test-helpers/src/balance');
const DAI_IN_POOL = ether('500');
const MIN_DAI = ether('400');
const WETH_IN_POOL = ether('1');
const SALE_AMOUNT = ether('10000');

const ALICE_BUY_BY_ETH = ether('1');
const ALICE_BUY_BY_DAI = ether('500');

const BOB_BUY_BY_DAI = ether('500');

contract('Sale', ([operator, poolMaker, alice, bob]) => {
  beforeEach(async () => {
    this.phoneToken = await PhoneToken.new({ from: operator });
    this.dai = await DaiToken.new({ from: operator });
    this.weth = await WETH.new({ from: operator });
    this.factory = await UniswapV2Factory.new(operator, { from: operator });

    this.sale = await Sale.new(this.phoneToken.address, this.weth.address, this.factory.address, {
      from: operator,
    });
    this.defaultRate = 1000;
    await this.phoneToken.mint(this.sale.address, SALE_AMOUNT, { from: operator });

    await this.dai.mint(poolMaker, DAI_IN_POOL, { from: operator });
    await this.factory.createPair(this.dai.address, this.weth.address, { from: poolMaker });

    this.router = await UniswapV2Router02.new(this.factory.address, this.weth.address, {
      from: operator,
    });

    await this.dai.approve(this.router.address, DAI_IN_POOL, { from: poolMaker });
    await this.router.addLiquidityETH(
      this.dai.address,
      DAI_IN_POOL,
      MIN_DAI,
      WETH_IN_POOL,
      poolMaker,
      { from: poolMaker, value: WETH_IN_POOL }
    );

    expect(await this.factory.getPair(this.dai.address, this.weth.address)).eq(
      await this.router.getPairFor(this.dai.address, this.weth.address)
    );

    let pairAddress = await this.factory.getPair(this.dai.address, this.weth.address);

    this.pair = await IUniswapV2Pair.at(pairAddress);

    let reserves = await this.pair.getReserves();

    // console.log(reserves);
    // expect(reserves.reserve0).to.be.bignumber.eq(DAI_IN_POOL);
    // expect(reserves.reserve1).to.be.bignumber.eq(WETH_IN_POOL);
  });

  it('Only operator can call lockIn(), unlock(), changeRate()...', async () => {
    await expectRevert(this.sale.lockIn({ from: bob }), 'Ownable: caller is not the owner');

    await expectRevert(this.sale.unlock({ from: bob }), 'Ownable: caller is not the owner');

    await expectRevert(
      this.sale.changeRate(2000, { from: bob }),
      'Ownable: caller is not the owner'
    );

    await expectRevert(
      this.sale.addToken(this.dai.address, { from: bob }),
      'Ownable: caller is not the owner'
    );

    await expectRevert(
      this.sale.withdrawETH(ether('1'), { from: bob }),
      'Ownable: caller is not the owner'
    );

    await expectRevert(
      this.sale.withdrawPHONE(ether('1'), { from: bob }),
      'Ownable: caller is not the owner'
    );

    await expectRevert(
      this.sale.withdrawERC20(this.dai.address, ether('1'), { from: bob }),
      'Ownable: caller is not the owner'
    );
  });

  it('change rate to 0', async () => {
    await expectRevert(
      this.sale.changeRate(0, { from: operator }),
      '_newRate must be greater than 0'
    );
  });

  it('change rate successfully', async () => {
    await this.sale.changeRate(100, { from: operator });
    let newRate = await this.sale.rate();
    assert.equal(newRate, 100);
  });

  it('lockIn successfully', async () => {
    await this.sale.lockIn({ from: operator });
    let lock = await this.sale.lock({ from: operator });
    assert.equal(lock, true);
  });

  it('unlock successfully', async () => {
    await this.sale.unlock({ from: operator });
    let lock = await this.sale.lock({ from: operator });
    assert.equal(lock, false);
  });

  it('alice buy more than total phone token in Sale ', async () => {
    await expectRevert(
      this.sale.buyTokenPhone({ from: alice, value: ether('100') }),
      'total phone token purchased must be less than saleBal'
    );
  });

  it('alice buy phone after locking', async () => {
    await this.sale.lockIn({ from: operator });
    await expectRevert(
      this.sale.buyTokenPhone({ from: alice, value: ALICE_BUY_BY_ETH }),
      'not in lock state'
    );
  });

  it('alice buy phone token by eth successfully', async () => {
    let buyToken = await this.sale.buyTokenPhone({ from: alice, value: ALICE_BUY_BY_ETH });
    let alicePhoneBal = await this.phoneToken.balanceOf(alice);
    assert.equal(ALICE_BUY_BY_ETH * this.defaultRate, alicePhoneBal);
    expectEvent(buyToken, 'BuyToken', {
      buyer: alice,
      phoneAmount: ether('1000'),
      rate: this.defaultRate.toString(),
    });
  });

  it('alice buy phone by dai fail because dai has not added!', async () => {
    await this.dai.mint(alice, ALICE_BUY_BY_DAI, { from: operator });
    await this.dai.approve(this.sale.address, ALICE_BUY_BY_DAI, { from: alice });
    expectRevert(
      this.sale.buyPhoneTokenByERC20(this.dai.address, ALICE_BUY_BY_DAI, { from: alice }),
      'Token is not accepted!'
    );
  });

  it('alice buy phone token by dai successfully', async () => {
    await this.dai.mint(alice, ALICE_BUY_BY_DAI, { from: operator });
    await this.dai.approve(this.sale.address, ALICE_BUY_BY_DAI, { from: alice });
    await this.sale.addToken(this.dai.address, { from: operator });

    let buyToken = await this.sale.buyPhoneTokenByERC20(this.dai.address, ALICE_BUY_BY_DAI, {
      from: alice,
    });
    let alicePhoneBal = await this.phoneToken.balanceOf(alice);

    let expectedAlicePhoneBalance =
      ((ALICE_BUY_BY_DAI * WETH_IN_POOL) / DAI_IN_POOL) * this.defaultRate;
    assert.equal(expectedAlicePhoneBalance, alicePhoneBal);
    expectEvent(buyToken, 'BuyToken', {
      buyer: alice,
      phoneAmount: ether('1000'),
      rate: this.defaultRate.toString(),
    });
  });

  it('withdraw ETH successfully', async () => {
    await this.sale.buyTokenPhone({ from: alice, value: ether('1') });
    await this.sale.withdrawETH(ether('1'), { from: operator });
    let newEthBal = await this.sale.getBalanceETH({ from: operator });
    assert.equal(newEthBal, 0);
  });

  it('withdraw more than balanace of contract', async () => {
    await expectRevert(
      this.sale.withdrawETH(ether('1'), { from: operator }),
      '_amount must be less than the ETH balance of the contract'
    );
  });

  it('withdraw 0 ETH', async () => {
    await expectRevert(
      this.sale.withdrawETH(0, { from: operator }),
      '_amount must be greater than 0'
    );
  });

  it('withdraw Phone token successfully', async () => {
    await this.sale.withdrawPHONE(ether('10000'), { from: operator });
    let newPhoneBal = await this.phoneToken.balanceOf(this.sale.address);
    assert.equal(newPhoneBal, 0);
  });

  it('withdraw more than balanace of contract', async () => {
    await expectRevert(
      this.sale.withdrawPHONE(ether('10001'), { from: operator }),
      '_amount must be less than the PHONE token balanceOf the contract'
    );
  });

  it('withdraw 0 PHONE', async () => {
    await expectRevert(
      this.sale.withdrawPHONE(0, { from: operator }),
      '_amount must be greater than 0'
    );
  });

  it('withdraw ERC20 successfully', async () => {
    await this.dai.mint(alice, ALICE_BUY_BY_DAI, { from: operator });
    await this.dai.approve(this.sale.address, ALICE_BUY_BY_DAI, { from: alice });
    await this.sale.addToken(this.dai.address, { from: operator });
    await this.sale.buyPhoneTokenByERC20(this.dai.address, ALICE_BUY_BY_DAI, { from: alice });
    await this.sale.withdrawERC20(this.dai.address, ALICE_BUY_BY_DAI, { from: operator });

    expect(await this.dai.balanceOf(operator)).to.be.bignumber.eq(ALICE_BUY_BY_DAI);
  });

  it('bob buy first, alice buy phone by DAI after bob swap', async () => {
    await this.dai.mint(bob, BOB_BUY_BY_DAI, { from: operator });
    await this.dai.approve(this.sale.address, BOB_BUY_BY_DAI, { from: bob });
    await this.sale.addToken(this.dai.address, { from: operator });

    await this.sale.buyPhoneTokenByERC20(this.dai.address, BOB_BUY_BY_DAI, {
      from: bob,
    });
    let bobPhoneBal = await this.phoneToken.balanceOf(bob);

    let expectedBobPhoneBalance =
      ((BOB_BUY_BY_DAI * WETH_IN_POOL) / DAI_IN_POOL) * this.defaultRate;
    assert.equal(expectedBobPhoneBalance, bobPhoneBal);

    await this.router.swapExactETHForTokens(
      ether('40'),
      [this.weth.address, this.dai.address],
      bob,
      0,
      { from: bob, value: ether('0.2') }
    );

    let reserves = await this.pair.getReserves();
    let daiReserve = reserves.reserve0;
    let ethReserve = reserves.reserve1;

    if (this.dai.address < this.weth.address) {
      daiReserve = reserves.reserve0;
      ethReserve = reserves.reserve1;
    } else {
      daiReserve = reserves.reserve1;
      ethReserve = reserves.reserve0;
    }
    await this.dai.mint(alice, ALICE_BUY_BY_DAI, { from: operator });
    await this.dai.approve(this.sale.address, ALICE_BUY_BY_DAI, { from: alice });

    await this.sale.buyPhoneTokenByERC20(this.dai.address, ALICE_BUY_BY_DAI, {
      from: alice,
    });
    let alicePhoneBal = await this.phoneToken.balanceOf(alice);

    let expectedAlicePhoneBalance =
      ((ALICE_BUY_BY_DAI * ethReserve) / daiReserve) * this.defaultRate;

    assert.equal(expectedAlicePhoneBalance, alicePhoneBal);
  });
});
