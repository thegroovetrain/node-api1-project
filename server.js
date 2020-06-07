const express = require('express');
const db = require('./database.js');

const server = express();
server.use(express.json());

server.get("/api/users", (req, res) => {
    console.log("GET /api/users");
    const users = db.getUsers();
    res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) =>{
    const id = req.params.id;
    console.log(`GET /api/users/${id}`);
    const user = db.getUserById(id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({message:`User with id ${id} not found.`});
    }
});

server.post("/api/users", (req, res) => {
    console.log("POST /api/users", req.body);
    if (!req.body.name) {
        return res.status(400).json({message:"Need a name for the user"});
    }
    if (!req.body.bio) {
        return res.status(400).json({message:"Need a bio for the user"});
    }

    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
    });

    res.status(201).json(newUser);
});

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    console.log(`PUT /api/users/${id}`);
    const user = db.getUserById(id);
    if (user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio,
        });
        res.status(200).json(updatedUser);
    } else {
        res.status(404).json({message:`User with id ${id} not found`});
    }
});

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    console.log(`DELETE /api/users/${id}`);
    const user = db.getUserById(id);
    if (user) {
        db.deleteUser(user.id);
        res.status(200).json(user);
    } else {
        res.status(404).json({message:`User with id ${id} not found`});
    }
});

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});