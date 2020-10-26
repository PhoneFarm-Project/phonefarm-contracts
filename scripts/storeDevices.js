require('dotenv').config();

const BN = require('bn.js');

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/' + process.env.INFURA_PROJECT_ID);

const Store = require('../../client/src/contracts/Store.json');
const StoreAddress = Store.networks[process.env.NETWORK_ID].address;
const StoreContract = new web3.eth.Contract(Store.abi, StoreAddress);

const Devices = require('../../client/src/contracts/Devices.json');
const DevicesAddress = Devices.networks[process.env.NETWORK_ID].address;
const DevicesContract = new web3.eth.Contract(Devices.abi, DevicesAddress);

const IphoneToken = require('../../client/src/contracts/IPhoneToken.json');
const IphoneTokenAddress = IphoneToken.networks[process.env.NETWORK_ID].address;
const IphoneTokenContract = new web3.eth.Contract(IphoneToken.abi, IphoneTokenAddress);

exports.createDevice = async function (
  _maxSupply,
  _initialSupply,
  _uri,
  _model,
  _color,
  _price,
  _data
) {
  try {
    let operator = web3.eth.accounts.privateKeyToAccount(process.env.OPERATOR_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(operator);
    web3.eth.defaultAccount = operator.address;

    let res = await DevicesContract.methods
      .createDevice(_maxSupply, _initialSupply, _uri, _model, _color, _price, _data)
      .send({
        from: operator.address,
        gas: process.env.ETH_GAS_LIMIT,
        gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
      });
    console.log(res);
  } catch (e) {
    console.log('Error ', e);
  }
};

exports.updateSpec = async function (_id, _model, _color, _price, _others) {
  try {
    let operator = web3.eth.accounts.privateKeyToAccount(process.env.OPERATOR_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(operator);
    web3.eth.defaultAccount = operator.address;

    let res = await DevicesContract.methods.updateSpec(_id, _model, _color, _price, _others).send({
      from: operator.address,
      gas: process.env.ETH_GAS_LIMIT,
      gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
    });
    console.log(res);
  } catch (error) {
    console.log('Error', error);
  }
};

exports.revokeStore = async function (_storeAddress) {
  try {
    let operator = web3.eth.accounts.privateKeyToAccount(process.env.OPERATOR_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(operator);
    web3.eth.defaultAccount = operator.address;

    let res = await DevicesContract.methods.revokeStore(_storeAddress).send({
      from: operator.address,
      gas: process.env.ETH_GAS_LIMIT,
      gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
    });
    console.log(res);
  } catch (error) {
    console.log('Error', error);
  }
};

exports.approveStore = async function (_storeAddress) {
  try {
    let operator = web3.eth.accounts.privateKeyToAccount(process.env.OPERATOR_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(operator);
    web3.eth.defaultAccount = operator.address;

    let res = await DevicesContract.methods.approveStore(_storeAddress).send({
      from: operator.address,
      gas: process.env.ETH_GAS_LIMIT,
      gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
    });
    console.log(res);
  } catch (error) {
    console.log('Error', error);
  }
};

exports.getCurrentTokenId = async function () {
  try {
    let res = await DevicesContract.methods.getCurrentTokenId().call();
    console.log(res);
  } catch (error) {
    console.log('Error', error);
  }
};

exports.getAllSpecs = async function () {
  try {
    let res = await DevicesContract.methods.getAllSpecs().call();
    console.log(res);
  } catch (error) {
    console.log('Error', error);
  }
};

exports.getSpecsById = async function (_id) {
  try {
    let res = await DevicesContract.methods.getSpecsById(_id).call();
    console.log(res);
  } catch (error) {
    console.log('Error', error);
  }
};

exports.getSpecsByModel = async function (_model) {
  try {
    let res = await DevicesContract.methods.getSpecsByModel(_model).call();
    console.log(res);
  } catch (error) {
    console.log('Error', error);
  }
};

exports.totalSupply = async function (_id) {
  try {
    let res = await DevicesContract.methods.totalSupply(_id).call();
    console.log(res);
  } catch (error) {
    console.log('Error', error);
  }
};

exports.maxSupply = async function (_id) {
  try {
    let res = await DevicesContract.methods.maxSupply(_id).call();
    console.log(res);
  } catch (error) {
    console.log('Error', error);
  }
};

exports.getOwnedDevices = async function (_ownerAddress) {
  try {
    let res = await DevicesContract.methods.getOwnedDevices(_ownerAddress).call();
    let ownedDevices = [];
    for (let i = 0; i < res.length; i++) {
      let device = {};
      let deviceInfo = await DevicesContract.methods.getSpecsById(res[i]).call();
      let totalSupply = await DevicesContract.methods.totalSupply(res[i]).call();
      let maxSupply = await DevicesContract.methods.maxSupply(res[i]).call();
      let balance = await DevicesContract.methods.balanceOf(_ownerAddress, res[i]).call();
      device.id = res[i];
      device.totalSupply = totalSupply;
      device.maxSupply = maxSupply;
      device.model = deviceInfo.model;
      device.color = deviceInfo.color;
      device.price = deviceInfo.price;
      device.others = deviceInfo.others;
      device.balance = balance;
      ownedDevices.push(device);
    }
    console.log(ownedDevices);
  } catch (error) {
    console.log('Error', error);
  }
};

exports.approveIPhoneToken = async function (userPrivateKey, spender, amount) {
  try {
    let user = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
    web3.eth.accounts.wallet.add(user);
    web3.eth.defaultAccount = user.address;

    let res = await IphoneTokenContract.methods.approve(spender, amount).send({
      from: user.address,
      gas: process.env.ETH_GAS_LIMIT,
      gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
    });

    console.log(res);
  } catch (err) {
    console.log('Error', err);
    throw err;
  }
};

exports.buyDevices = async function (_id, _amount, _data, userPrivateKey) {
  try {
    let specs = await DevicesContract.methods.getSpecsById(_id).call();
    console.log(specs, (_amount * specs.price).toString());
    await this.approveIPhoneToken(userPrivateKey, StoreAddress, (_amount * specs.price).toString());

    let user = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
    web3.eth.accounts.wallet.add(user);
    web3.eth.defaultAccount = user.address;

    let result = await StoreContract.methods.buyDevices(_id, _amount, _data).send({
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

exports.getAllDevices = async function () {
  try {
    let currentTokenId = await DevicesContract.methods.getCurrentTokenId().call();
    let allDevices = [];
    for (let i = 1; i < currentTokenId; i++) {
      let device = {};
      let deviceInfo = await DevicesContract.methods.getSpecsById(i).call();
      let totalSupply = await DevicesContract.methods.totalSupply(i).call();
      let maxSupply = await DevicesContract.methods.maxSupply(i).call();
      device.id = i;
      device.totalSupply = totalSupply;
      device.maxSupply = maxSupply;
      device.model = deviceInfo.model;
      device.color = deviceInfo.color;
      device.price = deviceInfo.price;
      device.others = deviceInfo.others;
      allDevices.push(device);
    }
    console.log(allDevices);
  } catch (error) {
    console.log('Error', error);
  }
};
// this.createDevice('200', '0', '0x', '8', 'Space-Gray', (6 * 10 ** 18).toString(), '0x');
// this.getAllSpecs();
// this.getSpecsById(1);
// this.totalSupply(1);
// this.maxSupply(1);
// this.getOwnedDevices(process.env.USER2_ADDRESS);
// this.getAllDevices();
// this.buyDevices(1, 1, '0x', process.env.USER2_PRIVATE_KEY);
