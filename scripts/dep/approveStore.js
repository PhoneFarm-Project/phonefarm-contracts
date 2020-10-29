/** @format */
module.exports = async () => {
  try {
    require('dotenv').config();
    const Devices = artifacts.require('Devices');
    const Store = artifacts.require('Store');

    const storeAddress = (await Store.deployed()).address;

    const devicesInstance = await Devices.deployed();

    let receipt = await devicesInstance.approveStore(storeAddress);

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
