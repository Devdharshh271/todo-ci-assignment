const express = require('express');
const app = express();
app.use(express.json());

let todos = [];
let id = 1;

app.get('/', (req, res) => res.send('TODO API: GET /todos, POST /todos, DELETE /todos/:id'));

app.get('/todos', (req, res) => res.json(todos));

app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const item = { id: id++, title };
  todos.push(item);
  res.status(201).json(item);
});

app.delete('/todos/:id', (req, res) => {
  const tid = Number(req.params.id);
  const before = todos.length;
  todos = todos.filter(t => t.id !== tid);
  res.json({ deleted: before - todos.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening ${PORT}`));
