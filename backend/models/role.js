const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Role', RoleSchema);

// "roles": ["64980ca40277136fdc62464b", "64980ca40277136fdc62464c"]