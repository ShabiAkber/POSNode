const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Branch = require("./Branch");

const GiftCardDetail = sequelize.define("GiftCardDetails", {
  GiftCrd_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  GiftCrdIss_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  GiftCrd_CrdNum: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  GiftCrd_ExpDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  GiftCrd_Bal: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
  GiftCrd_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Branch,
      key: "Branch_PK"
    }
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = GiftCardDetail;
