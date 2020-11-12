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

    if (process.argv.length < 8) {
      throw new Error('Model and Color must be not null');
    }

    let model = process.argv[6];
    let color = process.argv[7];

    const Devices = artifacts.require('Devices');

    const devicesInstance = await Devices.deployed();

    let result = await devicesInstance.getSpecsByModel(model, color);
    console.log(result);

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
