// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use body-parser to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import comments module
const comments = require('./comments');
// Import comments module
const users = require('./users');

// GET /comments
// GET /comments?postId=1
app.get('/comments', (req, res) => {
  const postId = req.query.postId;
  if (postId) {
    res.send(comments.filter((comment) => comment.postId == postId));
  } else {
    res.send(comments);
  }
});

// GET /comments/1
app.get('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id == req.params.id);
  res.send(comment);
});

// POST /comments
app.post('/comments', (req, res) => {
  const comment = {
    id: Date.now().toString(),
    ...req.body,
  };
  comments.push(comment);
  res.send(comment);
});

// PUT /comments/1
app.put('/comments/:id', (req, res) => {
  const index = comments.findIndex((comment) => comment.id == req.params.id);
  const comment = {
    id: req.params.id,
    ...req.body,
  };
  comments[index] = comment;
  res.send(comment);
});

// DELETE /comments/1
app.delete('/comments/:id', (req, res) => {
  const index = comments.findIndex((comment) => comment.id == req.params.id);
  const comment = comments.splice(index, 1);
  res.send(comment);
});

// GET /users
app.get('/users', (req, res) => {
  res.send(users);
});

// GET /users/1
app.get('/users/:id', (req, res) => {
  const user = users.find((user) => user.id == req.params.id);
  res.send(user);
});

// POST /users
app.post('/users', (req, res) => {
  const user = {
    id: Date.now().toString(),
    ...req.body,
  };
  users.push(user);
  res.send(user);
});

// PUT /users/1
app.put('/users/:id', (req, res) => {
  const