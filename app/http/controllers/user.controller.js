const { createLinkForFiles } = require('../../modules/functions');
const { lanquage } = require('../../locales/fa');
const { UserModel } = require('../../models/user');

class UserController {
      getProfile(req, res, next) {
            try {
                  const user = req.user;
                  user.profile_image = createLinkForFiles(user.profile_image, req);
                  return res.status(200).json({
                        status: 200,
                        success: true,
                        user,
                  });
            } catch (error) {
                  next(error);
            }
      }
      async editProfile(req, res, next) {
            try {
                  let data = { ...req.body };
                  const userID = req.user._id;
                  let fields = ['first_name', 'last_name', 'skills'];
                  let badValues = ['', ' ', null, undefined, 0, -1, NaN, [], {}];
                  Object.entries(data).forEach(([key, value]) => {
                        if (!fields.includes(key)) delete data[key];
                        if (badValues.includes(value)) delete data[key];
                  });
                  const result = await UserModel.updateOne({ _id: userID }, { $set: data });
                  if (result.modifiedCount > 0) {
                        return res.status(200).json({
                              status: 200,
                              succerss: true,
                              message: lanquage.user.UpdateProfile,
                        });
                  }
                  throw { status: 400, message: lanquage.user.WrongUpdateProfile };
            } catch (error) {
                  next(error);
            }
      }
      async uploadProfileImage(req, res, next) {
            try {
                  const userID = req.user._id;
                  const filePath = req.file?.path?.substring(7);
                  const result = await UserModel.updateOne({ _id: userID }, { $set: { profile_image: filePath } });
                  console.log(result, filePath, userID);
                  if (result.modifiedCount == 0) throw { status: 400, message: lanquage.user.UpdateProfile };
                  return res.status(200).json({
                        status: 200,
                        success: true,
                        message: lanquage.user.UpdateProfile,
                  });
            } catch (error) {
                  next(error);
            }
      }
}
module.exports = {
      UserController: new UserController(),
};
