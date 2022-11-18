// @ts-check

const express = require('express');

const PORT = 4000;

const app = express();

app.get('/', (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

app.get('/:email/:password/:name/:gender', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

app.listen(PORT, () => {
  console.log(`데이터 통신 서버가 ${PORT}에서 작동 중입니다!`);
});
