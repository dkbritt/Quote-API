const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Listening on port 4001');
});

app.get('/api/quotes/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    res.send({'quote': quote});
});


app.get('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    if (person) {
        const filteredQuotes = quotes.filter(q => q.person === person);
        res.send({ quotes: filteredQuotes });
    } else {
        res.send({ quotes: quotes });
    }
});


app.post('/api/quotes', (req, res, next) => {
    const newQuote = req.query.quote;
    const person = req.query.person;

    if (newQuote && person) {
        const newQuoteObj = {quote: newQuote, person: person}
        quotes.push(newQuoteObj)
        res.send({quote: newQuoteObj});
    } else {
        res.status(400).send();
    }
});