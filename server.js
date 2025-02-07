const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let students = []; // Temporary storage

// Add a student
app.post('/add-student', (req, res) => {
    const { name, mark, age } = req.body;
    const newStudent = { id: students.length + 1, name, mark, age };
    students.push(newStudent);
    res.json({ message: "Student added", student: newStudent });
});

// Get all students
app.get('/students', (req, res) => {
    res.json(students);
});

// Edit a student
app.put('/edit-student/:id', (req, res) => {
    const { id } = req.params;
    const { name, mark, age } = req.body;
    students = students.map(student => 
        student.id == id ? { ...student, name, mark, age } : student
    );
    res.json({ message: "Student updated" });
});

// Delete a student
app.delete('/delete-student/:id', (req, res) => {
    const { id } = req.params;
    students = students.filter(student => student.id != id);
    res.json({ message: "Student deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
