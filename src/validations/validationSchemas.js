const Joi = require("joi");

// ✅ UserType Validation
const userTypeSchema = Joi.object({
  UsrT_PK: Joi.string().required(),
  UserT_Name: Joi.string().min(3).max(50).required(),
});

// ✅ WageType Validation
const wageTypeSchema = Joi.object({
  WageT_PK: Joi.string().required(),
  WageT_Name: Joi.string().min(3).max(50).required(),
});

// ✅ Department Validation
const departmentSchema = Joi.object({
  Dept_PK: Joi.string().required(),
  Dept_Name: Joi.string().min(3).max(100).required(),
});

module.exports = {
  userTypeSchema,
  wageTypeSchema,
  departmentSchema,
};
