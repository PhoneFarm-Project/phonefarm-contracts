const CONSTANTS = {
  // ropsten
  3: {
    weth: {
      address: '0xc778417e063141139fce010982780140aa0cd5ab',
      symbol: 'WETH',
    },
    preSaleTokens: [
      {
        symbol: 'DAI',
        address: '0xad6d458402f60fd3bd25163575031acdce07538d',
      },
      {
        symbol: 'LINK',
        address: '0xb4f7332ed719Eb4839f091EDDB2A3bA309739521',
      },
    ],
    saleTokens: [
      {
        symbol: 'DAI',
        address: '0xad6d458402f60fd3bd25163575031acdce07538d',
      },
      {
        symbol: 'LINK',
        address: '0xb4f7332ed719Eb4839f091EDDB2A3bA309739521',
      },
    ],
    poolTokens: [
      {
        symbol: 'DAI',
        address: '0xad6d458402f60fd3bd25163575031acdce07538d',
        allocationPoint: '1',
      },
      {
        symbol: 'LINK',
        address: '0xb4f7332ed719Eb4839f091EDDB2A3bA309739521',
        allocationPoint: '1',
      },
    ],
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
      sale: {
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
    saleAmount: '1000000000000000000000',
    iphonePerBlock: '100000000000000000000',
    startBlock: '8823360',
    bonusEndBlock: '8823400',
    phoneAllocationPoint: '5',
  },

  4: {
    weth: {
      address: '0xc778417e063141139fce010982780140aa0cd5ab',
      symbol: 'WETH',
    },
    preSaleTokens: [
      {
        symbol: 'DAI',
        address: '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735',
      },
    ],
    saleTokens: [
      {
        symbol: 'DAI',
        address: '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735',
      },
    ],
    poolTokens: [
      {
        symbol: 'DAI',
        address: '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735',
        allocationPoint: '1',
      },
    ],
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
      sale: {
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
    saleAmount: '1000000000000000000000',
    iphonePerBlock: '100000000000000000000',
    startBlock: '8823360',
    bonusEndBlock: '8823400',
    phoneAllocationPoint: '5',
  },

  // mainnet
  1: {
    weth: {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      symbol: 'WETH',
    },
    preSaleTokens: [
      {
        symbol: 'DAI',
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      },
      {
        symbol: 'LINK',
        address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      },
      {
        address: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
        symbol: 'BAND',
      },
    ],
    poolTokens: [
      {
        symbol: 'DAI',
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        allocationPoint: '1',
      },
      {
        symbol: 'LINK',
        address: '0x514910771af9ca656af840dff83e8264ecf986ca',
        allocationPoint: '1',
      },
      {
        address: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
        symbol: 'BAND',
        allocationPoint: '1',
      },
    ],
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
      sale: {
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
    saleAmount: '1000000000000000000000',
    iphonePerBlock: '100000000000000000000',
    startBlock: '8823360',
    bonusEndBlock: '8823400',
    phoneAllocationPoint: '5',
  },
};

module.exports = { CONSTANTS };
