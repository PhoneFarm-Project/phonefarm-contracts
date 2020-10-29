module.exports = async () => {
  try {
    require('dotenv').config();
    const { CONSTANTS } = require('../../constants');
    const MasterFactory = artifacts.require('MasterFactory');
    const PhoneToken = artifacts.require('PhoneToken');

    const masterFactoryInstance = await MasterFactory.deployed();

    const phoneTokenAddress = (await PhoneToken.deployed()).address;

    const receipt = await masterFactoryInstance.add(
      CONSTANTS[3].phoneAllocationPoint,
      phoneTokenAddress,
      false
    );

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
