// Stand-in backend for the sandbox preview: REST /todos + socket.io relay of "todo-change".
const http = require('http');
const { Server } = require('socket.io');

let todos = [];
let nextId = 1;
const send = (res, code, body) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
};

const server = http.createServer((req, res) => {
  const m = req.url.match(/^\/todos(?:\/(\d+))?$/);
  if (!m) return send(res, 404, {});
  let raw = '';
  req.on('data', (c) => (raw += c));
  req.on('end', () => {
    const body = raw ? JSON.parse(raw) : {};
    const id = m[1];
    const t = id && todos.find((x) => String(x.id) === id);
    if (req.method === 'GET' && !id) return send(res, 200, todos);
    if (req.method === 'POST' && !id) {
      const todo = { id: String(nextId++), title: body.title, status: 'active', done: false };
      todos.push(todo);
      return send(res, 201, { id: todo.id });
    }
    if (!t) return send(res, 404, {});
    if (req.method === 'PUT') {
      if (body.title !== undefined) t.title = body.title;
      if (body.done !== undefined) t.done = body.done;
      return send(res, 200, { id: t.id });
    }
    if (req.method === 'DELETE') {
      todos = todos.filter((x) => x !== t);
      return send(res, 200, { id: t.id });
    }
    send(res, 405, {});
  });
});

const io = new Server(server, { cors: { origin: '*' } });
io.on('connection', (s) => s.on('todo-change', () => s.broadcast.emit('todo-change')));
server.listen(3001, '0.0.0.0');
