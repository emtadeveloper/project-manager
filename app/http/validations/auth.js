const { body } = require('express-validator');
const { UserModel } = require('../../models/user');
const { lanquage } = require('../../locales/fa');

const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;

function registerValidator() {
      return [
            body('username').custom(async (value, ctx) => {
                  if (value.length == 0) throw lanquage.auth.EmptyUserName;
                  if (!usernameRegex.test(value)) throw lanquage.auth.WrongUserName;
                  const user = await UserModel.findOne({ username: value });
                  if (user) throw lanquage.auth.DuplicateUserName;
                  return true;
            }),
            body('email')
                  .isEmail()
                  .withMessage(lanquage.auth.WrongEmail)
                  .custom(async email => {
                        const user = await UserModel.findOne({ email });
                        if (user) throw lanquage.auth.DuplicateEmail;
                        return true;
                  }),
            body('mobile')
                  .isMobilePhone('fa-IR')
                  .withMessage(lanquage.auth.WrongPhoneNumber)
                  .custom(async mobile => {
                        const user = await UserModel.findOne({ mobile });
                        if (user) throw lanquage.auth.DuplicatePhoneNumber;
                        return true;
                  }),
            body('password').custom((value, ctx) => {
                  const confrim_password = ctx?.req?.body.confrim_password;
                  if (!value) throw lanquage.auth.EmptyPassword;
                  if (value !== confrim_password) throw lanquage.auth.DoNotRepeatTheSamePassword;
                  return true;
            }),
      ];
}

function loginValidation() {
      return [
            body('username').custom(username => {
                  if (username.length == 0) throw lanquage.auth.EmptyUserName;
                  if (usernameRegex.test(username)) {
                        return true;
                  }
                  throw lanquage.auth.WrongUserName;
            }),
            body('password').isLength({ min: 6, max: 16 }).withMessage(lanquage.auth.MaxMinPassword),
      ];
}

module.exports = {
      registerValidator,
      loginValidation,
};
