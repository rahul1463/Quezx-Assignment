'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillSchema = new Schema({
    name: {type: String, required: true},
    id: {type: String},
    status: {type: Boolean},
});

module.exports = mongoose.model('skill', SkillSchema);