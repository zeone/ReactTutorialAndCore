import React, { Component } from "react";
import "./randomChar.css";
import Spinner from "./../spinner/spinner";
import gotService from "../../Services/getService";
import ErrorMessage from "../errorMessage/errorMessage";

export default class RandomChar extends Component {
	gotSevice = new gotService();
	state = {
		char: {},
		loading: true,
		error: false,
	};
	componentDidMount() {
		this.updateChar();
		this.intervalId = setInterval(this.updateChar, 1500);
		console.log("mounting");
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
		console.log("unmount");
	}
	updateChar = () => {
		console.log("Update");
		const id = Math.floor(Math.random() * 140 + 25);
		//const id = 182555;
		this.gotSevice
			.getCharacter(id)
			.then(this.onCharLoaded)
			.catch((err) => this.onError(err));
	};

	onCharLoaded = (char) => {
		this.setState({ char, loading: false });
	};
	onError(err) {
		this.setState({
			error: true,
			loading: false,
		});
	}
	render() {
		const { loading, char, error } = this.state;
		const content = error ? (
			<ErrorMessage />
		) : !loading ? (
			<View char={char} />
		) : (
			<Spinner />
		);
		return <div className="random-block rounded">{content}</div>;
	}
}

const View = ({ char }) => {
	const { name, gender, born, died, culture } = char;
	return (
		<>
			<h4>Random Character: {name}</h4>
			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Gender </span>
					<span>{gender}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Born </span>
					<span>{born}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Died </span>
					<span>{died}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Culture </span>
					<span>{culture}</span>
				</li>
			</ul>
		</>
	);
};
