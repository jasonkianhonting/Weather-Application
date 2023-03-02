import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { HandleLoading } from "./helpers/handleLoading";
import { HandleError } from "./helpers/handleError";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./helpers.css";
import { useState } from "react";

function App() {
	//Declare all necessary hooks used in this application
	const [data, setData] = useState([]);
	const [city, setCity] = useState("");
	const [countrycode, setCountryCode] = useState("");
	const [showCard, setShowCard] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	// This function is used to fetch data from my own api server
	const getData = async (city, countrycode) => {
		let res = await fetch(`http://localhost:3000/${city}/${countrycode}`);
		try {
			if (res.ok) {
				let received = await res.json();
				setData(received.result);
			}
			if (res.status === 404 || res.status === 400) {
				setError(true);
			}
		} catch (e) {
			setError(true);
		}
	};

	// This function is used to update the value of city
	const handleCityChange = (e) => {
		e.preventDefault();
		setCity(e.target.value);
	};

	// This function is used to update the value of country code
	const handleCountryCodeChange = (e) => {
		e.preventDefault();
		setCountryCode(e.target.value);
	};

	// This function is used to use the data fetched and implemented some client side rendering to make sure that
	// the application works in the way that it is expected to
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		getData(city, countrycode);
		if (city.length !== 0 && countrycode.length !== 0) {
			if (data !== null || data !== undefined) {
				setError(false);
				setLoading(false);
				setShowCard(true);
			} else {
				setError(true);
			}
		} else {
			setLoading(false);
			setError(true);
		}
	};

	// This function is used to populate the card with information from the data retrieved
	const HandleCard = () => (
		<div className="card-information">
			<Card>
				<Card.Body>
					<Card.Title>
						Weather Condition:{" "}
						{data.map((items) => items.data[0].weather[0].main)}
					</Card.Title>
					<Card.Text>
						Weather Description:{" "}
						{data.map((items) => items.data[0].weather[0].description)}
						<br></br>
						Temperature: {data.map((items) => items.data[0].deg)} K<br></br>
						Humidity: {data.map((items) => items.data[0].humidity)}%<br></br>
						Pressure: {data.map((items) => items.data[0].pressure)} Pa
						<br></br>
						Wind Speed: {data.map((items) => items.data[0].speed)} m/s
						<br></br>
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);

	return (
		<div className="App">
			<div id="form">
				<Form id="city-form">
					<Form.Group className="mb-3" controlId="form">
						<Form.Control
							name="city"
							placeholder="Enter The Name Of The City"
							onChange={handleCityChange}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="form">
						<Form.Control
							name="countrycode"
							placeholder="Enter The Country Code"
							onChange={handleCountryCodeChange}
						/>
					</Form.Group>
					<Button variant="primary" type="Search" onClick={handleSubmit}>
						Submit
					</Button>
				</Form>
				{loading ? <HandleLoading /> : null}
				{error && !loading ? <HandleError /> : null}
				{showCard ? <HandleCard /> : null}
			</div>
		</div>
	);
}

export default App;
