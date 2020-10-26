require('dotenv').config();

var HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  contracts_build_directory: '../client/src/contracts',
  networks: {
    // development: {
    //   host: '127.0.0.1',
    //   port: 8545,
    //   network_id: '*'
    // },
    ropsten: {
      networkCheckTimeout: 100000,
      provider: function () {
        return new HDWalletProvider(
          process.env.OPERATOR_PRIVATE_KEY,
          'https://ropsten.infura.io/v3/'.concat(process.env.INFURA_PROJECT_ID)
        );
      },
      network_id: 3,
      gas: 6721975,
    },
  },
  rpc: {
    host: 'localhost',
    post: 8080,
  },
  mocha: {
    useColors: true,
  },
  compilers: {
    solc: {
      version: '0.6.6',
    },
  },
};
