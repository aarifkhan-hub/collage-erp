const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Naya: File path read karne ke liye

const app = express();

app.use(cors()); 
app.use(express.json()); 
app.use(express.static(__dirname)); // Naya: Agar future me CSS/JS file alag karni ho toh error na aaye

// ==========================================
// 1. UPDATE THIS URL WITH YOUR NEW PASSWORD
// ==========================================
// DHYAN DEIN: 'APNA_NAYA_PASSWORD_YAHAN_DALEIN' ki jagah apna asali password likhna mat bhoolna
const MONGO_URL = "mongodb+srv://aarifkhanpatilar_db_user:APNA_NAYA_PASSWORD_YAHAN_DALEIN@cluster0.zl55c9u.mongodb.net/collegeERP?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL)
    .then(() => console.log("✅ MongoDB Successfully Connected!"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

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

// Yahan change kiya hai: Ab text nahi, index.html file bhejega
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
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
// 2. IMPORTANT PORT CHANGE FOR RENDER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is live on port ${PORT}`);
});
