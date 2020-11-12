module.exports = async () => {
  try {
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

    if (!process.argv[6]) {
      throw new Error('Spec Id must be not null!');
    }

    let specId = process.argv[6];

    const Devices = artifacts.require('Devices');
    const { CONSTANTS } = require('../../constants');

    const devicesInstance = await Devices.at(CONSTANTS[networkId].contracts.devices.address);

    let result = await devicesInstance.getSpecsById(specId);
    console.log(result);

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
