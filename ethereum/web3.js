import Web3 from "web3";

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // running in browser and metamask is running
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // are not in browser or user not running metamask
  const provider = new Web3.providers.HttpProvider(
    "<YOUR_INFURA_API_URL>"
  );
  web3 = new Web3(provider);
}


export default web3;