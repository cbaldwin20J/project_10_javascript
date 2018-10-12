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
          msg: "patron id is required"
        }
      }
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "loaned on is required"
        },
        isDate: {
          msg: "loaned on must be YYYY-MM-DD. ex: 2018-03-20"
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "return_by is required"
        },
        isDate: {
          msg: "return by must be YYYY-MM-DD. ex: 2018-03-20"
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