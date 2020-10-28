/** @format */
module.exports = async () => {
  try {
    require('dotenv').config();
    const { CONSTANTS } = require('../../constants');
    const PhoneToken = artifacts.require('PhoneToken');

    const phoneTokenInstance = await PhoneToken.at(
      CONSTANTS[process.env.NETWORK_ID].contracts.phoneToken.address
    );

    let receipt = await phoneTokenInstance.mint(
      CONSTANTS[process.env.NETWORK_ID].contracts.preSale.address,
      CONSTANTS[process.env.NETWORK_ID].preSaleAmount
    );

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
