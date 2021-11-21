const path = require("path");

const express = require("express");

const userController = require("../controllers/users");
const adminController = require("../controllers/admins");

const router = express.Router();

router.get("/admin_login", (req, res, next) => {
    res.render("admin_login", {
        pageTitle: "Admin Log in",
        path: "/admin_login",
    });
});

router.post("/admin_login", adminController.validateAdmin);

router.get("/", (req, res, next) => {
    res.render("login", {
        pageTitle: "Log in",
        path: "/",
    });
});

router.post("/", userController.validateUser);

// sends to signup page
// router.get("/signup", (req, res, next) => {
//     res.render("signup", {
//         pageTitle: "Sign Up",
//         path: "/signup",
//     });
// });

module.exports = router;