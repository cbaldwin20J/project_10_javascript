'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patron = sequelize.define('Patron', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    library_id: DataTypes.STRING,
    zip_code: DataTypes.INTEGER
  }, {timestamps: false});
  Patron.associate = function(models) {
    // associations can be defined here
  };
  return Patron;
};