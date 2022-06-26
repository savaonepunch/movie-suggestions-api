const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

const { registerValidation } = require('../validation');

// ENDPOINTS
router.get('/', (req, res) => {
    res.json({
        message: "This is the authentication route."
    })
});

router.post('/register', async (req, res) => {
    // Validating dataa before creating user
    const { error } = registerValidation(req.body);

    if (error) return res.status(400).json({ message: error.details[0].message });

    // Check if user is already in the database
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).json({ message: 'Email already exists.' });

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    // Check if user exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: 'Email not found.' });

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ error: "Password is incorrect" })

    res.json(user);
});

module.exports = router;