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
