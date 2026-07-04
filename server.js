const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors()); // Frontend se request accept karne ke liye
app.use(express.json()); // JSON data read karne ke liye

// ==========================================
// MONGODB CONNECTION (With Your Password)
// ==========================================
const MONGO_URL = "mongodb+srv://aarifkhanpatilar_db_user:JT6FQLhYsVaz5qdy@cluster0.zl55c9u.mongodb.net/collegeERP?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL)
    .then(() => console.log("✅ MongoDB Successfully Connected!"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ==========================================
// MONGOOSE SCHEMA & MODEL
// ==========================================
const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    course: { type: String, required: true },
    prevMarks: { type: Number, required: true },
    address: { type: String, required: true },
    admissionDate: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// ==========================================
// API ROUTES
// ==========================================

// Test Route
app.get('/', (req, res) => {
    res.send("College ERP Backend is Running Successfully!");
});

// Student Admission Submit API
app.post('/api/admission', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        
        res.status(201).json({
            success: true,
            message: "Admission Form Submitted and Saved to Database!",
            data: savedStudent
        });
    } catch (error) {
        console.error("Database Save Error:", error);
        res.status(500).json({
            success: false,
            message: "Error saving admission form to database",
            error: error.message
        });
    }
});

// ==========================================
// SERVER START
// ==========================================
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is live on http://localhost:${PORT}`);
});