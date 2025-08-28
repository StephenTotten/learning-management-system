const { User, Course, Enrollment } = require('../models');

const seedDatabase = async () => {
  try {
    // Create sample users
    const users = await User.bulkCreate([
      {
        email: 'john@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student'
      },
      {
        email: 'jane@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'instructor'
      }
    ]);

    // Create sample courses
    const courses = await Course.bulkCreate([
      {
        title: 'Clarity',
        description: 'Discover mental clarity and focus through proven techniques and mindful practices',
        instructor: 'Jane Smith',
        duration: '6 weeks',
        price: 199.99
      },
      {
        title: 'Rooted',
        description: 'Build strong foundations and develop deep personal grounding in your values',
        instructor: 'Jane Smith',
        duration: '8 weeks',
        price: 249.99
      },
      {
        title: 'Relationships',
        description: 'Master the art of meaningful connections and healthy relationship dynamics',
        instructor: 'Jane Smith',
        duration: '10 weeks',
        price: 299.99
      }
    ]);

    // Create sample enrollments
    await Enrollment.create({
      userId: users[0].id,
      courseId: courses[0].id,
      progress: 25
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;