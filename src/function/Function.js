import {Alchemy, Network} from "alchemy-sdk";
import ERC721 from "../contract/ERC721.json";
import LendingContract from "../contract/LendingFactory.json"
const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:8545/");
const nftAbi = ERC721.abi
const lendingAbi = LendingContract.abi
const Lending = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
const lending = new web3.eth.Contract(lendingAbi, "0x5fbdb2315678afecb367f032d93f642f64180aa3")
export const myShortString = (message, number) => {
    var response = message
    if (message.length > number) {
        var prefix = response.slice(0, 3)
        var endfix = response.slice(-4, response.length)
        response = prefix + "..." +endfix
    }
    return response
}

const settings = {
    apiKey: "-C7_ur_4s6R0oUnBNGi4qB3XWfv-HsFR",
    network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

export const convertIpfs = (string) => {
    if (string) {
        const res = string.replace("ipfs://", "https://ipfs.io/ipfs/")
        return res
    }
    return "error"
}

export const getOwnerNft = async (nftaddress, tokenId, myAccount) => {
    const sample = new web3.eth.Contract(nftAbi, nftaddress);
    const res = await sample.methods.ownerOf(tokenId).call({
        from: myAccount
    })
    return res
}

export const vendorMakeRequest = async(nftaddress, tokenId, myAccount) => {
    const sample = new web3.eth.Contract(nftAbi, nftaddress);
    await sample.methods.approve(Lending, tokenId).send({
        from: myAccount
    })
    
    const res = await lending.methods.vendorMakeRequest(nftaddress, tokenId).send({
        from: myAccount
    })
    return res;
}