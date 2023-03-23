import { Alchemy, Network } from "alchemy-sdk";
import ERC721 from "../contract/ERC721.json";
import LendingContract from "../contract/LendingFactory.json";
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);
const nftAbi = ERC721.abi;
const lendingAbi = LendingContract.abi;
const Lending = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const lending = new web3.eth.Contract(
    lendingAbi,
    "0x5fbdb2315678afecb367f032d93f642f64180aa3"
);
export const myShortString = (message, number) => {
    var response = message;
    if (message.length > number) {
        var prefix = response.slice(0, 3);
        var endfix = response.slice(-4, response.length);
        response = prefix + "..." + endfix;
    }
    return response;
};

const settings = {
    apiKey: "-C7_ur_4s6R0oUnBNGi4qB3XWfv-HsFR",
    network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

export const convertIpfs = (string) => {
    if (string) {
        const res = string.replace("ipfs://", "https://ipfs.io/ipfs/");
        return res;
    }
    return "error";
};

export const getOwnerNft = async (nftaddress, tokenId, myAccount) => {
    const sample = new web3.eth.Contract(nftAbi, nftaddress);
    const res = await sample.methods.ownerOf(tokenId).call({
        from: myAccount,
    });
    return res;
};
export const cutStringErr = (message) => {
    if (message) {
        const cutString = message.replace(
            "Returned error: Error: VM Exception while processing transaction: reverted with reason string",
            ""
        );
        const res = cutString.replaceAll("'", "");
        return res;
    }
    return "";
};

export const convertToEth = (string) => {
    return web3.utils.fromWei(string.toString(), "ether");
};
export const convertoWei = (string) => {
    return web3.utils.toWei(string, "ether");
};

export const convertToDay = (second) => {
    const day = second / 24 / 60 / 60;
    return day;
};

/**************** smart contract function ****************/
export const vendorMakeRequest = async (nftaddress, tokenId, myAccount) => {
    const sample = new web3.eth.Contract(nftAbi, nftaddress);
    await sample.methods.approve(Lending, tokenId).send({
        from: myAccount,
    });

    const res = await lending.methods
        .vendorMakeRequest(nftaddress, tokenId)
        .send({
            from: myAccount,
        });
    return res;
};

export const lenderMakeOffer = async (
    requestNumber,
    offerRate,
    amountOfTime,
    paymentTime,
    ethAmount,
    myAccount
) => {
    const value = web3.utils.toWei(ethAmount, "ether");
    const second = amountOfTime * 24 * 60 * 60;
    const res = await lending.methods
        .lenderMakeOffer(requestNumber, offerRate, second, paymentTime)
        .send({
            from: myAccount,
            value: value,
        });
    return res;
};

export const vendorAcceptOffer = async (
    requestNumber,
    offerNumber,
    myAccount
) => {
    const res = await lending.methods
        .vendorAcceptOffer(requestNumber, offerNumber)
        .send({
            from: myAccount,
        });
    return res;
};

export const vendorPayRountine = async (requestNumber, ethValue, myAccount) => {
    const res = await lending.methods.vendorPayRountine(requestNumber).send({
        from: myAccount,
        value: ethValue,
    });
    return res;
};

export const getAddressBalance = async (account) => {
    const res = await lending.methods.getAddressBalance(account).call();
    return res;
};

export const withdrawEth = async (token, myAccount) => {
    const res = await lending.methods.withdrawEth(token).send({
        from: myAccount,
    });
    return res;
};

export const depositEth = async (token, myAccount) => {
    const res = await lending.methods.depositEth().send({
        from: myAccount,
        value: token
    })
    return res;
}

export const withdrawNft = async (requestNumber, myAccount) => {
    const res = await lending.methods.withdrawNFT(requestNumber).send({
        from: myAccount
    })
    return res;
}