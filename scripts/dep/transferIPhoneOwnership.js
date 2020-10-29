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

    const IPhoneToken = artifacts.require('IPhoneToken');
    const MasterFactory = artifacts.require('MasterFactory');

    const iPhoneTokenInstance = await IPhoneToken.deployed();

    const masterFactoryAddress = (await MasterFactory.deployed()).address;

    let receipt = await iPhoneTokenInstance.transferOwnership(masterFactoryAddress);

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
