const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({ path: "./.env" });

const connectDB = require('./db/index');
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res, next) => {
    res.send({ success: true, message: "Welcome to the registration app 🎉🎉" });
});

// Imports of routes
const registerUserController = require("./routes/signup.route");
const loginUserController = require("./routes/login.route");
const forgetPasswordController = require("./routes/forget_password.route");

app.post('/register', registerUserController);
app.post('/login', loginUserController);
app.post('/forgot/password', forgetPasswordController);

app.listen(PORT, () => {
    console.log("⚙️ Server is running on port: " + PORT);
});
