const { Sequelize, DataTypes } = require('sequelize');


const User = sequelize.define('User', {
  // Model attributes are defined here
  id:{
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true // Or Sequelize.UUIDV1
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  token:{
      type: DataTypes.STRING
  }
 
});

User.sync()
    .then(()=>{
        console.log("User Table Created");
    })
    .catch((err) =>{
        console.log("Could  Not Create Table");
        console.log(err);
    })


module.exports = User;