const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
  methods: ['GET', 'POST']
}));

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',  // MySQL 비밀번호
  database: 'user'   // 데이터베이스 이름
});

// 데이터베이스 연결 시도
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    return;
  }
  console.log('MySQL에 성공적으로 연결되었습니다.');
});

// POST 요청의 데이터를 처리할 수 있게 설정
app.use(bodyParser.json());

// 회원가입 정보를 DB에 저장하는 라우트
app.post('/', (req, res) => {
  const { userId, password, nickname, name, birthdate, phoneNumber, gender } = req.body;

  // 사용자 정보를 DB에 삽입하는 쿼리
  const query = `
    INSERT INTO users (userId, password, nickname, name, birthdate)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(query, [userId, password, nickname, name, birthdate], (err, results) => {
    if (err) {
      console.error('데이터 삽입 오류:', err);
      res.status(500).send('회원가입 중 오류가 발생했습니다.');
      return;
    }
    res.status(200).send('회원가입이 성공적으로 완료되었습니다.');
  });
});

// 서버 실행
app.listen(8080, () => {
  console.log('http://localhost:8080 에서 서버 실행중');
});
