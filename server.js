const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'your_secret_key';

app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',  
  database: 'user'   
});


connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    return;
  }
  console.log('MySQL에 성공적으로 연결되었습니다.');
});


app.post('/register', (req, res) => {
  const { userid, password, nickname } = req.body;

  const query = `
    INSERT INTO users (userid, password, nickname)
    VALUES (?, ?, ?)
  `;

  connection.query(query, [userid, password, nickname], (err, results) => {
    if (err) {
      console.error('데이터 삽입 오류:', err);
      res.status(500).send('회원가입 중 오류가 발생했습니다.');
      return;
    }
    res.status(200).send('회원가입이 성공적으로 완료되었습니다.');
  });
});

app.post('/login', (req, res) => {
  const { userid, password } = req.body;

  const query = 'SELECT * FROM users WHERE userid = ? AND password = ?';
  connection.query(query, [userid, password], (err, results) => {
    if (err) {
      console.error('데이터 조회 오류:', err);
      res.status(500).send('서버 오류가 발생했습니다.');
      return;
    }

    if (results.length > 0) {
      const token = jwt.sign({ userid: userid }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).send('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  });
});


app.listen(8080, () => {
  console.log('http://localhost:8080 에서 서버 실행중');
});
