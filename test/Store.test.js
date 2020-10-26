const { expectRevert, BN } = require('@openzeppelin/test-helpers');
const Devices = artifacts.require('Devices');
const Store = artifacts.require('Store');
const IPhoneToken = artifacts.require('IPhoneToken');

contract('Store', ([owner, user]) => {
  beforeEach(async () => {
    this.devicesContract = await Devices.new({ from: owner });
    this.iPhoneTokenContract = await IPhoneToken.new({ from: owner });
    this.storeContract = await Store.new(
      this.devicesContract.address,
      this.iPhoneTokenContract.address,
      { from: owner }
    );
    await this.devicesContract.approveStore(this.storeContract.address, { from: owner });
    await this.devicesContract.createDevice(1000, 0, '0x', 'iphoneX', 'white', 5, '0x', {
      from: owner,
    });
    await this.iPhoneTokenContract.mint(user, 10000, { from: owner });
  });

  it('Can not buy device because not approve transfer token to contract store', async () => {
    await expectRevert(
      this.storeContract.buyDevices(1, 5, '0x', {
        from: user,
      }),
      'ERC20: transfer amount exceeds allowance'
    );
  });

  it('Can not buy device because do not enough iPhone token', async () => {
    this.iPhoneTokenContract.approve(this.storeContract.address, 10000, { from: user });
    await expectRevert(
      this.storeContract.buyDevices(1, 99999999, '0x', {
        from: user,
      }),
      'Not enough iPhone'
    );
  });

  it('User buy device successfully', async () => {
    this.iPhoneTokenContract.approve(this.storeContract.address, 10000, { from: user });
    const result = await this.storeContract.buyDevices(1, 100, '0x', {
      from: user,
    });

    const newBalance = await this.iPhoneTokenContract.balanceOf(user);
    assert.equal(result.receipt.status, true);
    assert.equal(newBalance, 9500);
  });

  it('Owner withdraw ERC20 successfully', async () => {
    this.iPhoneTokenContract.approve(this.storeContract.address, 10000, { from: user });
    await this.storeContract.buyDevices(1, 1000, '0x', {
      from: user,
    });

    const result = await this.storeContract.withdraw(5000, { from: owner });
    const balance = await this.iPhoneTokenContract.balanceOf(owner);

    assert.equal(result.receipt.status, true);
    assert.equal(balance, 5000);
  });

  it('User can not withdraw ERC20', async () => {
    this.iPhoneTokenContract.approve(this.storeContract.address, 10000, { from: user });
    await this.storeContract.buyDevices(1, 1000, '0x', {
      from: user,
    });

    await expectRevert(
      this.storeContract.withdraw(5000, { from: user }),
      'Ownable: caller is not the owner'
    );
  });
});
