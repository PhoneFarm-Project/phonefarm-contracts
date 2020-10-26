const PhoneToken = require('../../client/src/contracts/PhoneToken.json');
const PhoneTokenAddress = PhoneToken.networks[process.env.NETWORK_ID].address;

const PreSale = require('../../client/src/contracts/PreSale.json');
const PreSaleAddress = PreSale.networks[process.env.NETWORK_ID].address;

const Factory = require('../../client/src/contracts/Factory.json');
const FactoryAddress = Factory.networks[process.env.NETWORK_ID].address;

const script = require('./scripts');

module.exports = async () => {
  await script.setUp(PhoneTokenAddress);
  await script.transferOwnershipIphoneToken(FactoryAddress);
  await script.mintPhoneToken(PreSaleAddress, '1000000000000000000000');
};
