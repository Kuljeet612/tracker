const members = require('./members.json');
const absences = require('./absences.json');

module.exports = () => ({
    members: members,
    absences: absences  
});