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
        unique: {
          msg: "This email is already used"
        }
      }
    },
    library_id: {
      type: DataTypes.INTEGER,
      validate: {
        unique: {
          msg: "This library id is already used"
        }
      }
    },
    zip_code: DataTypes.INTEGER
  }, {timestamps: false});
  Patron.associate = function(models) {
    // associations can be defined here
  };
  return Patron;
};