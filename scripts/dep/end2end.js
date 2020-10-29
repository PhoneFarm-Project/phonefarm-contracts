module.exports = async () => {
  try {
    require('dotenv').config();
    const { CONSTANTS } = require('../../constants');
    const IPhoneToken = artifacts.require('IPhoneToken');
    const MasterFactory = artifacts.require('MasterFactory');
    const PhoneToken = artifacts.require('PhoneToken');
    const PreSale = artifacts.require('PreSale');
    const Store = artifacts.require('Store');
    const Devices = artifacts.require('Devices');

    const iPhoneTokenInstance = await IPhoneToken.deployed();
    const masterFactoryInstance = await MasterFactory.deployed();
    const phoneTokenInstance = await PhoneToken.deployed();
    const preSaleInstance = await PreSale.deployed();
    const storeInstance = await Store.deployed();
    const devicesInstance = await Devices.deployed();

    const preSaleAddress = preSaleInstance.address;
    const storeAddress = storeInstance.address;
    const masterFactoryAddress = masterFactoryInstance.address;
    const phoneTokenAddress = phoneTokenInstance.address;

    console.log('Transfer IPHONE Token Ownership to MasterFacrory!');
    await iPhoneTokenInstance.transferOwnership(masterFactoryAddress);
    console.log('Transfer successfully!\n\n');

    console.log('Mint PHONE Token For PreSale!');
    await phoneTokenInstance.mint(preSaleAddress, CONSTANTS[process.env.NETWORK_ID].preSaleAmount);
    console.log('Mint successfully!\n\n');

    console.log('Approve Store!');
    await devicesInstance.approveStore(storeAddress);
    console.log('Approve Store successfully!\n\n');

    for (let i = 0; i < CONSTANTS[process.env.NETWORK_ID].preSaleTokens.length; i++) {
      console.log(`Add ${CONSTANTS[process.env.NETWORK_ID].preSaleTokens[i].symbol} to PreSale!`);
      await preSaleInstance.addToken(CONSTANTS[process.env.NETWORK_ID].preSaleTokens[i].address);
      console.log(
        `Add ${
          CONSTANTS[process.env.NETWORK_ID].preSaleTokens[i].symbol
        } to PreSale successfully!\n\n`
      );
    }

    console.log('Add PHONE Pool!');
    await masterFactoryInstance.add(
      CONSTANTS[process.env.NETWORK_ID].phoneAllocationPoint,
      phoneTokenAddress,
      false
    );
    console.log('Add PHONE Pool successfully!\n\n');

    console.log('ALL SETUP SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
