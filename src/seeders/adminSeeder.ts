import UserModel from '../models/userModel';

const seedAdmin = async () => {
  const adminExists = await UserModel.findOne({ role: 'admin' });
  if (!adminExists) {
    await UserModel.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log("Admin created");
  }
};

export default seedAdmin;
