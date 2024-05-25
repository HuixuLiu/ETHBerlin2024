import React, { useState } from 'react';
import { ethers } from 'ethers';
import AddressListABI from '../AddressList.json'; // Adjust the path if necessary
import {NotificationService} from './notification-service';
import {NotificationType} from '../enum/notifcation-type-enum';

const CONTRACT_ADDRESS = '0x78D4f4Ea0b82000415Ba191D8698f2e106FB4BbA'; // Replace with your contract address

const ContractService = {
//   const [address, setAddress] = useState('');
//   const [isValid, setIsValid] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [contract, setContract] = useState(null);

  // Initialize the provider, signer, and contract
  initializeEthers : async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, AddressListABI, await signer);
    //   setProvider(provider);
    //   setSigner(signer);
    //   setContract(contract);
        NotificationService('Smart Contract connected successfully!', NotificationType.SUCCESS, 'You can now interact with the blockchain');
        return { provider, signer, contract };
    } else {
      console.error('Smart Contract is not available');
        NotificationService('Error!', NotificationType.DANGER, 'Smart Contract not found. Please check.');
    }
  },

  // Add an address to the contract
  addAddress : async (contract: ethers.Contract, address: string) => {
    if (contract) {
      try {
        const tx = await contract.addAddress(address);
        await tx.wait();
        NotificationService('Address added successfully!', NotificationType.SUCCESS, address);
        return true;
      } catch (error) {
        NotificationService('Failed to add address', NotificationType.DANGER, error.message);
        return false;
      }
    }
  },

  // Check if an address is valid
  checkIsValid : async (contract: ethers.Contract, address: string) => {
    if (contract) {
      try {
        const result = await contract.isValid(address);
        console.log("Is the address valid?", result);
        NotificationService('Address checked successfully!', NotificationType.SUCCESS, 'Address is ' + result);
        return result;
      } catch (error) {
        console.error('Error checking address:', error);
      }
    }
  }
};

export default ContractService;
