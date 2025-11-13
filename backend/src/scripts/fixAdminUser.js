const bcrypt = require('bcrypt');
const AppDataSource = require('../config/ormconfig');
const User = require('../entities/User');

async function fixAdminUser() {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    // Check if admin user exists
    const userRepository = AppDataSource.getRepository(User);
    const adminUser = await userRepository.findOne({ where: { email: 'admin@example.com' } });
    
    if (!adminUser) {
      console.log("Admin user does not exist. Creating one...");
      
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
    } else {
      console.log("Admin user found. Checking isAdmin status...");
      console.log("Current isAdmin status:", adminUser.isAdmin);
      
      if (!adminUser.isAdmin) {
        console.log("Updating isAdmin status to true...");
        adminUser.isAdmin = true;
        await userRepository.save(adminUser);
        console.log("Admin user updated successfully!");
      } else {
        console.log("Admin user already has correct isAdmin status.");
      }
    }
    
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error fixing admin user:", error);
    process.exit(1);
  }
}

fixAdminUser();