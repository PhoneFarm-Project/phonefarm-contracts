const PreSale = artifacts.require('PreSale');
const { CONSTANTS } = require('../constants');
const PhoneToken = artifacts.require('PhoneToken');

module.exports = async function (deployer) {
  try {
    const networkId = deployer.network_id;
    const phoneTokenAddress = (await PhoneToken.deployed()).address;
    await deployer.deploy(
      PreSale,
      phoneTokenAddress,
      CONSTANTS[networkId].weth.address,
      CONSTANTS[networkId].uniSwapV2FactoryAddress
    );
  } catch (error) {
    console.log(error);
  }
  return;
};
