require('dotenv').config();

const BN = require('bn.js');

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/' + process.env.INFURA_PROJECT_ID);

const MasterFactory = require('../../client/src/contracts/MasterFactory.json');
const MasterFactoryAddress = MasterFactory.networks[process.env.NETWORK_ID].address;
const MasterFactoryContract = new web3.eth.Contract(MasterFactory.abi, MasterFactoryAddress);

const IPhoneToken = require('../../client/src/contracts/IPhoneToken.json');
const IPhoneTokenAddress = IPhoneToken.networks[process.env.NETWORK_ID].address;
const IPhoneTokenContract = new web3.eth.Contract(IPhoneToken.abi, IPhoneTokenAddress);

const PhoneToken = require('../../client/src/contracts/PhoneToken.json');
const PhoneTokenAddress = PhoneToken.networks[process.env.NETWORK_ID].address;
const PhoneTokenContract = new web3.eth.Contract(PhoneToken.abi, PhoneTokenAddress);

const PreSale = require('../../client/src/contracts/PreSale.json');
const PreSaleAddress = PreSale.networks[process.env.NETWORK_ID].address;
const PreSaleAmount = '1000000000000000000000';

const ERC20 = require('../../client/src/contracts/IERC20.json');

const operator = web3.eth.accounts.privateKeyToAccount(process.env.OPERATOR_PRIVATE_KEY);
web3.eth.accounts.wallet.add(operator);

const user1 = web3.eth.accounts.privateKeyToAccount(process.env.USER1_PRIVATE_KEY);
web3.eth.accounts.wallet.add(user1);

const user2 = web3.eth.accounts.privateKeyToAccount(process.env.USER2_PRIVATE_KEY);
web3.eth.accounts.wallet.add(user2);

const Tokens = [
  {
    symbol: 'DAI',
    name: 'DAI',
    address: '0xaD6D458402F60fD3Bd25163575031ACDce07538D'
  },
  {
    symbol: 'KNC',
    name: 'KNC',
    address: '0x4E470dc7321E84CA96FcAEDD0C8aBCebbAEB68C6'
  },
  {
    symbol: 'LINK',
    name: 'LINK',
    address: '0xb4f7332ed719Eb4839f091EDDB2A3bA309739521'
  },
  {
    symbol: 'PHONE',
    name: 'PHONE',
    address: require('../../client/src/contracts/PhoneToken.json').networks[process.env.NETWORK_ID]
      .address
  }
];

const getStartBlock = async function () {
  try {
    let startBlock = await MasterFactoryContract.methods.startBlock().call();
    console.log(startBlock);
    return startBlock;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getBonusEndBlock = async function () {
  try {
    let bonusEndBlock = await MasterFactoryContract.methods.bonusEndBlock().call();
    console.log(bonusEndBlock);
    return bonusEndBlock;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPoolLength = async function () {
  try {
    let poolLength = await MasterFactoryContract.methods.poolLength().call();
    console.log(poolLength);
    return poolLength;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPoolInfo = async function (poolId) {
  try {
    let poolInfo = await MasterFactoryContract.methods.poolInfo(poolId).call();
    console.log(poolInfo);
    return poolInfo;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getTotalAllocPoint = async function (poolId) {
  try {
    let totalAllocPoint = await MasterFactoryContract.methods.totalAllocPoint().call();
    console.log(totalAllocPoint);
    return totalAllocPoint;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addPool = async function (allocPoint, lpToken, withUpdate) {
  try {
    await MasterFactoryContract.methods
      .add(allocPoint, lpToken, withUpdate)
      .send({ from: operator.address, gas: process.env.ETH_GAS_LIMIT });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deposit = async function (poolId, amount) {
  try {
    const ERC20Address = Tokens[poolId].address;
    const ERC20Contract = new web3.eth.Contract(ERC20.abi, ERC20Address);

    await ERC20Contract.methods.approve(MasterFactoryAddress, amount).send({
      from: user1.address,
      gas: process.env.ETH_GAS_LIMIT
    });

    await MasterFactoryContract.methods
      .deposit(poolId, amount)
      .send({ from: user1.address, gas: process.env.ETH_GAS_LIMIT });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const depositFor = async function (beneficiary, poolId, amount) {
  try {
    const ERC20Address = Tokens[poolId].address;
    const ERC20Contract = new web3.eth.Contract(ERC20.abi, ERC20Address);

    await ERC20Contract.methods.approve(MasterFactoryAddress, amount).send({
      from: user1.address,
      gas: process.env.ETH_GAS_LIMIT
    });

    await MasterFactoryContract.methods
      .depositFor(beneficiary, poolId, amount)
      .send({ from: user1.address, gas: process.env.ETH_GAS_LIMIT });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const transferIPhoneTokenOwnership = async function () {
  try {
    await IPhoneTokenContract.methods.transferOwnership(MasterFactoryAddress).send({
      from: operator.address,
      gas: process.env.ETH_GAS_LIMIT
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUserInfo = async function (poolId, userAddress) {
  try {
    let userInfo = await MasterFactoryContract.methods.userInfo(poolId, userAddress).call();
    console.log(userInfo);
    return userInfo;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPendingIPhone = async function (poolId, userAddress) {
  try {
    let pendingIPhone = await MasterFactoryContract.methods
      .pendingIPhone(poolId, userAddress)
      .call();

    console.log(pendingIPhone);
    return pendingIPhone;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const iPhoneBalanceOf = async function (userAddress) {
  try {
    let balance = await IPhoneTokenContract.methods.balanceOf(userAddress).call();
    console.log(balance);
    return balance;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const withdraw = async function (poolId, amount) {
  try {
    await MasterFactoryContract.methods
      .withdraw(poolId, amount)
      .send({ from: user2.address, gas: process.env.ETH_GAS_LIMIT });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const emergencyWithdraw = async function (poolId) {
  try {
    await MasterFactoryContract.methods
      .emergencyWithdraw(poolId)
      .send({ from: user1.address, gas: process.env.ETH_GAS_LIMIT });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const mintPhoneTokenForPreSale = async function () {
  try {
    await PhoneTokenContract.methods
      .mint(PreSaleAddress, PreSaleAmount)
      .send({ from: operator.address, gas: process.env.ETH_GAS_LIMIT });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const mintPhoneToken = async function (_address, _amount) {
  try {
    await PhoneTokenContract.methods
      .mint(_address, _amount)
      .send({ from: operator.address, gas: process.env.ETH_GAS_LIMIT });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const phoneBalanceOf = async function (address) {
  try {
    let balance = await PhoneTokenContract.methods.balanceOf(address).call();
    console.log(balance);
    return balance;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// getTotalAllocPoint();
// getStartBlock();
// getBonusEndBlock();
// getPoolLength();
// getPoolInfo(0);
addPool(1, Tokens[0].address, false);
// transferIPhoneTokenOwnership();
// deposit(0, '1000000000000000000');
// getUserInfo(0, user2.address);
// getPendingIPhone(0, user1.address);
// depositFor(user2.address, 0, '1000000000000000000');
// iPhoneBalanceOf(user2.address);
// withdraw(0, '500000000000000000');
// emergencyWithdraw(0);
// phoneBalanceOf(PreSaleAddress);
// mintPhoneTokenForPreSale();
// mintPhoneToken('0x20c4E8bB8F76D99a89ce75cE28A3Cabc8fE4F9Dc', '10000000000000000000');

module.exports = {
  transferIPhoneTokenOwnership,
  mintPhoneTokenForPreSale
};
