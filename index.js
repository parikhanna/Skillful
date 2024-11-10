const express = require('express');
const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const PORT = 3000;

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:3000',
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_URL,
    secret: process.env.AUTH0_SECRET,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/jobs', require('./routes/jobs'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
