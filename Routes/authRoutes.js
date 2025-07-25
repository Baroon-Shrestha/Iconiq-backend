const express = require("express");
const {
  adminLogin,
  adminLogout,
  signOut,
  adminMe,
} = require("../Controllers/adminLogin");
const { verifyAdmin } = require("../MIddlewares/verifyAdmin");

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", signOut);
router.get("/me", verifyAdmin, adminMe);

module.exports = router;
