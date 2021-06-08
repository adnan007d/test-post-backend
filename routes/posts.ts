import express from "express";
import {
  createPosts,
  deletePosts,
  getPosts,
  likePosts,
  updatePosts,
} from "../controllers/posts";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", getPosts);
router.post("/create", auth, createPosts);
router.patch("/:id/like", auth, likePosts);
router.delete("/:id/delete", auth, deletePosts);
router.patch("/:id/update", auth, updatePosts);

export default router;
