const express = require('express');
const router = express.Router();

const Suggestion = require('../models/Suggestion');

// Get all suggestions
router.get('/', async (req, res) => {
    try {
        const suggestions = await Suggestion.find({});
        res.json(suggestions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Create a suggestion
router.post('/', async (req, res) => {
    suggestionsWithId = await Suggestion.find({
        "id": req.body.id
    })

    if (suggestionsWithId.length) return res.status(409).json({ message: "Suggestion already exists" });

    const suggestion = new Suggestion({
        name: req.body.name,
        release_date: req.body.release_date,
        poster_path: req.body.poster_path,
        vote_average: req.body.vote_average,
        overview: req.body.overview,
        id: req.body.id
    })

    try {
        const newSuggestion = await suggestion.save();
        res.status(201).json(newSuggestion);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

// Get a specific suggestion
router.get('/:id', getSuggestion, async (req, res) => {
    res.json(res.suggestion);
})

// Update a specific suggestion
router.patch('/:id', getSuggestion, async (req, res) => {
    if (req.body.name != null) {
        res.suggestion.name = req.body.name;
    }

    if (req.body.release_date != null) {
        res.suggestion.release_date = req.body.release_date;
    }

    if (req.body.id != null) {
        res.suggestion.id = req.body.id;
    }

    if (req.body.poster_path != null) {
        res.suggestion.poster_path = req.body.poster_path;
    }

    if (req.body.vote_average != null) {
        res.suggestion.vote_average = req.body.vote_average;
    }

    if (req.body.overview != null) {
        res.suggestion.overview = req.body.overview;
    }

    try {
        const updatedSuggestion = await res.suggestion.save()
        res.json(updatedSuggestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// Delete a specific suggestion
router.delete('/:id', getSuggestion, async (req, res) => {
    try {
        await res.suggestion.remove(); 
        res.json({message: "Deleted suggestion"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

async function getSuggestion(req, res, next) {
    let suggestion;

    try {
        suggestion = await Suggestion.find({
            "id": req.params.id
        });
        if(!suggestion.length) {
            return res.status(404).json({ message: "Could not find movie suggestion" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    res.suggestion = suggestion[0];
    next();
}

module.exports = router;