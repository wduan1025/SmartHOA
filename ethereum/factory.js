import web3 from "./web3";
import HOAFactory from "./build/HOAFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(HOAFactory.interface),
    "0xF3400DE141A07d729C7ceAF26925B9BDE619210e"
);

export default instance;