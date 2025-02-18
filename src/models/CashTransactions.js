const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const CashRegister = require("./CashRegisters");
const UserDetail = require("./UserDetails");
const Branch = require("./Branches");

const CashTransaction = sequelize.define("CashTransactions", {
  CashTrans_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  CashTrans_CashRegFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: CashRegister,
      key: "CashReg_PK"
    }
  },
  CashTrans_AuthUsrFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: UserDetail,
      key: "Usr_PK"
    }
  },
  CashTrans_Type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CashTrans_Amt: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  CashTrans_Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  CashTrans_Time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  CashTrans_ExpOutAmt: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  CashTrans_DisReason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CashTrans_UserFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: UserDetail,
      key: "Usr_PK"
    }
  },
  CashTrans_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Branch,
      key: "Branch_PK"
    }
  },
  IsDeleted: {  // Assuming `IsDelete` means a soft delete flag
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "CashTransactions",
  timestamps: false,
});

module.exports = CashTransaction;
