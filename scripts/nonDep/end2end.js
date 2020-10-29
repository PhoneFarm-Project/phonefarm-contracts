module.exports = async () => {
  try {
    require('dotenv').config();

    let networkId;

    if (process.argv[5] == 'mainnet') {
      networkId = '1';
    } else if (process.argv[5] == 'ropsten') {
      networkId = '3';
    } else if (process.argv[5] == 'rinkeby') {
      networkId = '4';
    } else {
      throw new Error('Invalid Network ID!');
    }

    const { CONSTANTS } = require('../../constants');
    const IPhoneToken = artifacts.require('IPhoneToken');
    const PhoneToken = artifacts.require('Phone');
    const MasterFactory = artifacts.require('MasterFactory');
    const Devices = artifacts.require('Devices');
    const Sale = artifacts.require('Sale');

    const masterFactoryAddress = CONSTANTS[networkId].contracts.masterFactory.address;
    const saleAddress = CONSTANTS[networkId].contracts.sale.address;
    const storeAddress = CONSTANTS[networkId].contracts.store.address;
    const phoneTokenAddress = CONSTANTS[networkId].contracts.phoneToken.address;
    const iPhoneTokenAddress = CONSTANTS[networkId].contracts.iphoneToken.address;
    const devicesAddress = CONSTANTS[networkId].contracts.devices.address;

    const iPhoneTokenInstance = await IPhoneToken.at(iPhoneTokenAddress);
    const phoneTokenInstance = await PhoneToken.at(phoneTokenAddress);
    const masterFactoryInstance = await MasterFactory.at(masterFactoryAddress);
    const devicesInstance = await Devices.at(devicesAddress);
    const saleInstance = await Sale.at(saleAddress);

    console.log('Transfer IPHONE Token Ownership to MasterFacrory!');
    await iPhoneTokenInstance.transferOwnership(masterFactoryAddress);
    console.log('Transfer successfully!\n\n');

    console.log('Mint PHONE Token For Sale!');
    await phoneTokenInstance.mint(saleAddress, CONSTANTS[networkId].saleAmount);
    console.log('Mint successfully!\n\n');

    console.log('Approve Store!');
    await devicesInstance.approveStore(storeAddress);
    console.log('Approve Store successfully!\n\n');

    for (let i = 0; i < CONSTANTS[networkId].saleTokens.length; i++) {
      console.log(`Add ${CONSTANTS[networkId].saleTokens[i].symbol} to Sale!`);
      await saleInstance.addToken(CONSTANTS[networkId].saleTokens[i].address);
      console.log(`Add ${CONSTANTS[networkId].saleTokens[i].symbol} to Sale successfully!\n\n`);
    }

    console.log('Add PHONE Pool!');
    await masterFactoryInstance.add(
      CONSTANTS[networkId].phoneAllocationPoint,
      phoneTokenAddress,
      false
    );
    console.log('Add PHONE Pool successfully!\n\n');

    for (let i = 0; i < CONSTANTS[networkId].poolTokens.length; i++) {
      console.log(`Add ${CONSTANTS[networkId].poolTokens[i].symbol} Pool!`);
      await masterFactoryInstance.add(
        CONSTANTS[networkId].poolTokens[i].allocationPoint,
        CONSTANTS[networkId].poolTokens[i].address,
        false
      );
      console.log(`Add ${CONSTANTS[networkId].poolTokens[i].symbol} Pool successfully!\n\n`);
    }

    console.log('ALL SETUP SUCCESSFULLY!');

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
