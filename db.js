
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog_app', 'root', 'Roman@123', {
    host: 'localhost',
    dialect: 'mysql'
  });


  const connectDB = async()=>{
    try {
        await sequelize.authenticate();
        console.log('DB CONNECTED!');
      } catch (e) {
        console.error('DB CONNECTION FAILED', e);
      }
  }

  module.exports = connectDB;
  global.sequelize = sequelize;