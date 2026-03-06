require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
})

app.get("/users", (req, res) => {
    res.status(200).json({ message: "OK - GET users" });
});

app.get("/users/:id", (req, res) => {
    res.status(200).json({ message: "OK - GET users by ID with ID: " + req.params.id });
});

app.post("/users", (req, res) => {
    res.status(200).json({ message: "OK - POST users" });
});

app.put("/users/:id", (req, res) => {
    res.status(200).json({ message: "OK - PUT user with ID: " + req.params.id });
});

app.delete("/users/:id", (req, res) => {
    res.status(200).json({ message: "OK - DELETE user with ID: " + req.params.id });
});

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    console.log('Express server listening on port', PORT)
});
