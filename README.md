<h1 align="center">
  <br>
      <img src="logo.png" alt="phonefarm logo" title="PhoneFarm"  height="200" />
  <br>
  PhoneFarm Finance
  <br>
</h1>

# PhoneFarm Smart Contracts

- `PhoneToken.sol` - PHONE token
- `IPhoneToken.sol` - iPhone token
- `Devices.sol` - iPhone NFT token
- `MasterFactory.sol` - Staking all management

# Deploy flow

## Remix version:

**Deploy pipeline**:

1. Deploy PhoneToken : add PhoneToken address to `/constants.js`
2. Deploy IPhoneToken : add IPhoneToken address to `/constants.js`
3. Deploy MasterFactory with params:

   - \_iPhone (address) : Address of IPhoneToken contract
   - \_devaddr (address): Address of dev to earn iPhoneToken reward per block
   - \_startBlock (uint256): Block when iPhone token starts being to farm
   - \_bonusEndBlock (uint256): Block when the bonus iPhone per block ends

4. Transfer IPhoneToken Ownership to MasterFactory:

   Run method **transferOwnership()** of IPhoneToken contract with param:

   - newOwner (address): Address of MasterFactory contract

     (`yarn nonDep:transferOwner`)

5. Deploy Devices : add Devices address to `/constants.js`

6. Deploy Store with params:

   - deviceContractAddress (address): Address of Device contract
   - iPhoneContractAddress (address): Address of IPhoneToken contract

7. Allow Store mint Device:

   Run method **approveStore()** of **Devices contract** with param:

   - store (address): Address of Store contract

   (`yarn nonDep:approveStore`)

8. Deploy PreSale contract with params:

   - \_phone (address): Address of PhoneToken contract
   - \_weth (address): address of WETH contract
   - \_uniswapV2FactoryAddress (address): Address of UniswapV2Factory contract

**Config**

- Mint Phone token:
  Run method **mint()** of PhoneToken contract with params:

  - \_to (address): address will be get phone token
  - \_amount (uint256): amount of phone will be minted for \_to

- Burn Phone token:
  Run method **burn()** of PhoneToken contract with params:

  - \_to (address): address will be burned phone token
  - \_amount (uint256): amount of phone will be burned

- Add pool staked for MasterFactory:

  Run method **add()** of MasterFactory contract with params:

  - \_allocPoint (uint256): allocation point of token
  - \_lpToken (address): address of token
  - \_withUpdate (bool): update all pools

  (`yarn nonDep:addPool`)

- Add new erc20 token(to buy Phone token) to Presale Contract:

  Run method **addToken()** of PreSale contract with params:

  - \_token (address): Address of ERC20 token

## Truffle version:

**Deploy pipeline**:

1. Config `iphonePerBlock, startBlock, bonusEndBlock` in file `constants.js`
2. Run `yarn dep:migrate`

## LICENSE

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](./LICENSE)

© 2020 - PhoneFarm Project
