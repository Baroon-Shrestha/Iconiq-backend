const express = require("express");
const router = express.Router();
const {
  postBlog,
  getAllBlogs,
  getOneBlog,
  deleteBlog,
  getBlogAsAdmin,
  updatePublishStatus,
  getAllCategories,
} = require("../Controllers/blogController");
const { verifyAdmin } = require("../MIddlewares/verifyAdmin");

router.post("/post-blog", verifyAdmin, postBlog);
router.get("/blogs", getAllBlogs);
router.get("/all-blogs", verifyAdmin, getBlogAsAdmin);
router.get("/categories", getAllCategories);
router.get("/:id", getOneBlog);
router.patch("/update-status/:id", verifyAdmin, updatePublishStatus);
router.delete("/delete/:id", verifyAdmin, deleteBlog);

module.exports = router;
