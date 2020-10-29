require('dotenv').config();

var HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    // development: {
    //   host: '127.0.0.1',
    //   port: 8545,
    //   network_id: '*'
    // },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          process.env.OPERATOR_PRIVATE_KEY,
          'https://ropsten.infura.io/v3/'.concat(process.env.INFURA_PROJECT_ID)
        );
      },
      gas: 385281,
      network_id: 3
    }
  },
  rpc: {
    host: 'localhost',
    post: 8080
  },
  mocha: {
    useColors: true
  },
  compilers: {
    solc: {
      version: '0.6.6'
    }
  }
};
