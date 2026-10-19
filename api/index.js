const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.json({ message: 'สวัสดี Back-End' });
});
const members = [
    { id: 1, name: 'Kantapong Saenbuth', role: 'Data Base Tester' },
    { id: 2, name: 'Korawit Yongphech', role: 'API Coding' },
];
const projects = {
    team: 'Moodeng888',
    topics: ['สั่งอาหารล่วงหน้าโรงอาหาร'],
    problems: [''],
    users: ['Kantapong004','69319010001-Design'],
    members: members,
};

app.get('/projects', (req, res) => {
    res.json(projects);
});
app.get('/members/:id', (req, res) => {
  const id = Number(req.params.id);                  // /members/2 ได้ id = 2
  const member = members.find((m) => m.id === id);   // หาสมาชิกที่ id ตรงกัน
  if (!member) {                                     // ถ้าหาไม่พบ
    return res.status(404).json({ message: 'Member not found' });
  }
  res.json(member);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});