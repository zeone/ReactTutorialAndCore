import React from "react";
import "./header.css";

const Header = () => {
	return (
		<div className="header_block d-flex justify-content-between align-items-center">
			<h3 className="header_title">
				<a href="#">Game of Thrones DB</a>
			</h3>
			<ul className="list-group list-group-horizontal list-group-flush ">
				<li className="list-group-item">
					<a href="#">Characters</a>
				</li>
				<li className="list-group-item">
					<a href="#">Houses</a>
				</li>
				<li className="list-group-item">
					<a href="#">Books</a>
				</li>
			</ul>
		</div>
	);
};

export default Header;
