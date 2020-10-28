/** @format */
module.exports = async () => {
  try {
    require('dotenv').config();
    const { CONSTANTS } = require('../../constants');
    const PreSale = artifacts.require('PreSale');

    const preSaleInstance = await PreSale.at(
      CONSTANTS[process.env.NETWORK_ID].contracts.preSale.address
    );

    let receipt = await preSaleInstance.addToken(
      CONSTANTS[process.env.NETWORK_ID].tokens.dai.address
    );

    console.log(receipt);

    receipt = await preSaleInstance.addToken(CONSTANTS[process.env.NETWORK_ID].tokens.link.address);

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
