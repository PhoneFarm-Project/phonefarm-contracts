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

    const iPhoneTokenInstance = await IPhoneToken.at(
      CONSTANTS[networkId].contracts.iPhoneToken.address
    );

    const masterFactoryAddress = CONSTANTS[networkId].contracts.masterFactory.address;

    let receipt = await iPhoneTokenInstance.transferOwnership(masterFactoryAddress);

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
