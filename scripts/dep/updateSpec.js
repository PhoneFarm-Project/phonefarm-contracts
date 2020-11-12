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

    const Devices = artifacts.require('Devices');
    const { UPDATE_SPEC } = require('../../constants');

    const devicesInstance = await Devices.deployed();

    await devicesInstance.updateSpec(
      UPDATE_SPEC.specId,
      UPDATE_SPEC.model,
      UPDATE_SPEC.color,
      UPDATE_SPEC.price,
      UPDATE_SPEC.others
    );

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
