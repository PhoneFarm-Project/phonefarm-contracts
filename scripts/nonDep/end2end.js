module.exports = async () => {
  try {
    require('dotenv').config();
    const { CONSTANTS } = require('../../constants');
    const IPhoneToken = artifacts.require('IPhoneToken');
    const PhoneToken = artifacts.require('Phone');
    const MasterFactory = artifacts.require('MasterFactory');
    const Devices = artifacts.require('Devices');
    const PreSale = artifacts.require('PreSale');

    const masterFactoryAddress = CONSTANTS[process.env.NETWORK_ID].contracts.masterFactory.address;
    const preSaleAddress = CONSTANTS[process.env.NETWORK_ID].contracts.preSale.address;
    const storeAddress = CONSTANTS[process.env.NETWORK_ID].contracts.store.address;
    const phoneTokenAddress = CONSTANTS[process.env.NETWORK_ID].contracts.phoneToken.address;
    const iPhoneTokenAddress = CONSTANTS[process.env.NETWORK_ID].contracts.iphoneToken.address;
    const devicesAddress = CONSTANTS[process.env.NETWORK_ID].contracts.devices.address;

    const iPhoneTokenInstance = await IPhoneToken.at(iPhoneTokenAddress);
    const phoneTokenInstance = await PhoneToken.at(phoneTokenAddress);
    const masterFactoryInstance = await MasterFactory.at(masterFactoryAddress);
    const devicesInstance = await Devices.at(devicesAddress);
    const preSaleInstance = await PreSale.at(preSaleAddress);

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
    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
