const {
  transferIPhoneTokenOwnership,
  mintPhoneTokenForPreSale,
} = require('./masterFactoryScripts');

module.exports = async () => {
  try {
    await transferIPhoneTokenOwnership();
    await mintPhoneTokenForPreSale();
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
