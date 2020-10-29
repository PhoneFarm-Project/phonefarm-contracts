const CONSTANTS = {
  // ropsten
  3: {
    tokens: {
      dai: {
        address: '0xad6d458402f60fd3bd25163575031acdce07538d',
        symbol: 'DAI',
      },
      link: {
        address: '0xb4f7332ed719Eb4839f091EDDB2A3bA309739521',
        symbol: 'LINK',
      },
      weth: {
        address: '0xc778417e063141139fce010982780140aa0cd5ab',
        symbol: 'WETH',
      },
    },
    contracts: {
      masterFactory: {
        address: '0x6111Bdeb06fb24CC3dC13f308A0D5F44cB366Be3',
      },
      phoneToken: {
        address: '0x27deb7c2E1c2F5737c7A92C1421ce48c888695D5',
      },
      iPhoneToken: {
        address: '0x6f53C704026BaeEEC4d181F47E79FE17AB4bEaDe',
      },
      preSale: {
        address: '0xc709476b737eD41BbC4DF043078453B27F63CaCA',
      },
      store: {
        address: '0xD626def3CF2E01F8396cF67C89De5F55E5b9c7E9',
      },
      devices: {
        address: '0xe7Ca80c722938c8c76B3178F8c7b7A9bca2C9606',
      },
    },
    uniSwapV2FactoryAddress: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    preSaleAmount: '1000000000000000000000',
    iphonePerBlock: '100000000000000000000',
    startBlock: '8823360',
    bonusEndBlock: '8823400',
    phoneAllocationPoint: '5',
  },

  // mainnet
  1: {
    tokens: {
      dai: {
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        symbol: 'DAI',
      },
      link: {
        address: '0x514910771af9ca656af840dff83e8264ecf986ca',
        symbol: 'LINK',
      },
      band: {
        address: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
        symbol: 'BAND',
      },
      weth: {
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        symbol: 'WETH',
      },
    },
    contracts: {
      masterFactory: {
        address: '',
      },
      phoneToken: {
        address: '',
      },
      iPhoneToken: {
        address: '',
      },
      preSale: {
        address: '',
      },
      store: {
        address: '',
      },
      devices: {
        address: '',
      },
    },
    uniSwapV2FactoryAddress: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    preSaleAmount: '1000000000000000000000',
    iphonePerBlock: '100000000000000000000',
    startBlock: '8823360',
    bonusEndBlock: '8823400',
    phoneAllocationPoint: '5',
  },
};

module.exports = { CONSTANTS };
