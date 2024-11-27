const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config()
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
require("./config/database").connect()
const file_Upload = require("express-fileupload")
require("./config/claudinary").cloudinaryConnect()


const port = process.env.PORT || 3000
app.use(express.json({ type:'application/json' }))
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }))
app.use(express.static("public"));

app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
)

app.use(file_Upload())

app.use("/api/v1", routes);

app.listen(port, () => {
	console.log(`App is listening at port ${port}`);
})

