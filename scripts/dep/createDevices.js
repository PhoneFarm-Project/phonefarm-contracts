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
    const { DEVICES } = require('../../constants');

    const devicesInstance = await Devices.deployed();
    for (let i = 0; i < DEVICES.length; i++) {
      console.log(`Create ${DEVICES[i].model} ${DEVICES[i].color}...`);
      await devicesInstance.createDevice(
        DEVICES[i].maxSupply,
        DEVICES[i].initSuply,
        DEVICES[i].uri,
        DEVICES[i].model,
        DEVICES[i].color,
        DEVICES[i].price,
        DEVICES[i].data
      );
      console.log(`Create ${DEVICES[i].model} ${DEVICES[i].color} Successfully!\n\n`);
    }

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
