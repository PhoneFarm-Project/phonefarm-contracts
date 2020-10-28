/** @format */
module.exports = async () => {
  try {
    require('dotenv').config();
    const { CONSTANTS } = require('../../constants');
    const Devices = artifacts.require('Devices');

    const devicesInstance = await Devices.at(
      CONSTANTS[process.env.NETWORK_ID].contracts.devices.address
    );

    let receipt = await devicesInstance.approveStore(
      CONSTANTS[process.env.NETWORK_ID].contracts.store.address
    );

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
