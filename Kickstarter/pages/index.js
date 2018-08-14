import React, { Component } from "react";
import factory from "../ethereum/factory";

export default class CampaignIndex extends Component {
	async componentDidMount() {
		const campaigns = await factory.methods.getDeployedCampaigns().call();
	}

	render() {
		return <div>Campaigns Index!</div>;
	}
}
