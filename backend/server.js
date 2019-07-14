const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const storyRoutes = express.Router();
const PORT = 4000;
let Story = require('./story.model');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/teletale', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

storyRoutes.route('/').get(function(req, res) {
    Story.find(function(err, stories) {
        if (err) {
            console.log(err);
        } else {
            res.json(stories);
        }
    });
});

storyRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Story.findById(id, function(err, story) {
        res.json(story);
    });
});

storyRoutes.route('/update/:id').post(function(req, res) {
    Story.findById(req.params.id, function(err, story) {
        if (!story)
            res.status(404).send("data is not found");
        else
            story.story_title = req.body.story_title;
            story.story_content = req.body.story_content;
            story.save().then(story => {
                res.json('Story updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
storyRoutes.route('/add').post(function(req, res) {
    let story = new Story(req.body);
    story.save()
        .then(story => {
            res.status(200).json({'story': 'story added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new story failed');
        });
});
app.use('/stories', storyRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});