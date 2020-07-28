export default class GotService {
	constructor() {
		this._apiBase = "https://www.anapioficeandfire.com/api";
	}

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);
		if (!res.ok)
			throw new Error(
				`Could not fetch ${url}, status ${res.status}, status text ${
					res.statusText
				}`
			);
		return await res.json();
	};

	getAllCharacters = async () => {
		const resp = await this.getResource("/characters?page=5&pageSize=10");
		return await resp.map((w) => this._transformCharacter(w));
	};

	getCharacter = async (id) => {
		return this._transformCharacter(
			await this.getResource(`/characters/${id}`)
		);
	};

	getAllHouses = async () => {
		const resp = await this.getResource("/houses");
		return resp.map((r) => this._transformHouse(r));
	};

	getHouse = async (id) => {
		return this._transformHouse(await this.getResource(`/houses/${id}`));
	};

	getAllBooks = async () => {
		const resp = await this.getResource("/books");
		return resp.map((r) => this._transformBook(r));
	};

	getBook = async (id) => {
		return this._transformBook(await this.getResource(`/books/${id}`));
	};

	_transformCharacter = (char) => {
		return {
			name: char.name,
			gender: char.gender,
			born: char.born,
			died: char.died,
			culture: char.culture,
		};
	};

	_transformHouse = (house) => {
		return {
			name: house.name,
			region: house.region,
			words: house.words,
			titles: house.titles,
			overlord: house.overlord,
			ancestralWeapons: house.ancestralWeapons,
		};
	};

	_transformBook = (book) => {
		return {
			name: book.name,
			numberOfPages: book.numberOfPages,
			publiser: book.publiser,
			released: book.released,
		};
	};
}
