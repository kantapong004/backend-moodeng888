const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.json({ message: 'สวัสดี Back-End' });
});
const members = [
    { id: 1, name: 'Kantapong Saenbuth', role: 'Admin' },
    { id: 2, name: 'Korawit Yongphech', role: 'Admin' },
];
const projects = {
    team: 'Moodeng888'
    topics: ['Node.js', 'Express', 'API'],
    problems: ['CORS', 'Authentication', 'Database'],
    users: ['Kantapong004','69319010001-Design'
    members: members,
};

app.get('/projects', (req, res) => {
    res.json(projects);
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});