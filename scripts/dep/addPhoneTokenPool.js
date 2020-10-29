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
    const MasterFactory = artifacts.require('MasterFactory');
    const PhoneToken = artifacts.require('PhoneToken');

    const masterFactoryInstance = await MasterFactory.deployed();

    const phoneTokenAddress = (await PhoneToken.deployed()).address;

    const receipt = await masterFactoryInstance.add(
      CONSTANTS[networkId].phoneAllocationPoint,
      phoneTokenAddress,
      false
    );

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
