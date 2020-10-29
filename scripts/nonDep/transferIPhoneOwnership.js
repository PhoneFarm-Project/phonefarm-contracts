module.exports = async () => {
  try {
    require('dotenv').config();
    const { CONSTANTS } = require('../../constants');
    const IPhoneToken = artifacts.require('IPhoneToken');

    const iPhoneTokenInstance = await IPhoneToken.at(
      CONSTANTS[process.env.NETWORK_ID].contracts.iPhoneToken.address
    );

    const masterFactoryAddress = CONSTANTS[process.env.NETWORK_ID].contracts.masterFactory.address;

    let receipt = await iPhoneTokenInstance.transferOwnership(masterFactoryAddress);

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
