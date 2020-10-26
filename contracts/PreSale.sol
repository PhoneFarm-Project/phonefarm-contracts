// SPDX-License-Identifier: BoomerTeam
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./PhoneToken.sol";

interface IUniswapV2Pair {
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

interface IUniswapV2Factory {
    function getPair(address tokenA, address tokenB) external view returns (address pair);
}

contract PreSale is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for PhoneToken;

    address public WETH;
    address public uniswapV2FactoryAddress;

    mapping(address => bool) public tokensList;

    // The PHONE token!
    PhoneToken public phone;
    // Rate of token with ETH
    uint256 public rate;
    // lock presale
    bool public lock;

    modifier isAccepted(address _token) {
        require(_token != WETH && _token != address(phone), "Token is not accepted!");
        _;
    }

    // Constructor
    constructor(PhoneToken _phone, address _weth, address _uniswapV2FactoryAddress) public {
        phone = _phone;
        rate = 1000;
        lock = false;
        WETH = _weth;
        uniswapV2FactoryAddress = _uniswapV2FactoryAddress;
    }

    // Functions
    function lockIn() public onlyOwner {
        lock = true;
    }

    function unlock() public onlyOwner {
        lock = false;
    }

    /**
     * @dev change rate of token PHONE
     * @param _newRate is new rate of token PHONE with ETH
     */
    function changeRate(uint256 _newRate) public onlyOwner {
        require(_newRate > 0, "_newRate must be greater than 0");
        rate = _newRate;
    }

    event BuyToken(address indexed buyer, uint256 phoneAmount, uint256 rate);

    /**
     * @dev add token to tokensList
     * @param _token is address of the token
     */
    function addToken(address _token) public onlyOwner isAccepted(_token) {
        require(!tokensList[_token], "This token is already added!");
        tokensList[_token] = true;
    }

    /**
     * @dev remove token from tokensList
     * @param _token is address of the token
     */
    function removeToken(address _token) public onlyOwner isAccepted(_token) {
        require(tokensList[_token], "This token is already removed!");
        tokensList[_token] = false;
    }

    /**
     * @dev buy PHONE by ERRC20
     * @param _token is address of the token
     * @param _amount is amount of ERC20 token
     */
    function buyPhoneTokenByERC20(address _token, uint256 _amount) public isAccepted(_token){
        require(!lock, "not in lock state");
        require(tokensList[_token], "Token is not accepted!");

        uint256 preSaleBal = phone.balanceOf(address(this));
        uint256 phoneAmount = calculatePhoneTokenAmount(_token, _amount);

        require(
            phoneAmount <= preSaleBal,
            "total phone token purchased must be less than preSaleBal"
        );

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        phone.safeTransfer(msg.sender, phoneAmount);
        emit BuyToken(msg.sender, phoneAmount, rate);
    }


    function erc20ToPhoneToken(address _token, uint256 _amount) public view isAccepted(_token) returns (uint256){
        require(!lock, "not in lock state");
        require(tokensList[_token], "Token is not accepted!");

        uint256 phoneAmount = calculatePhoneTokenAmount(_token, _amount);
        return phoneAmount;
    }

    function calculatePhoneTokenAmount(address _token, uint256 _amount) internal view returns (uint256) {

        address pairAddress = IUniswapV2Factory(uniswapV2FactoryAddress).getPair(_token, WETH);
        (uint112 _reserve0, uint112 _reserve1,) = IUniswapV2Pair(pairAddress).getReserves();

        uint256 reserve0 = uint256(_reserve0);
        uint256 reserve1 = uint256(_reserve1);

        uint256 phoneAmount;
        if(_token < WETH) {
            phoneAmount = (_amount.mul(reserve1).div(reserve0)).mul(rate);
        } else {
            phoneAmount = (_amount.mul(reserve0).div(reserve1)).mul(rate);
        }

        return phoneAmount;
    }
    /**
     * @dev function buy token PHONE
     */
    function buyTokenPhone() public payable {
        require(!lock, "not in lock state");
        uint256 preSaleBal = phone.balanceOf(address(this));
        uint256 phoneAmount = (msg.value).mul(rate);
        require(
            phoneAmount <= preSaleBal,
            "total phone token purchased must be less than preSaleBal"
        );
        phone.safeTransfer(msg.sender, phoneAmount);
        emit BuyToken(msg.sender, phoneAmount, rate);
    }

    /**
     * @dev get balance ETH of contract
     */
    function getBalanceETH() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev get balanceOf PHONE token of contract
     */
    function getBalancePHONE() public view returns (uint256) {
        return phone.balanceOf(address(this));
    }

    /**
     * @dev function withdraw ETH to account owner
     * @param _amount is amount withdraw
     */
    function withdrawETH(uint256 _amount) public onlyOwner {
        require(_amount > 0, "_amount must be greater than 0");
        require(
            address(this).balance >= _amount,
            "_amount must be less than the ETH balance of the contract"
        );
        msg.sender.transfer(_amount);
    }

    /**
     * @dev function withdraw PHONE token to account owner
     * @param _amount is amount withdraw
     */
    function withdrawPHONE(uint256 _amount) public onlyOwner {
        require(_amount > 0, "_amount must be greater than 0");
        require(
            phone.balanceOf(address(this)) >= _amount,
            "_amount must be less than the PHONE token balanceOf the contract"
        );
        phone.safeTransfer(msg.sender, _amount);
    }

    event Received(address, uint256);

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
