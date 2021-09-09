const { Sequelize, DataTypes } = require('sequelize');


const Blog = sequelize.define('Blog', {
  // Model attributes are defined here
  id:{
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true // Or Sequelize.UUIDV1
  },
  title: {
    type: DataTypes.STRING,
    
  },
  body: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
});

Blog.sync()
    .then(()=>{
        console.log("Blog Table Created");
    })
    .catch((err) =>{
        console.log("Could  Not Create Table");
        console.log(err);
    })


module.exports = Blog;