'use-strict'
var logger = require('../config/winston_logging');
var validator = require('validator');
var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}
function validateMobileNumber(mobileNumber) {
    var errors = {};
    errors.hasError = false;
    if (!validator.isNumeric(mobileNumber)) {
        errors.hasError = true;
        errors.mobile_number = "Mobile Number must be numeric";
    }
    if (errors.hasError != true) {
        if (mobileNumber.length != 10) {
            errors.hasError = true;
            errors.mobile_number = "Mobile Number length must be 10 digit long"; 
        }
    }
    return errors;
}
function validateEmailId(emailId) {
    var errors = {};
    errors.hasError = false;
    if (!validator.isEmail(emailId)) {
        errors.hasError = true;
        errors.emailId = "Invalid email id!";
    }
    return errors;
}
/**
 * function validateRegistrationAPIParams
 *  This function is used to validate parameters of registration api
 * @param req, res, next
 * @return 
 */
module.exports.validateRegistrationAPIParams = function(req, res, next) {
    var hasError = false;
    var errors = {};
    if (typeof req.body.mobile_number == undefined || typeof req.body.mobile_number == '') {
        hasError = true;
        errors.mobile_number = 'Mobile number can not be empty!';
    }
    if (hasError != true) {
        console.log('here');
        var response = validateMobileNumber(req.body.mobile_number);
        if (response.hasError == true) {
            hasError = true;
            errors.mobile_number = response.errors.mobile_number;
        }
    }
    if (typeof req.body.email != '' && req.body.email != '') {
        hasError = true;
        errors.email = 'Email Id can not be empty!';
    }
    if (hasError != true) {
        var response = validateEmailId(req.email);
        if (response.hasError == true) {
            hasError = true;
            errors.email = response.errors.emailId;
        }
    }
    if (hasError == true) {
        sendJSONResponse(res, 400, {
            'errors': errors
        });
        return;
    } else {
        next();
    }
}