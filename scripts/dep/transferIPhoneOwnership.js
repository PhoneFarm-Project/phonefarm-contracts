module.exports = async () => {
  try {
    require('dotenv').config();
    const IPhoneToken = artifacts.require('IPhoneToken');
    const MasterFactory = artifacts.require('MasterFactory');

    const iPhoneTokenInstance = await IPhoneToken.deployed();

    const masterFactoryAddress = (await MasterFactory.deployed()).address;

    let receipt = await iPhoneTokenInstance.transferOwnership(masterFactoryAddress);

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
