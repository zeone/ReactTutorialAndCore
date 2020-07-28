import React, { Component } from "react";
import "./itemDetails.css";
import { ListGroup, ListGroupItem } from "reactstrap";
import GotService from "../../Services/getService";

const Field = ({ item, field, label }) => {
	return (
		<ListGroupItem className="d-flex justify-content-between">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</ListGroupItem>
	);
};
export default class ItemDetails extends Component {
	gotService = new GotService();
	state = { item: null };

	updateItem() {
		const { getData, itemId } = this.props;
		if (!itemId) return;

		getData(itemId).then((item) => this.setState({ item: item }));

		// this.gotService
		// 	.getCharacter(charId)
		// 	.then((char) => this.setState({ char: char }));
	}

	componentDidMount() {
		this.updateItem();
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) this.updateItem();
	}

	render() {
		if (!this.state.item)
			return <span className="select-error">Please select item</span>;
		const { name } = this.state.item;
		const { item } = this.state;
		return (
			<div className="char-details rounded">
				<h4>{name}</h4>
				<ListGroup flush>
					{React.Children.map(this.props.children, (child) => {
						return React.cloneElement(child, { item });
					})}
				</ListGroup>
			</div>
		);
	}
}

export { Field };
