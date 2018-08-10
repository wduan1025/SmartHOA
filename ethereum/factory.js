import web3 from "./web3";
import HOAFactory from "./build/HOAFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(HOAFactory.interface),
    "0x3C175374940CFE46b2145512B8F676281b4b1ec4"
);

export default instance;