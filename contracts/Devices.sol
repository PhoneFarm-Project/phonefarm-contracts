pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

pragma experimental ABIEncoderV2;

contract Devices is ERC1155, Ownable {
    using SafeMath for uint256;

    mapping(uint256 => uint256) public tokenSupply;
    mapping(uint256 => uint256) public tokenMaxSupply;

    struct Spec {
        string model;
        string color;
        uint256 price;
        bytes others;
    }

    Spec[] private specs;

    mapping(string => mapping(string => uint256)) private modelToSpecId;

    mapping(address => bool) private _approvedStores;

    mapping(address => uint256[]) private ownedDevices;

    uint256 private _currentTokenId = 1;

    constructor() public ERC1155("") {
        createNewSpec("iPhoneGenesis", "red", 1000000000, "");
    }

    function approveStore(address store) public onlyOwner {
        require(
            store != address(0),
            "store contract addess must be different address(0)"
        );
        _approvedStores[store] = true;
    }

    function revokeStore(address store) public onlyOwner {
        require(
            store != address(0),
            "store contract addess must be different address(0)"
        );
        _approvedStores[store] = false;
    }

    function isApprovedStore(address store) external view returns (bool) {
        require(
            store != address(0),
            "store contract addess must be different address(0)"
        );
        return _approvedStores[store];
    }

    function getCurrentTokenId() external view returns (uint256) {
        return _currentTokenId;
    }

    function getAllSpecs() public view returns (Spec[] memory) {
        return specs;
    }

    function getOwnedDevices(address account)
        public
        view
        returns (uint256[] memory)
    {
        return ownedDevices[account];
    }

    function getSpecsById(uint256 specId) public view returns (Spec memory) {
        require(specId < specs.length, "Spec does not exist");
        return specs[specId];
    }

    function getSpecsByModel(string memory model, string memory color)
        public
        view
        returns (Spec memory)
    {
        uint256 specId = modelToSpecId[model][color];

        if (specId != 0) return specs[specId];
    }

    function createNewSpec(
        string memory model,
        string memory color,
        uint256 price,
        bytes memory others
    ) internal onlyOwner returns (uint256) {
        require(modelToSpecId[model][color] == 0, "spec already exists");
        specs.push(Spec(model, color, price, others));
        return specs.length - 1;
    }

    function updateSpec(
        uint256 id,
        string calldata model,
        string calldata color,
        uint256 price,
        bytes calldata others
    ) external onlyOwner {
        require(id < _currentTokenId && id > 0, "invalid spec id");
        Spec storage spec = specs[id];
        modelToSpecId[spec.model][spec.color] = 0;
        specs[id] = Spec(model, color, price, others);
        modelToSpecId[model][color] = id;
    }

    function _incrementTokenTypeId() private {
        _currentTokenId = _currentTokenId.add(1);
    }

    function totalSupply(uint256 id) public view returns (uint256) {
        return tokenSupply[id];
    }

    function increaseTotalSupply(uint256 id, uint256 amount) public {
        require(
            _approvedStores[msg.sender] == true,
            "Only approved store can mint token."
        );
        tokenSupply[id] = tokenSupply[id].add(amount);
    }

    function maxSupply(uint256 id) public view returns (uint256) {
        return tokenMaxSupply[id];
    }

    function isOwned(address account, uint256 id) public view returns (bool) {
        uint256[] memory devices = ownedDevices[account];
        for (uint256 i = 0; i < devices.length; i++) {
            if (devices[i] == id) return true;
        }
        return false;
    }

    function createDevice(
        uint256 _maxSupply,
        uint256 _initialSupply,
        string calldata uri,
        string calldata model,
        string calldata color,
        uint256 price,
        bytes calldata data
    ) external onlyOwner returns (uint256 tokenId) {
        require(
            _initialSupply <= _maxSupply,
            "Initial supply cannot be more max supply"
        );
        uint256 id = _currentTokenId;

        if (bytes(uri).length > 0) {
            emit URI(uri, id);
        }

        if (_initialSupply != 0) {
            _mint(msg.sender, id, _initialSupply, data);
            ownedDevices[msg.sender].push(id);
        }

        tokenSupply[id] = _initialSupply;
        tokenMaxSupply[id] = _maxSupply;

        modelToSpecId[model][color] = createNewSpec(model, color, price, "");

        _incrementTokenTypeId();
        return id;
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public {
        require(
            _approvedStores[msg.sender] == true,
            "Only approved store can mint token."
        );
        require(id <= _currentTokenId, "Id not found");
        _mint(account, id, amount, data);
        if (!isOwned(account, id)) {
            ownedDevices[account].push(id);
        }
    }

    fallback() external {
        revert();
    }
}
