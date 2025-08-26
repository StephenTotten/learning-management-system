const User = require('./User');
const Course = require('./Course');
const Enrollment = require('./Enrollment');

// Define associations
User.hasMany(Enrollment, { foreignKey: 'userId' });
Course.hasMany(Enrollment, { foreignKey: 'courseId' });
Enrollment.belongsTo(User, { foreignKey: 'userId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

// Many-to-many through Enrollment
User.belongsToMany(Course, { through: Enrollment, foreignKey: 'userId' });
Course.belongsToMany(User, { through: Enrollment, foreignKey: 'courseId' });

module.exports = {
  User,
  Course,
  Enrollment,
};