'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
    	type: DataTypes.STRING,
    	validate: {
    		notEmpty: {
    			msg: "Title is required"
    		}
    	}
    },
    author: {
    	type: DataTypes.STRING,
    	validate: {
    		notEmpty: {
    			msg: "Author is required"
    		}
    	}
    },
    genre: DataTypes.STRING,
    first_published: DataTypes.INTEGER
  }, {timestamps: false});
  Book.associate = function(models) {
    
  };
  return Book;
};



