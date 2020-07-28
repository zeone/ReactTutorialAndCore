import React, { Component } from "react";
import ItemList from "../itemList/itemList";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../Services/getService";
import RowBlock from "../rowBlock/rowBlock";
import ItemDetails from "../itemDetails/itemDetails";
import { Field } from "../itemDetails/itemDetails";

export default class HousePage extends Component {
	gotService = new GotService();
	state = {
		selectedHouse: 10,
		error: false,
	};
	onItemSelected = (id) => {
		this.setState({ selectedHouse: id });
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	render() {
		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllHouses}
				renderItem={(item) => item.name}
			/>
		);

		const houseDetails = (
			<ItemDetails
				itemId={this.state.selectedHouse}
				getData={this.gotService.getHouse}>
				<Field field="region" label="Region" />
				<Field field="words" label="Words" />
				<Field field="titles" label="Titles" />
				<Field field="overlord" label="Overlord" />
				<Field field="ancestralWeapons" label="Weapons" />
			</ItemDetails>
		);

		if (this.state.error) return <ErrorMessage />;
		return <RowBlock left={itemList} right={houseDetails} />;
	}
}
