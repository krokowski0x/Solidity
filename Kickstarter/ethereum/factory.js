import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
const { ADDRESS } = require("./config");

const instance = web3.eth.contract(
	JSON.parse(CampaignFactory.interface),
	ADDRESS
);

export default instance;
