const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { username, password } = req.body;

    if(username === 'veeresh' && password === 'veeresh') {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: '10m'
        });
        res.json({ token });
    } else {
        res.status(401).json({message: 'Invalid credentials'});
    }
};

module.exports = { login };
