module.exports = async () => {
  try {
    require('dotenv').config();
    const { CONSTANTS } = require('../../constants');
    const PhoneToken = artifacts.require('PhoneToken');
    const PreSale = artifacts.require('PreSale');

    const preSaleAddress = (await PreSale.deployed()).address;

    const phoneTokenInstance = await PhoneToken.deployed();

    let receipt = await phoneTokenInstance.mint(
      preSaleAddress,
      CONSTANTS[process.env.NETWORK_ID].preSaleAmount
    );

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
