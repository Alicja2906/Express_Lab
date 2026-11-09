
const express = require('express');


const app = express();
const logger = (req, res, next) => {
    const start = new Date();

    console.log(
        `${start.toLocaleString()} - ${req.method} ${req.url}`
    );

    next();
};
app.use(logger);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

const port = process.env.PORT || 3000;

// Pierwsza trasa
app.get('/', (req, res) => {
    res.send('Witaj w aplikacji Express!');
});

// Trasa kontaktowa
app.get('/contact', (req, res) => {
    res.send('Strona kontaktowa');
});

// Trasa zwracająca JSON
app.get('/api/info', (req, res) => {
    res.json({
        application: 'Express LAB4',
        version: '1.0'
    });
});

app.get('/api/users/search', (req, res) => {
    const { name, page = 1 } = req.query;

    res.json({
        name: name,
        page: page
    });
});

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    res.json({
        message: 'Pobrano użytkownika',
        id: id
    });
});

// POST - dodawanie danych
app.post('/api/users', (req, res) => {
    res.status(201).json({
        message: 'Użytkownik został dodany'
    });
});

app.post('/api/users', (req, res) => {
    const user = req.body;

    res.status(201).json(user);
});

app.post('/contact', (req, res) => {
    const { name, email } = req.body;

    res.send(`Witaj ${name}! Twój email to ${email}`);
});

// PUT - aktualizacja danych
app.put('/api/users/:id', (req, res) => {
    res.status(200).json({
        message: 'Użytkownik został zaktualizowany',
        id: req.params.id
    });
});

// DELETE - usuwanie danych
app.delete('/api/users/:id', (req, res) => {
    res.status(204).send();
});

// Uruchomienie serwera
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
