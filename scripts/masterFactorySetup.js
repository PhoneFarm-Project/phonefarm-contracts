const {
  transferIPhoneTokenOwnership,
  mintPhoneTokenForPreSale,
  Tokens,
  addTokenToPreSale,
} = require('./masterFactoryScripts');

module.exports = async () => {
  try {
    await transferIPhoneTokenOwnership();
    await mintPhoneTokenForPreSale();

    // DAI
    await addTokenToPreSale(Tokens[0].address);

    // LINK
    await addTokenToPreSale(Tokens[2].address);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
