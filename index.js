const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const port = 3000;

app.use(
	cors({
		origin: "*",
	})
);
app.use(helmet());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});