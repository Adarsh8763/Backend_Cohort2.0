import express from 'express';

const app = express();

app.get('/api', (req, res) => {
    res.send('Hello, World! I am Adarsh');
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ];
    res.status(200).json({
        "message": "Users fetched successfully",
        users
    })
})

export default app;