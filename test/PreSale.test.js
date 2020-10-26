const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const PreSale = artifacts.require('PreSale');
const PhoneToken = artifacts.require('PhoneToken');

contract('PreSale', ([owner1, owner2, alice, bob]) => {
  beforeEach(async () => {
    this.phoneToken = await PhoneToken.new({ from: owner1 });
    this.preSale = await PreSale.new(this.phoneToken.address, { from: owner2 });
    this.defaultRate = 1000;
    await this.phoneToken.mint(this.preSale.address, '1000000', { from: owner1 });
  });

  it('alice buy more than total phone token in preSale', async () => {
    await expectRevert(
      this.preSale.buyTokenPhone({ from: alice, value: 1000000 }),
      'total phone token purchased must be less than preSaleBal'
    );
  });

  it('alice buy phone after locking', async () => {
    await this.preSale.changeLock({ from: owner2 });
    await expectRevert(
      this.preSale.buyTokenPhone({ from: alice, value: 1000000 }),
      'not in lock state'
    );
  });

  it('alice buy phone token successfully', async () => {
    let buyToken = await this.preSale.buyTokenPhone({ from: alice, value: 5 });
    let alicePhoneBal = await this.phoneToken.balanceOf(alice);
    assert.equal(5 * this.defaultRate, alicePhoneBal);
    expectEvent(buyToken, 'BuyToken', {
      buyer: alice,
      phoneAmount: (5 * this.defaultRate).toString(),
      rate: this.defaultRate.toString()
    });
  });

  it('change rate successfully', async () => {
    await this.preSale.changeRate(100, { from: owner2 });
    let newRate = await this.preSale.rate();
    assert.equal(newRate, 100);
  });

  it('change rate that is not owner', async () => {
    await expectRevert(
      this.preSale.changeRate(101, { from: bob }),
      'Ownable: caller is not the owner'
    );
  });

  it('change rate to 0', async () => {
    await expectRevert(
      this.preSale.changeRate(0, { from: owner2 }),
      '_newRate must be greater than 0'
    );
  });

  it('change lock not by owner', async () => {
    await expectRevert(this.preSale.changeLock({ from: bob }), 'Ownable: caller is not the owner');
  });

  it('change lock successfully', async () => {
    await this.preSale.changeLock({ from: owner2 });
    let lock = await this.preSale.lock({ from: owner2 });
    assert.equal(lock, true);
  });

  it('withdraw ETH successfully', async () => {
    await this.preSale.buyTokenPhone({ from: alice, value: 5 });
    await this.preSale.withdrawETH(4, { from: owner2 });
    let newEthBal = await this.preSale.getBalanceETH({ from: alice });
    assert.equal(newEthBal, 1);
  });

  it('withdraw more than balanace of contract', async () => {
    await expectRevert(
      this.preSale.withdrawETH(6, { from: owner2 }),
      '_amount must be less than the ETH balance of the contract'
    );
  });

  it('withdraw ETH not by owner', async () => {
    await expectRevert(
      this.preSale.withdrawETH(5, { from: bob }),
      'Ownable: caller is not the owner'
    );
  });

  it('withdraw 0 ETH', async () => {
    await expectRevert(
      this.preSale.withdrawETH(0, { from: owner2 }),
      '_amount must be greater than 0'
    );
  });

  it('withdraw Phone token successfully', async () => {
    await this.preSale.withdrawPHONE(1000000, { from: owner2 });
    let newPhoneBal = await this.phoneToken.balanceOf(this.preSale.address);
    assert.equal(newPhoneBal, 0);
  });

  it('withdraw more than balanace of contract', async () => {
    await expectRevert(
      this.preSale.withdrawPHONE(1000001, { from: owner2 }),
      '_amount must be less than the PHONE token balanceOf the contract'
    );
  });

  it('withdraw PHONE not by owner', async () => {
    await expectRevert(
      this.preSale.withdrawPHONE(5, { from: bob }),
      'Ownable: caller is not the owner'
    );
  });

  it('withdraw 0 PHONE', async () => {
    await expectRevert(
      this.preSale.withdrawPHONE(0, { from: owner2 }),
      '_amount must be greater than 0'
    );
  });
});
