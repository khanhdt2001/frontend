const { ethereum } = window;
// const Web3 = require("web3");
// const web3 = new Web3(Web3.givenProvider);

export const account = async () => {
    try {
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        return accounts[0];
    } catch (error) {
        console.log(error);
    }
};

export const myShortString = (message, number) => {
    var response = message
    if (message.length > number) {
        var prefix = response.slice(0, 3)
        var endfix = response.slice(-4, response.length)
        response = prefix + "..." +endfix
    }
    return response
}