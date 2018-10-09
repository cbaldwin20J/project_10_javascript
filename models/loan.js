'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: DataTypes.DATEONLY,
    return_by: DataTypes.DATEONLY,
    returned_on: DataTypes.DATEONLY
  }, {
    timestamps: false,
  });
  Loan.associate = function(models) {
    Loan.belongsTo(models.Patron, { foreignKey: "patron_id"});
    Loan.belongsTo(models.Book, { foreignKey: "book_id"});
  };

  Loan.prototype.return_by_compare = function() {
    return new Date(this.return_by);
  };
  return Loan;
};