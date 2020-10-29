require('dotenv').config();

const {
  transferIPhoneTokenOwnership,
  mintPhoneTokenForPreSale,
  addTokenToPreSale,
} = require('./masterFactoryScripts');

const { CONSTANTS } = require('../constants');

module.exports = async () => {
  try {
    console.log('Transfer IPHONE Token Ownership');
    await transferIPhoneTokenOwnership();
    console.log('Transfer Successfully!\n\n');

    console.log('Mint PHONE Token For PreSale');
    await mintPhoneTokenForPreSale();
    console.log('Mint Successfully!\n\n');

    // DAI
    console.log('Add DAI To PreSale');
    await addTokenToPreSale(CONSTANTS[process.env.NETWORK_ID].tokens.dai.address);
    console.log('Add DAI Successfully!\n\n');

    // LINK
    console.log('Add LINK To PreSale');
    await addTokenToPreSale(CONSTANTS[process.env.NETWORK_ID].tokens.link.address);
    console.log('Add LINK Successfully!\n\n');

    console.log('SETUP ALL SUCCESSFULLY!');

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
