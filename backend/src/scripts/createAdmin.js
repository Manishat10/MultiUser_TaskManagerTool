const bcrypt = require('bcrypt');
const AppDataSource = require('../config/ormconfig');
const User = require('../entities/User');

async function createAdmin() {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    // Check if admin user already exists
    const userRepository = AppDataSource.getRepository(User);
    const existingAdmin = await userRepository.findOne({ where: { email: 'admin@example.com' } });
    
    if (existingAdmin) {
      console.log("Admin user already exists!");
      await AppDataSource.destroy();
      return;
    }

    // Create admin user
    const adminPassword = await bcrypt.hash('Admin123!', 10);
    const admin = userRepository.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      isAdmin: true
    });

    await userRepository.save(admin);
    console.log("Admin user created successfully!");
    console.log("Email: admin@example.com");
    console.log("Password: Admin123!");
    
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdmin();