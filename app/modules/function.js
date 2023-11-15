const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

function hashString(str) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}

function tokenGenerator(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
}

function verifyJwtToken(token) {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if (!result) throw {status: 401, message: "لطفا وارد حساب کاربری خود شوید"};
    return result;
}

function createUploadPath() {
    let d = new Date();
    const Year = "" + d.getFullYear();
    const Mount = d.getMonth() + "";
    const day = "" + d.getDate();
    const uploadPath = path.join(__dirname, "..", "..", "public", "upload", Year, Mount, day);
    fs.mkdirSync(uploadPath, {recursive: true});
    return path.join("public", "upload", Year, Mount, day);
}

function createLinkForFiles(fileAddress, req) {
    return fileAddress ? req.protocol + "://" + "localhost:3000" + "/" + fileAddress.replace(/[\\\\]/gm, "/") : undefined;
}

module.exports = {
    hashString,
    tokenGenerator,
    verifyJwtToken,
    createUploadPath,
    createLinkForFiles,
};
