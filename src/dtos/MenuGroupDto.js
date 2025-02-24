class MenuGroupDto {
  constructor(data) {
    this.menuVersionPKs = data.menuVersionPKs;
    this.groupData = {
      MenuGrp_Name: data.MenuGrp_Name,
      MenuGrp_BranchFK: data.MenuGrp_BranchFK
    };
  }

  static validate(data) {
    const errors = [];

    // Check menuVersionPKs
    if (!data.menuVersionPKs || !Array.isArray(data.menuVersionPKs)) {
      errors.push("menuVersionPKs must be an array");
    } else if (data.menuVersionPKs.length === 0) {
      errors.push("menuVersionPKs cannot be empty");
    }

    // Check required fields
    if (!data.MenuGrp_Name) {
      errors.push("MenuGrp_Name is required");
    }
    if (!data.MenuGrp_BranchFK) {
      errors.push("MenuGrp_BranchFK is required");
    }

    return errors;
  }

  toJSON() {
    return {
      menuVersionPKs: this.menuVersionPKs,
      groupData: this.groupData
    };
  }
}

module.exports = MenuGroupDto; 