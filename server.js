const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    // Здесь можно добавить логику для обработки сообщения
    console.log(`Сообщение от ${name} (${email}): ${message}`);

    res.json({ message: 'Ваше сообщение отправлено. Спасибо!' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Сервер запущен на http://0.0.0.0:${port}`);
});