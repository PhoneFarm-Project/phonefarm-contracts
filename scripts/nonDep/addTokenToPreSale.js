module.exports = async () => {
  try {
    require('dotenv').config();
    const { CONSTANTS } = require('../../constants');
    const PreSale = artifacts.require('PreSale');

    const preSaleInstance = await PreSale.at(
      CONSTANTS[process.env.NETWORK_ID].contracts.preSale.address
    );

    for (let i = 0; i < CONSTANTS[process.env.NETWORK_ID].preSaleTokens.length; i++) {
      console.log(`Add ${CONSTANTS[process.env.NETWORK_ID].preSaleTokens[i].symbol} to PreSale!`);
      await preSaleInstance.addToken(CONSTANTS[process.env.NETWORK_ID].preSaleTokens[i].address);
      console.log(
        `Add ${
          CONSTANTS[process.env.NETWORK_ID].preSaleTokens[i].symbol
        } to PreSale successfully!\n\n`
      );
    }

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
