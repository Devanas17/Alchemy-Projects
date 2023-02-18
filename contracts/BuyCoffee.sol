// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract BuyCoffee {
    error BuyCoffe__CannotBuy();
    error BuyCoffe__OnlyOwner();

    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Memo[] private memos;

    address payable private owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(
        string memory _name,
        string memory _message
    ) public payable {
        if (msg.value < 0) {
            revert BuyCoffe__CannotBuy();
        }

        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    function withdrawTips() public {
        if (msg.sender != owner) {
            revert BuyCoffe__OnlyOwner();
        }

        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}
