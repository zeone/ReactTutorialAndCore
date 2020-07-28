import React, { Component } from "react";
import "./itemList.css";
import Spinner from "../spinner/spinner";

export default class ItemList extends Component {
	state = {
		itemList: null,
	};

	componentDidMount() {
		const { getData } = this.props;

		getData().then((itemList) => this.setState({ itemList }));
	}

	renderItems(arr) {
		return arr.map((it, i) => {
			const { id } = it;
			const label = this.props.renderItem(it);
			return (
				<li
					key={id}
					onClick={() => this.props.onItemSelected(i)}
					className="list-group-item">
					{label}
				</li>
			);
		});
	}
	render() {
		const { itemList } = this.state;
		if (!itemList) {
			return <Spinner />;
		}
		return (
			<ul className="item-list list-group">{this.renderItems(itemList)}</ul>
		);
	}
}
