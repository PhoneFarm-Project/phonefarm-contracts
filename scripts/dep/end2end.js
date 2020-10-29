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
    const MasterFactory = artifacts.require('MasterFactory');
    const PhoneToken = artifacts.require('PhoneToken');
    const Sale = artifacts.require('Sale');
    const Store = artifacts.require('Store');
    const Devices = artifacts.require('Devices');

    const iPhoneTokenInstance = await IPhoneToken.deployed();
    const masterFactoryInstance = await MasterFactory.deployed();
    const phoneTokenInstance = await PhoneToken.deployed();
    const saleInstance = await Sale.deployed();
    const storeInstance = await Store.deployed();
    const devicesInstance = await Devices.deployed();

    const saleAddress = saleInstance.address;
    const storeAddress = storeInstance.address;
    const masterFactoryAddress = masterFactoryInstance.address;
    const phoneTokenAddress = phoneTokenInstance.address;

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
