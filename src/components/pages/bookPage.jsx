import React, { Component } from "react";
import ItemList from "../itemList/itemList";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../Services/getService";
import RowBlock from "../rowBlock/rowBlock";
import ItemDetails from "../itemDetails/itemDetails";
import { Field } from "../itemDetails/itemDetails";

export default class BookPage extends Component {
	gotService = new GotService();
	state = {
		selectedBook: 10,
		error: false,
	};
	onItemSelected = (id) => {
		this.setState({ selectedBook: id });
	};

	componentDidCatch() {
		this.setState({ error: true });
	} 

	render() {
		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllBooks}
				renderItem={(item) => item.name}
			/>
		);

		const bookDetails = (
			<ItemDetails
				itemId={this.state.selectedBook}
				getData={this.gotService.getBook}>
				<Field field="numberOfPages" label="Number Of Pages" />
				<Field field="publiser" label="Publiser" />
				<Field field="released" label="Released" />
			</ItemDetails>
		);

		if (this.state.error) return <ErrorMessage />;
		return <RowBlock left={itemList} right={bookDetails} />;
	}
}
