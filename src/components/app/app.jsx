import React, { Component } from "react";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage/errorMessage";
import CharacterPage from "../pages/characterPage";
import ItemList from "../itemList/itemList";
import ItemDetails from "../itemDetails/itemDetails";
import GotService from "../../Services/getService";
import BookPage from "../pages/bookPage";
import HousePage from "../pages/housePage";

export default class App extends Component {
	gotService = new GotService();
	state = {
		showRandomChar: true,
		error: false,
	};
	toggleRandomChar = () => {
		this.setState((state) => {
			return {
				showRandomChar: !state.showRandomChar,
			};
		});
	};

	// componentDidCatch() {
	// 	this.setState({ error: true });
	// }

	render() {
		if (this.state.error) {
			return <ErrorMessage />;
		}
		const char = this.state.showRandomChar ? <RandomChar /> : null;
		return (
			<>
				<div className="container">
					<Header />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-5">
							{char}
							<button className="toggle-btn" onClick={this.toggleRandomChar}>
								Toggle random character
							</button>
						</div>
					</div>
					<div className="mt-5">
						<CharacterPage />
					</div>
					<div className="mt-5">
						<BookPage />
					</div>
					<div className="mt-5">
						<HousePage />
					</div>
					{/* <div className="row mt-5">
						<div className="col-lg-6">
							<ItemList
								onItemSelected={this.onItemSelected}
								getData={this.gotService.getAllBooks}
								renderItem={(item) => `${item.name}`}
							/>
						</div>
						<div className="col-lg-6">
							<ItemDetails
							getData={this.gotService
								 	.getCharacter(this.itemId)} />
						</div>
					</div>
					<div className="row mt-5">
						<div className="col-lg-6">
							<ItemList
								onItemSelected={this.onItemSelected}
								getData={this.gotService.getAllHouses}
								renderItem={(item) => `${item.name}`}
							/>
						</div>
						<div className="col-lg-6">
							<ItemDetails charId={this.charId} />
						</div>
					</div> */}
				</div>
			</>
		);
	}
}
