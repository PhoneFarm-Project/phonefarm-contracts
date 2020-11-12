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
        symbol: 'UNI',
        address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      },
    ],
    poolTokens: [
      {
        symbol: 'DAI',
        address: '0xad6d458402f60fd3bd25163575031acdce07538d',
        allocationPoint: '1',
      },
      {
        symbol: 'UNI',
        address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        allocationPoint: '1',
      },
    ],
    contracts: {
      masterFactory: {
        address: '0xfa194fdf554B4d8FabFDD1408697fE9BD461dbc6',
      },
      phoneToken: {
        address: '0xC1186e2fAAF10D19A264aB16850B724AB99B7561',
      },
      iPhoneToken: {
        address: '0xdEf86B35655D1FCA6c0701Ec410faE1a10CE3548',
      },
      sale: {
        address: '0xCa83F16D41dDdE8a0bFF84be42fbdfFcF1eDF4aA',
      },
      store: {
        address: '0x16b8DE47f40497ad16FDd615633a717A7C5e9326',
      },
      devices: {
        address: '0x3332717b59136F9dDD16DE1405fE17a4AA12F2f2',
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
        address: '0xc5D2F05bfdd6b480B7eCeCcC6D333e19E669C66e',
      },
    },
    uniSwapV2FactoryAddress: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    preSaleAmount: '1000000000000000000000',
    saleAmount: '1000000000000000000000',
    iphonePerBlock: '100000000000000000000',
    startBlock: '7540000',
    bonusEndBlock: '7540100',
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

const IPHONE_1_SERIES = [
  // iPhone 1
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '1',
    color: 'Aluminum',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
];

const IPHONE_3_SERIES = [
  // iPhone 3
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '3',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 3S
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '3S',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
];

const IPHONE_4_SERIES = [
  // iPhone 4 Black
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '4',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 4 White
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '4',
    color: 'White',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 4S Black
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '4S',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 4S White
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '4S',
    color: 'White',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
];

const IPHONE_5_SERIES = [
  // iPhone 5 Black
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '5',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 5 White
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '5',
    color: 'White',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 5C Blue
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '5C',
    color: 'Blue',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 5C Green
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '5C',
    color: 'Green',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 5C Pink
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '5C',
    color: 'Pink',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 5C White
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '5C',
    color: 'White',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 5C Yellow
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '5C',
    color: 'Yellow',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 5S Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '5S',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 5S Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '5S',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 5S Black
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '5S',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
];

const IPHONE_6_SERIES = [
  // iPhone 6 Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6 Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6 SpaceGray
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6',
    color: 'SpaceGray',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6Plus Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6Plus',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6Plus Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6Plus',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6Plus SpaceGray
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6Plus',
    color: 'SpaceGray',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6S Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6S',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6S RoseGold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6S',
    color: 'RoseGold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6S Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6S',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6S SpaceGray
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6S',
    color: 'SpaceGray',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6SPlus Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6SPlus',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6SPlus RoseGold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6SPlus',
    color: 'RoseGold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6SPlus Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6SPlus',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 6SPlus SpaceGray
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '6SPlus',
    color: 'SpaceGray',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
];

const IPHONE_SE1_SERIES = [
  // iPhone SE1 Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'SE1',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone SE1 RoseGold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'SE1',
    color: 'RoseGold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone SE1 Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'SE1',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
];

const IPHONE_7_SERIES = [
  // iPhone 7 Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '7',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 7 RoseGold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '7',
    color: 'RoseGold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 7 Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '7',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 7 Black
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '7',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 7Plus Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '7Plus',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 7Plus RoseGold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '7Plus',
    color: 'RoseGold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 7Plus Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '7Plus',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 7Plus Black
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '7Plus',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
];

const IPHONE_8_SERIES = [
  // iPhone 8 Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '8',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 8 Red
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '8',
    color: 'Red',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 8 Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '8',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 8 SpaceGray
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '8',
    color: 'SpaceGray',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 8Plus Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '8Plus',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 8Plus Red
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '8Plus',
    color: 'Red',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 8Plus Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '8Plus',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 8Plus SpaceGray
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '8Plus',
    color: 'SpaceGray',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
];

const IPHONE_X_SERIES = [
  // iPhone X Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'X',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone X SpaceGray
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'X',
    color: 'SpaceGray',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone XR Red
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'XR',
    color: 'Red',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone XR Yellow
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'XR',
    color: 'Yellow',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone XR White
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'XR',
    color: 'White',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone XR Coral
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'XR',
    color: 'Coral',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone XR Black
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'XR',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone XR Blue
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'XR',
    color: 'Blue',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone XS Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'XS',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone XS SpaceGray
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'XS',
    color: 'SpaceGray',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone XS Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'XS',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone XSMax Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'XSMax',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone XSMax SpaceGray
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'XSMax',
    color: 'SpaceGray',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone XSMax Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'XSMax',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
];

const IPHONE_11_SERIES = [
  // iPhone 11 Yellow
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11',
    color: 'Yellow',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 11 Green
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11',
    color: 'Green',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 11 Black
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 11 White
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11',
    color: 'White',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 11 Red
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11',
    color: 'Red',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 11Pro MidnightGreen
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11Pro',
    color: 'MidnightGreen',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 11Pro SpaceGray
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11Pro',
    color: 'SpaceGray',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 11Pro Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11Pro',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 11Pro Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11Pro',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 11ProMax MidnightGreen
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11ProMax',
    color: 'MidnightGreen',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 11ProMax SpaceGray
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11ProMax',
    color: 'SpaceGray',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 11ProMax Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11ProMax',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 11ProMax Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '11ProMax',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
];

const IPHONE_SE2_SERIES = [
  // iPhone SE2 Black
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'SE2',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone SE2 White
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'SE2',
    color: 'White',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone SE2 Red
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: 'SE2',
    color: 'Red',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
];

const IPHONE_12_SERIES = [
  // iPhone 12Mini Black
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12Mini',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12Mini White
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12Mini',
    color: 'White',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12Mini Red
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12Mini',
    color: 'Red',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12Mini Green
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12Mini',
    color: 'Green',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12Mini Blue
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12Mini',
    color: 'Blue',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12 Black
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12',
    color: 'Black',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12 White
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12',
    color: 'White',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12 Red
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12',
    color: 'Red',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12 Green
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12',
    color: 'Green',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12 Blue
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12',
    color: 'Blue',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12Pro Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12Pro',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12Pro Graphite
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12Pro',
    color: 'Graphite',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12Pro Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12Pro',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12Pro PacificBlue
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12Pro',
    color: 'PacificBlue',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12ProMax Silver
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12ProMax',
    color: 'Silver',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12ProMax Graphite
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12ProMax',
    color: 'Graphite',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12ProMax Gold
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12ProMax',
    color: 'Gold',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
  // iPhone 12ProMax PacificBlue
  {
    maxSupply: '100',
    initSuply: '0',
    uri: '0x',
    model: '12ProMax',
    color: 'PacificBlue',
    price: (1 * 10 ** 18).toString(),
    data: '0x',
  },
];

const DEVICES = [
  ...IPHONE_1_SERIES,
  ...IPHONE_3_SERIES,
  ...IPHONE_4_SERIES,
  ...IPHONE_5_SERIES,
  ...IPHONE_6_SERIES,
  ...IPHONE_SE1_SERIES,
  ...IPHONE_7_SERIES,
  ...IPHONE_8_SERIES,
  ...IPHONE_X_SERIES,
  ...IPHONE_11_SERIES,
  ...IPHONE_SE2_SERIES,
  ...IPHONE_12_SERIES,
];

const UPDATE_SPEC = {
  specId: '1',
  model: '4',
  color: 'Black',
  price: (100 * 10 ** 18).toString(),
  others: '0x',
};

module.exports = { CONSTANTS, DEVICES, UPDATE_SPEC };
