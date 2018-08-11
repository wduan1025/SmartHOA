import web3 from "./web3";
import HOAFactory from "./build/HOAFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(HOAFactory.interface),
    "0xD7a0AB74795EAA55B123C1658c7433AC0658AdA4"
);

export default instance;