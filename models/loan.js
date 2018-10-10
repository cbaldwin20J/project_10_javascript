'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    book_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "book_id is required"
        }
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "patron_id is required"
        }
      }
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "loaned_on is required"
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "return_by is required"
        }
      }
    },
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