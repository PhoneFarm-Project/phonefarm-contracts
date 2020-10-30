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

    const masterFactoryInstance = await MasterFactory.deployed();

    for (let i = 0; i < CONSTANTS[networkId].poolTokens.length; i++) {
      console.log(`Add ${CONSTANTS[networkId].poolTokens[i].symbol} Pool!`);
      await masterFactoryInstance.add(
        CONSTANTS[networkId].poolTokens[i].allocationPoint,
        CONSTANTS[networkId].poolTokens[i].address,
        false
      );
      console.log(`Add ${CONSTANTS[networkId].poolTokens[i].symbol} Pool successfully!\n\n`);
    }

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
