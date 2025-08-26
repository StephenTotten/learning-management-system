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
        title: 'JavaScript Fundamentals',
        description: 'Learn the basics of JavaScript programming',
        instructor: 'Jane Smith',
        duration: '4 weeks',
        price: 99.99
      },
      {
        title: 'React Development',
        description: 'Build modern web applications with React',
        instructor: 'Jane Smith',
        duration: '6 weeks',
        price: 149.99
      },
      {
        title: 'Node.js Backend',
        description: 'Server-side development with Node.js',
        instructor: 'Jane Smith',
        duration: '5 weeks',
        price: 129.99
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