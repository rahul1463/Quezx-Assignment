'use  strict';

// Dependencies
var express = require('express');
var router = express.Router();

var path = require('path');
// schema path
var Skill = require(path.resolve('./server/model/data'));

// Get route for fetching data from the json file
router.get('/skills', function (req, res, next) {
    
    Skill.find({})
        .then(function (result) {
            if (result.length > 0) {
                return res.send(result);
            } else {
                return res.send([]);
            }
        })
        .catch(function (err) {
            console.log(err);
            if (err) {
                return res.status(500).json({
                    message: "An error occured",
                    error: err
                });
            }
        });
});

// Get route for fetching data from the json file
router.get('/skills/:name/search', function (req, res, next) {
    
    Skill.find({ name: req.params.name })
        .then(function (result) {
            if (result.length > 0) {
                console.log(result);
                return res.send(result);
            } else {
                console.log("no result");
                return res.send([]);
            }
        })
        .catch(function (err) {
            console.log(err);
            if (err) {
                return res.status(500).json({
                    message: "An error occured",
                    error: err
                });
            }
        });
});

// Post route for posting data in the json file
router.post('/skills', function (req, res, next) {
    // get obj from req.body
    var arr = [];
    if (req.body.name !== '') {
        // save it to mongodb using save method
        var skill = new Skill(req.body).save();
        // send the data to front end in a array
        arr.push(req.body);
        res.send(arr);
    } else {
        res.send([]);
    }
});

// Update name
router.put('/skills/:id/update', function (req, res, next) {
    // update name using mongoose findOneAndUpdate method
    Skill.findOneAndUpdate({ id: req.params.id },
        {
            name: req.body.name
        },
        { new: true })
        .then(function (result) {
            // send the data to front end
            res.send(result);
        })
        .catch(function (err) {
            if (err) {
                return res.status(500).json({
                    message: 'An error occured',
                    error: err
                });
            }
        });
});

// Update status
router.put('/skills/:id/approve', function (req, res, next) {
    // check if status is true or false and sabe it as 0 for false and 1 for true
    if (req.body.status === true) {
        bool = 1;
    } else {
        bool = 0;
    }
    // update status using mongoose findOneAndUpdate method
    Skill.findOneAndUpdate({ id: req.params.id },
        {
            status: bool
        },
        { new: true })
        .then(function (result) {
            // send the data to front end
            res.send(result);
        })
        .catch(function (err) {
            if (err) {
                return res.status(500).json({
                    message: 'An error occured',
                    error: err
                });
            }
        });
});

module.exports = router;