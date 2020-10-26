const PhoneToken = artifacts.require('PhoneToken');
const PreSale = artifacts.require('PreSale');
const IPhoneToken = artifacts.require('IPhoneToken');
const Factory = artifacts.require('Factory');
const MasterFactory = artifacts.require('MasterFactory');
const Devices = artifacts.require('Devices');
const Store = artifacts.require('Store');

module.exports = async function (deployer) {
  try {
    await deployer.deploy(PhoneToken);
    await deployer.deploy(PreSale, PhoneToken.address);
    const instanceIphone = await deployer.deploy(IPhoneToken);

    // await deployer.deploy(
    //   Factory,
    //   IPhoneToken.address,
    //   process.env.OPERATOR_ADDRESS,
    //   '100000000000000000000',
    //   '8823360',
    //   '8823400'
    // );

    const masterFactory = await deployer.deploy(
      MasterFactory,
      IPhoneToken.address,
      process.env.OPERATOR_ADDRESS,
      '100000000000000000000',
      '8823360',
      '8823400'
    );

    const instanceDevice = await deployer.deploy(Devices);

    const instanceStore = await deployer.deploy(
      Store,
      instanceDevice.address,
      instanceIphone.address
    );

    await instanceDevice.approveStore(instanceStore.address);
    await masterFactory.add(5, PhoneToken.address, false);
  } catch (error) {
    console.log(error);
  }
  return;
};
