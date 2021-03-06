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
    const Devices = artifacts.require('Devices');

    const devicesInstance = await Devices.at(CONSTANTS[networkId].contracts.devices.address);

    let receipt = await devicesInstance.approveStore(CONSTANTS[networkId].contracts.store.address);

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
