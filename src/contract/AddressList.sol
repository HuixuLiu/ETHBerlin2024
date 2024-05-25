// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract AddressList {
    // Array to store the list of addresses
    string[] private addresses;

    /**
     * @dev Adds an address to the list
     * @param addr The address to add
     */
    function addAddress(string memory addr) public {
        addresses.push(addr);
    }

    /**
     * @dev Checks if the given address is in the list
     * @param addr The address to check
     * @return isValid True if the address is in the list, false otherwise
     */
    function isValid(string memory addr) public view returns (bool) {
        for (uint i = 0; i < addresses.length; i++) {
            if (keccak256(abi.encodePacked(addresses[i])) == keccak256(abi.encodePacked(addr))) {
                return true;
            }
        }
        return false;
    }
}