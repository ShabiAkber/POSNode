class MenuVersionDto {
  constructor(data) {
    this.branchPKs = data.branchPKs;
    this.versionData = {
      MenuVer_Name: data.MenuVer_Name
    };
  }

  static validate(data) {
    const errors = [];

    // Check branchPKs
    if (!data.branchPKs || !Array.isArray(data.branchPKs)) {
      errors.push("branchPKs must be an array");
    } else if (data.branchPKs.length === 0) {
      errors.push("branchPKs cannot be empty");
    }

    // Check required fields
    if (!data.MenuVer_Name) {
      errors.push("MenuVer_Name is required");
    }

    return errors;
  }

  toJSON() {
    return {
      branchPKs: this.branchPKs,
      versionData: this.versionData
    };
  }
}

module.exports = MenuVersionDto; 