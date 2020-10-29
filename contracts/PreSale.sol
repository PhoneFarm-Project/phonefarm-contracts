// SPDX-License-Identifier: BoomerTeam
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./PhoneToken.sol";
import "./uniswapInterfaces/IUniswapFactory.sol";
import "./uniswapInterfaces/IUniswapPair.sol";

// interface IUniswapPair {
//     function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
// }

// interface IUniswapFactory {
//     function getPair(address tokenA, address tokenB) external view returns (address pair);
// }

contract PreSale is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for PhoneToken;

    address public WETH;
    address public uniswapV2FactoryAddress;

    mapping(address => bool) public tokensList;

    // The PHONE token!
    PhoneToken public phone;
    // Rate of token with ETH
    uint256 public rate = 2000;
    // lock private sale
    bool public lock = false;

    // List of addresses have purchased private sale
    mapping ( address => uint256) public purchased;
    // Purchase limit per address
    uint256 public purchaseLimit = (50 ether) * rate;
    // Time to sell private sale
    uint256 public duration = 7 days;
    // Time to start selling
    uint256 public startTime;

    modifier isAccepted(address _token) {
        require(_token != WETH && _token != address(phone), "Token is not accepted!");
        _;
    }

    // Check if the time for selling private sale has expired
    modifier saleInProgress() {
        require(now.sub(startTime) <= duration, "Private sale time has expired!");
        _;
    }

     // Check lock
    modifier notLock() {
        require(!lock, "not in lock state");
        _;
    }

    // Constructor
    constructor(
        PhoneToken _phone, address _weth, address _uniswapV2FactoryAddress) public {
        phone = _phone;
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
     * @dev change purchaseLimit
     * @param _limit is purchase limit per address
     */
    function changePurchaseLimit(uint256 _limit) public onlyOwner {
        require(_limit > 0, "_limit must be greater than 0");
        purchaseLimit = _limit;
    }

    /**
     * @dev change duration
     * @param _duration is time to sell private sale
     */
    function changeDuration(uint256 _duration) public onlyOwner {
        require(_duration > 0, "_duration must be greater than 0");
        purchaseLimit = _duration;
    }

    /**
     * @dev start time sell private sale
     */
    function startSale() public onlyOwner {
        startTime = now;
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
        require(!tokensList[_token], "This token was added!");
        tokensList[_token] = true;
    }

    /**
     * @dev remove token from tokensList
     * @param _token is address of the token
     */
    function removeToken(address _token) public onlyOwner isAccepted(_token) {
        require(tokensList[_token], "This token was removed!");
        tokensList[_token] = false;
    }

    /**
     * @dev buy PHONE by ERRC20
     * @param _token is address of the token
     * @param _amount is amount of ERC20 token
     */
    function buyByERC20(address _token, uint256 _amount) public notLock() saleInProgress() isAccepted(_token) {

        require(tokensList[_token], "Token is not accepted!");

        uint256 preSaleBal = phone.balanceOf(address(this));
        uint256 phoneAmount = calculatePhoneTokenAmount(_token, _amount);

        require(
            phoneAmount <= preSaleBal,
            "total phone token purchased must be less than preSaleBal"
        );

        require(purchased[msg.sender].add(phoneAmount) <= purchaseLimit, "Users cannot buy past the purchase limit!");

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        phone.safeTransfer(msg.sender, phoneAmount);
        purchased[msg.sender] = purchased[msg.sender].add(phoneAmount);
        emit BuyToken(msg.sender, phoneAmount, rate);
    }


    function erc20ToPhoneToken(address _token, uint256 _amount) public view notLock() isAccepted(_token) returns (uint256){
        require(tokensList[_token], "Token is not accepted!");

        uint256 phoneAmount = calculatePhoneTokenAmount(_token, _amount);
        return phoneAmount;
    }

    function calculatePhoneTokenAmount(address _token, uint256 _amount) internal view returns (uint256) {

        address pairAddress = IUniswapFactory(uniswapV2FactoryAddress).getPair(_token, WETH);
        (uint112 _reserve0, uint112 _reserve1,) = IUniswapPair(pairAddress).getReserves();

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
    function buyByETH() public payable notLock() saleInProgress() {
        uint256 preSaleBal = phone.balanceOf(address(this));
        uint256 phoneAmount = (msg.value).mul(rate);

        require(
            phoneAmount <= preSaleBal,
            "total phone token purchased must be less than preSaleBal"
        );

        require(purchased[msg.sender].add(phoneAmount) <= purchaseLimit, "purchase limit exceeded!");

        phone.safeTransfer(msg.sender, phoneAmount);
        purchased[msg.sender] = purchased[msg.sender].add(phoneAmount);
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

    /**
     * @dev function withdraw ERC20 token to account owner
     * @param _token is address of the token
     * @param _amount is amount withdraw
     */
    function withdrawERC20(address _token ,uint256 _amount) public onlyOwner {
        require(_amount > 0, "_amount must be greater than 0");
        require(
            IERC20(_token).balanceOf(address(this)) >= _amount,
            "The balance is not enough!"
        );
        IERC20(_token).transfer(msg.sender, _amount);
    }

    event Received(address, uint256);

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
