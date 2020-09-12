const express = require("express");
const { 
    createBlog, 
    insertBlog, 
    editBlog, 
    updateBlog, 
    deleteBlog, 
    allBlogs, 
    blogDetail 
} = require("../controllers/blogController");

const router = express.Router();

router.get("/create", createBlog);
router.post("/", insertBlog);
router.get("/edit/:id", editBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.get("/", allBlogs);
router.get("/:slug", blogDetail);

module.exports = router;