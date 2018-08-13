const expect = require("chai").expect;
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCompaign = require("../ethereum/build/Campaign.json");

let accounts, factory, campaign, campaignAddress;

beforeEach(async () => {
	// Get list of available accounts
	accounts = await web3.eth.getAccounts();

	// Deploy factory contract from the first account
	factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({ data: compiledFactory.bytecode })
		.send({ from: accounts[0], gas: "1000000" });

	// Create a campaign via factory
	await factory.methods.createCampaign("100").send({
		from: accounts[0],
		gas: "1000000"
	});

	// Get the address of that campaign
	[campaignAddress] = await factory.methods.getDeployedCampaigns().call();

	// Initialize already deployed campaign contract
	campaign = await new web3.eth.Contract(
		JSON.parse(compiledCampaign.interface),
		campaignAddress
	);
});
