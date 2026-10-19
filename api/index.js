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

// ข้อมูลตั้งต้นของ resource หลัก (เก็บในหน่วยความจำ)
let foods = [
    { id: 1, name: 'แกงเขียวหวาน', location: 'ร้าน 4', status: 'pending' },
    { id: 2, name: 'ผัดกะเพรา', location: 'ร้าน 2', status: 'done' },
  ];
let nextId = 3;

// R: ดูทั้งหมด (รองรับ ?status=pending)
app.get('/foods', (req, res) => {
    const { status } = req.query;
    if (status) {
      return res.json(foods.filter((s) => s.status === status));
    }
    res.json(foods);
  });
  // R: ดู 1 รายการ
app.get('/foods/:id', (req, res) => {
    const id = Number(req.params.id);
    const foods = foods.find((r) => r.id === id);
    if (!foods) {
      return res.status(404).json({ message: 'ไม่พบรายการอาหาร' });
    }
    res.json(foods);
  });
  // C: เพิ่ม
app.post('/foods', (req, res) => {
    const { name, location, status } = req.body;
    if (!name || !location) {
      return res.status(400).json({ message: 'ต้องส่ง name และ location' });
    }
    const foods = { id: nextId++, name, location, status: 'pending' };
    foods.push(foods);
    res.status(201).json(foods);
  });
  // U: แก้ไข
app.put('/foods/:id', (req, res) => {
    const id = Number(req.params.id);
    const foods = foods.find((r) => r.id === id);
    if (!foods) {
      return res.status(404).json({ message: 'ไม่พบรายการอาหาร' });
    }
    const allowed = ['pending', 'doing', 'done'];
    if (req.body.status && !allowed.includes(req.body.status)) {
      return res.status(400).json({ message: 'status ต้องเป็น pending, doing หรือ done' });
    }
    foods.title = req.body.title ?? foods.title;
    foods.location = req.body.location ?? foods.location;
    foods.status = req.body.status ?? foods.status;
    res.json(foods);
  });
  // D: ลบ
app.delete('/foods/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = foods.findIndex((r) => r.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'ไม่พบรายการแจ้งซ่อม' });
    }
    foods.splice(index, 1);
    res.status(204).send();
  });
   
  // ไม่ตรงกับ route ใดเลย
  app.use((req, res) => {
    res.status(404).json({ message: `ไม่มี ${req.method} ${req.path} ในระบบ` });
  });
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});