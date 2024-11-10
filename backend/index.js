const express = require('express');
const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
const { client } = require('./db');
const app = express();
dotenv.config();

const PORT = 3100;

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:3100',
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

// db setup
const db = client.db('skillSharing');
const collection = db.collection('users');

app.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        // store user in database if the email is not already in the database
        const email = req.oidc.user.email;
        collection
            .find({ email })
            .toArray()
            .then((result) => {
                if (result.length === 0) {
                    collection
                        .insertOne({ email })
                        .then(() => {
                            // send the user to frontend
                            res.redirect('http://localhost:3000/uploadResume');
                        })
                        .catch((err) => {
                            res.send(err);
                        });
                }
            });
    } else {
        res.send('Hello, please log in');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
