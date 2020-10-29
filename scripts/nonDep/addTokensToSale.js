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
    const Sale = artifacts.require('Sale');

    const saleInstance = await Sale.at(CONSTANTS[networkId].contracts.sale.address);

    for (let i = 0; i < CONSTANTS[networkId].saleTokens.length; i++) {
      console.log(`Add ${CONSTANTS[networkId].saleTokens[i].symbol} to Sale!`);
      await saleInstance.addToken(CONSTANTS[networkId].saleTokens[i].address);
      console.log(`Add ${CONSTANTS[networkId].saleTokens[i].symbol} to Sale successfully!\n\n`);
    }

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
