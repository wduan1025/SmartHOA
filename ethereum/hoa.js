import web3 from "./web3";
import HOA from "./build/HOA.json";

export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(HOA.interface),
        address
    );
};