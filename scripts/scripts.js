require('dotenv').config();

const BN = require('bn.js');

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/' + process.env.INFURA_PROJECT_ID);

const Factory = require('../../client/src/contracts/Factory.json');
const FactoryAddress = Factory.networks[process.env.NETWORK_ID].address;
const FactoryContract = new web3.eth.Contract(Factory.abi, FactoryAddress);

const PhoneToken = require('../../client/src/contracts/PhoneToken.json');
const PhoneTokenAddress = PhoneToken.networks[process.env.NETWORK_ID].address;
const PhoneTokenContract = new web3.eth.Contract(PhoneToken.abi, PhoneTokenAddress);

const IphoneToken = require('../../client/src/contracts/IPhoneToken.json');
const IphoneTokenAddress = IphoneToken.networks[process.env.NETWORK_ID].address;
const IphoneTokenContract = new web3.eth.Contract(IphoneToken.abi, IphoneTokenAddress);

exports.getStartBlock = async function () {
  try {
    let startBlock = await FactoryContract.methods.startBlock().call();
    console.log(startBlock);
    return startBlock;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.setUp = async function (phoneTokenAddress) {
  try {
    let operator = web3.eth.accounts.privateKeyToAccount(process.env.OPERATOR_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(operator);
    web3.eth.defaultAccount = operator.address;

    let result = await FactoryContract.methods.setUp(phoneTokenAddress).send({
      from: operator.address,
      gas: process.env.ETH_GAS_LIMIT,
      gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
    });

    console.log(result);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.mintPhoneToken = async function (userAddress, amount) {
  try {
    let operator = web3.eth.accounts.privateKeyToAccount(process.env.OPERATOR_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(operator);
    web3.eth.defaultAccount = operator.address;

    let result = await PhoneTokenContract.methods.mint(userAddress, amount).send({
      from: operator.address,
      gas: process.env.ETH_GAS_LIMIT,
      gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
    });

    console.log(result);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.deposit = async function (userPrivateKey, amount) {
  try {
    await this.approvePhoneToken(userPrivateKey, FactoryAddress, amount);

    let user = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
    web3.eth.accounts.wallet.add(user);
    web3.eth.defaultAccount = user.address;

    let result = await FactoryContract.methods.deposit(amount).send({
      from: user.address,
      gas: process.env.ETH_GAS_LIMIT,
      gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
    });

    console.log(result);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.approvePhoneToken = async function (userPrivateKey, spender, amount) {
  try {
    let user = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
    web3.eth.accounts.wallet.add(user);
    web3.eth.defaultAccount = user.address;

    let result = await PhoneTokenContract.methods.approve(spender, amount).send({
      from: user.address,
      gas: process.env.ETH_GAS_LIMIT,
      gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
    });

    console.log(result);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.pendingIphone = async function (userAddress) {
  try {
    let pendingIphone = await FactoryContract.methods.pendingIPhone(userAddress).call();
    console.log(pendingIphone);
    return pendingIphone;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.lastRewardBlock = async function () {
  try {
    let lastRewardBlock = await FactoryContract.methods.lastRewardBlock().call();
    console.log(lastRewardBlock);
    return lastRewardBlock;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.accIPhonePerShare = async function () {
  try {
    let accIPhonePerShare = await FactoryContract.methods.accIPhonePerShare().call();
    console.log(accIPhonePerShare);
    return accIPhonePerShare;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.userInfo = async function (userAddress) {
  try {
    let userInfo = await FactoryContract.methods.userInfo(userAddress).call();
    console.log(userInfo);
    return userInfo;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.withdraw = async function (userPrivateKey, amount) {
  try {
    let user = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
    web3.eth.accounts.wallet.add(user);
    web3.eth.defaultAccount = user.address;

    let result = await FactoryContract.methods.withdraw(amount).send({
      from: user.address,
      gas: process.env.ETH_GAS_LIMIT,
      gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
    });

    console.log(result);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.transferOwnershipIphoneToken = async function (newOwnerAddress) {
  try {
    let operator = web3.eth.accounts.privateKeyToAccount(process.env.OPERATOR_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(operator);
    web3.eth.defaultAccount = operator.address;

    let result = await IphoneTokenContract.methods.transferOwnership(newOwnerAddress).send({
      from: operator.address,
      gas: process.env.ETH_GAS_LIMIT,
      gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
    });
    console.log(result);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.phoneBalanceOf = async function (userAddress) {
  try {
    let phoneBalance = await PhoneTokenContract.methods.balanceOf(userAddress).call();
    console.log(phoneBalance);
    return phoneBalance;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.phoneTotalSupply = async function () {
  try {
    let total = await PhoneTokenContract.methods.totalSupply().call();
    console.log(total);
    return total;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.iphoneBalanceOf = async function (userAddress) {
  try {
    let iphoneBalance = await IphoneTokenContract.methods.balanceOf(userAddress).call();
    console.log(iphoneBalance);
    return iphoneBalance;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.iphoneTotalSupply = async function () {
  try {
    let total = await IphoneTokenContract.methods.totalSupply().call();
    console.log(total);
    return total;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.claimIphone = async function (userPrivateKey) {
  try {
    let user = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
    web3.eth.accounts.wallet.add(user);
    web3.eth.defaultAccount = user.address;

    let result = await FactoryContract.methods.claimIphone().send({
      from: user.address,
      gas: process.env.ETH_GAS_LIMIT,
      gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
    });

    console.log(result);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// this.getStartBlock();
// this.setUp(PhoneTokenAddress);
// this.mintPhoneToken(process.env.USER1_ADDRESS, '1000000000000000000');
// this.deposit(process.env.USER1_PRIVATE_KEY, '500000000000000000');
// this.pendingIphone(process.env.USER2_ADDRESS);
// this.userInfo(process.env.USER1_ADDRESS);
// this.withdraw(process.env.USER1_PRIVATE_KEY, '10000000000000000');
// this.transferOwnershipIphoneToken(FactoryAddress);
// this.phoneBalanceOf(process.env.USER2_ADDRESS);
// this.iphoneBalanceOf(process.env.USER2_ADDRESS);
// this.iphoneBalanceOf(FactoryAddress);
// this.iphoneBalanceOf(process.env.OPERATOR_ADDRESS);
// this.claimIphone(process.env.USER1_PRIVATE_KEY);
// this.iphoneTotalSupply();
// this.phoneTotalSupply();
// this.phoneBalanceOf(FactoryAddress);
// this.lastRewardBlock();
// this.accIPhonePerShare();

// this.mintPhoneToken('0x20c4E8bB8F76D99a89ce75cE28A3Cabc8fE4F9Dc', '10000000000000000000');
// this.deposit(process.env.USER2_PRIVATE_KEY, '50000000000000000');
// this.userInfo(process.env.USER2_ADDRESS);
