/** @format */
module.exports = async () => {
  try {
    require('dotenv').config();
    const { CONSTANTS } = require('../../constants');
    const MasterFactory = artifacts.require('MasterFactory');

    const masterFactoryInstance = await MasterFactory.at(
      CONSTANTS[process.env.NETWORK_ID].contracts.masterFactory.address
    );

    let receipt = await masterFactoryInstance.add(
      CONSTANTS[process.env.NETWORK_ID].phoneAllocationPoint,
      CONSTANTS[process.env.NETWORK_ID].contracts.phoneToken.address,
      false
    );

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
