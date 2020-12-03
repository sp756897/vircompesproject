const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateideainput (data) {
    let errors={};

    data.iname = !isEmpty(data.iname) ? data.iname : "";
    data.icontent = !isEmpty(data.icontent) ? data.icontent : "";

    // Email checks
      if (Validator.isEmpty(data.iname)) {
        errors.iname = "Title field is required";
      }
    // Password checks
      if (Validator.isEmpty(data.icontent)) {
        errors.icontent = "Description field is required";
      }
    
      return {
          errors,
          isValid:isEmpty(errors)
      };
};