import Spinner from "react-bootstrap/Spinner";

//This function is used to provide loading status
export const HandleLoading = () => (
	<div id="loadingBar">
		<Spinner animation="border" />
	</div>
);
