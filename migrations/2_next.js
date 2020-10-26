const PhoneToken = artifacts.require('PhoneToken');
const PreSale = artifacts.require('PreSale');
const IPhoneToken = artifacts.require('IPhoneToken');
const MasterFactory = artifacts.require('MasterFactory');
const Devices = artifacts.require('Devices');
const Store = artifacts.require('Store');
const WETH = '0xc778417e063141139fce010982780140aa0cd5ab';
const UniswapV2FactoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

module.exports = async function (deployer) {
  try {
    await deployer.deploy(PhoneToken);
    await deployer.deploy(PreSale, PhoneToken.address, WETH, UniswapV2FactoryAddress);
    const instanceIphone = await deployer.deploy(IPhoneToken);

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
