require('dotenv').config();
const { CONSTANTS } = require('../constants');
const PhoneToken = artifacts.require('PhoneToken');
const Sale = artifacts.require('Sale');
const IPhoneToken = artifacts.require('IPhoneToken');
const MasterFactory = artifacts.require('MasterFactory');
const Devices = artifacts.require('Devices');
const Store = artifacts.require('Store');

module.exports = async function (deployer) {
  try {
    const networkId = deployer.network_id;

    await deployer.deploy(PhoneToken);
    let phoneTokenAddress = PhoneToken.address;

    await deployer.deploy(
      Sale,
      phoneTokenAddress,
      CONSTANTS[networkId].weth.address,
      CONSTANTS[networkId].uniSwapV2FactoryAddress
    );
    // Deploy IPHONE Token
    const instanceIphone = await deployer.deploy(IPhoneToken);
    // Deploy Master Factory
    const masterFactory = await deployer.deploy(
      MasterFactory,
      IPhoneToken.address,
      process.env.OPERATOR_ADDRESS,
      CONSTANTS[networkId].iphonePerBlock,
      CONSTANTS[networkId].startBlock,
      CONSTANTS[networkId].bonusEndBlock
    );
    // Deploy Device
    const instanceDevice = await deployer.deploy(Devices);

    // Deploy Store
    const instanceStore = await deployer.deploy(
      Store,
      instanceDevice.address,
      instanceIphone.address
    );
  } catch (error) {
    console.log(error);
  }
  return;
};
