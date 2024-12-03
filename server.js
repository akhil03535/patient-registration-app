require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Define Schema
const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phone: String,
    gender: String,
    address: String,
});

const Patient = mongoose.model("Patient", patientSchema);

// Routes
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/register", async (req, res) => {
    const { name, age, email, phone, gender, address } = req.body;

    try {
        const newPatient = new Patient({ name, age, email, phone, gender, address });
        await newPatient.save();
        res.status(200).json({ message: "Patient registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to register patient." });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
