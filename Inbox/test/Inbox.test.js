const expect = require("chai").expect;
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

// Create web3 instance and ganache test provider
const provider = ganache.provider();
const web3 = new Web3(provider);

// Global variables
let accounts, inbox;

beforeEach(async () => {
	// Get a list of all accounts
	accounts = await web3.eth.getAccounts();

	// Use one of those accounts to deploy a contract
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ["Hello!"] })
		.send({ from: accounts[0], gas: "1000000" });

	// Inject provider into web3 instance
	inbox.setProvider(provider);
});

describe("Inbox", () => {
	it("deploys a contract", () => {
		expect(inbox.options.address).to.be.ok;
	});

	it("has a default message", async () => {
		const message = await inbox.methods.message().call();
		expect(message).to.be.equal("Hello!");
	});

	it("can change the message", async () => {
		await inbox.methods.setMessage("Hi!").send({ from: accounts[0] });

		const message = await inbox.methods.message().call();
		expect(message).to.be.equal("Hi!");
	});
});
