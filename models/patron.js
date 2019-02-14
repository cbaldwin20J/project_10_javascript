'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patron = sequelize.define('Patron', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "First name is required"
        }
      }
    },
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email is required"
        }
      }
    },
    library_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Library Id is required"
        }
      }
    },
    zip_code: DataTypes.INTEGER
  }, {
    timestamps: false,

    });
  Patron.associate = function(models) {
    // associations can be defined here
  };
  return Patron;
};