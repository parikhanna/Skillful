const router = require('express').Router();
const { client } = require('../db');

const db = client.db('skillSharing');
const collection = db.collection('jobs');

router.post('/post-job', async (req, res) => {
    const { title, description, skill, location, dueDate, comments } = req.body;
    //   console.log(title, description, skill, location, dueDate, comments);
    const job = {
        title,
        description,
        skill,
        location,
        dueDate,
        comments,
    };

    const result = await collection.insertOne(job);

    if (result.insertedCount === 0) {
        return res.send('Failed to request job');
    }

    return res.send('Job requested successfully');
});

router.get('/get-all-jobs', async (req, res) => {
    const jobs = await collection.find().toArray();
    if (jobs.length === 0) {
        return res.send('No jobs found');
    }
    return res.send(jobs);
});

module.exports = router;
