const { expectRevert } = require('@openzeppelin/test-helpers');
const Devices = artifacts.require('Devices');
const Store = artifacts.require('Store');
const IPhoneToken = artifacts.require('IPhoneToken');

contract('Devices', ([owner, user]) => {
  beforeEach(async () => {
    this.devicesContract = await Devices.new({ from: owner });
    this.iPhoneTokenContract = await IPhoneToken.new({ from: owner });
    this.storeContract = await Store.new(
      this.devicesContract.address,
      this.iPhoneTokenContract.address,
      { from: owner }
    );
    await this.devicesContract.approveStore(this.storeContract.address, { from: owner });
  });

  it('User account can not approve store', async () => {
    await expectRevert(
      this.devicesContract.approveStore(user, { from: user }),
      'Ownable: caller is not the owner'
    );
  });

  it('Revert with store address is address(0)', async () => {
    await expectRevert(
      this.devicesContract.approveStore('0x0000000000000000000000000000000000000000', {
        from: owner,
      }),
      'store contract addess must be different address(0)'
    );
  });

  it('Owner can approve store', async () => {
    await this.devicesContract.approveStore(this.storeContract.address, {
      from: owner,
    });

    const result = await this.devicesContract.isApprovedStore(this.storeContract.address);

    assert.equal(result, true);
  });

  it('User account can not revoke store', async () => {
    await expectRevert(
      this.devicesContract.revokeStore(user, { from: user }),
      'Ownable: caller is not the owner'
    );
  });

  it('Revert with store address is address(0)', async () => {
    await expectRevert(
      this.devicesContract.revokeStore('0x0000000000000000000000000000000000000000', {
        from: owner,
      }),
      'store contract addess must be different address(0)'
    );
  });

  it('Owner can revoke store', async () => {
    await this.devicesContract.revokeStore(this.storeContract.address, {
      from: owner,
    });

    const result = await this.devicesContract.isApprovedStore(this.storeContract.address);

    assert.equal(result, false);
  });

  it('Revert when call function mint with owner', async () => {
    await expectRevert(
      this.devicesContract.mint(owner, 0, 100000, '0x', { from: owner }),
      'Only approved store can mint token.'
    );
  });

  it('Revert when call function mint with user', async () => {
    await expectRevert(
      this.devicesContract.mint(user, 0, 100000, '0x', { from: user }),
      'Only approved store can mint token.'
    );
  });

  it('Revert when call function mint with id too large', async () => {
    await expectRevert(
      this.devicesContract.mint(user, 1000000000, 100000, '0x', {
        from: this.storeContract.address,
      }),
      'Id not found'
    );
  });

  it('User account can not create device', async () => {
    await expectRevert(
      this.devicesContract.createDevice(1000, 1000, '0x', 'iphoneX', 'white', 100000, '0x', {
        from: user,
      }),
      'Ownable: caller is not the owner'
    );
  });

  it('Owner account can create device', async () => {
    const result = await this.devicesContract.createDevice(
      1000,
      1000,
      '0x',
      'iphoneX',
      'white',
      100000,
      '0x',
      {
        from: owner,
      }
    );

    const specs = await this.devicesContract.getAllSpecs();
    const device = await this.devicesContract.getSpecsById(1);

    assert.equal(specs.length, 2);
    assert.equal(device.color, 'white');
    assert.equal(device.model, 'iphoneX');
  });

  it('User account can not update specs', async () => {
    await expectRevert(
      this.devicesContract.updateSpec(0, 'iphoneX', 'white', 100000, '0x', {
        from: user,
      }),
      'Ownable: caller is not the owner'
    );
  });

  it('Owner account can update specs', async () => {
    await this.devicesContract.updateSpec(0, 'iphoneX', 'white', 100000, '0x', {
      from: owner,
    });

    const specs = await this.devicesContract.getAllSpecs();
    assert.equal(specs.length, 1);
    assert.equal(specs[0].color, 'white');
    assert.equal(specs[0].model, 'iphoneX');
  });
});
