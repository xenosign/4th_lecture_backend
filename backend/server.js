// @ts-check

const express = require('express');

const PORT = 4000;

const app = express();
const userRouter = express.Router();

app.set('view engine', 'ejs');
app.use('/css', express.static('views/css'));

const USER = [
  {
    id: 'tetz',
    name: '이효석',
  },
];

userRouter.get('/', (req, res) => {
  res.send(USER);
});

userRouter.get('/id/:id', (req, res) => {
  const findUser = USER.find((user) => user.id === req.params.id);
  if (findUser) {
    res.send(findUser);
  } else {
    res.end('ID not found');
  }
});

userRouter.post('/', (req, res) => {
  if (req.query.id && req.query.name) {
    const newUser = {
      id: req.query.id,
      name: req.query.name,
    };
    USER.push(newUser);
    res.send('회원 등록 완료');
  } else {
    res.send('Unexpected query');
  }
});

userRouter.put('/:id', (req, res) => {
  if (req.query.id && req.query.name) {
    const userData = USER.find((user) => user.id === req.params.id);
    if (userData) {
      const arrIndex = USER.findIndex((user) => user.id === req.params.id);
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
      };
      USER[arrIndex] = modifyUser;
      res.send('회원 수정 완료');
    } else {
      res.send('ID Not found');
    }
  } else {
    res.send('Unexpected query');
  }
});

userRouter.delete('/:id', (req, res) => {
  const arrIndex = USER.findIndex((user) => user.id === req.params.id);
  if (arrIndex !== -1) {
    USER.splice(arrIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    res.end('ID not found');
  }
});

userRouter.get('/show', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
  res.write('<h1>hello, Dynamic Web page</h1>');
  for (let i = 0; i < USER.length; i++) {
    res.write(`<h2>USER id is ${USER[i].id}`);
    res.write(`<h2>USER name is ${USER[i].name}`);
  }
  res.end('');
});

userRouter.get('/ejs', (req, res) => {
  res.render('index');
});

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`데이터 통신 서버가 ${PORT}에서 작동 중입니다!`);
});
