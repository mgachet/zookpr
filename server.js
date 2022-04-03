const express = require('express');
const { animals } = require('./data/animals.json');

const PORT = process.env.PORT || 3001;
const app = express();

const filterByQuery = (query, animalsArray) => {
    let filteredResults = animalsArray;
    let personalityTraitsArray = [];
    if (query.personalityTraits) {
        if (typeof query.personalityTraits === "string") {
            personalityTraitsArray = [query.personalityTraits];
        }
        else {
            personalityTraitsArray = query.personalityTraits;
        }
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) > -1);
        });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet == query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species == query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name == query.name);
    }

    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, animals);
    }

    res.json(results);
})

app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}!`);
});

