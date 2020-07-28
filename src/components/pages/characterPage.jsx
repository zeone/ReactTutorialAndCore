import React, { Component } from "react";
import ItemList from "../itemList/itemList";
import { Field } from "../itemDetails/itemDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../Services/getService";
import RowBlock from "../rowBlock/rowBlock";
import ItemDetails from "../itemDetails/itemDetails";

export default class CharacterPage extends Component {
	gotService = new GotService();
	state = {
		selectedChar: 130,
		error: false,
	};
	onItemSelected = (id) => {
		this.setState({ selectedChar: id });
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	render() {
		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllCharacters}
				renderItem={(item) => `${item.name} (${item.gender})`}
			/>
		);

		const charDetails = (
			<ItemDetails
				itemId={this.state.selectedChar}
				getData={this.gotService.getCharacter}>
				<Field field="gender" label="Gender" />
				<Field field="born" label="Born" />
				<Field field="died" label="Died" />
				<Field field="culture" label="Culture" />
			</ItemDetails>
		);

		if (this.state.error) return <ErrorMessage />;
		return <RowBlock left={itemList} right={charDetails} />;
	}
}
