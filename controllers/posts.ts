import { Handler, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { CustomRequest } from "../middleware/auth";
import Post, { IPost, IPostDoc } from "../models/posts";

const getPosts: Handler = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();

    return res
      .status(200)
      .json(posts.map((post) => ({ ...post.toJSON(), id: post._id })));
  } catch (err) {
    console.error(err);
    return res.status(404).json({ message: "Posts Not Found" });
  }
};

const createPosts: any = async (req: CustomRequest, res: Response) => {
  const post = req.body;
  const newPost = new Post({ ...post, user: req.user });
  try {
    const createdPost = await newPost.save();
    return res.status(201).json({
      message: "Post created",
      data: { ...createdPost.toJSON(), id: createdPost._id },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const updatePosts: any = async (req: CustomRequest, res: Response) => {
  const id = req.params.id;
  const body: IPost = req.body;

  if (id !== body.id)
    return res
      .status(401)
      .json({ message: "UnAuthorized, I see you trying to break me huh ?" });

  if (!isValidObjectId(id))
    return res.status(404).json({ message: "Post Not Found" });
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title: body.title,
        description: body.description,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "updated Successfully",
      data: { ...updatedPost?.toJSON(), id: updatedPost?.id },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const likePosts: any = async (req: CustomRequest, res: Response) => {
  const id = req.params.id;

  if (!isValidObjectId(id))
    return res.status(404).json({ message: "Post Not Found" });

  const post = await Post.findById(id);

  if (!post) return res.status(404).json({ message: "Post Not Found" });

  try {
    const uid = req.user.uid;
    const index = post?.likes?.findIndex((id) => id === uid);

    if (index === -1) post?.likes?.push(String(uid));
    else post.likes = post?.likes?.filter((id) => id !== String(uid));

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    return res.status(200).json({
      message: "We will work",
      data: { ...updatedPost?.toJSON(), id: updatedPost?._id },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deletePosts: any = async (req: CustomRequest, res: Response) => {
  const id = req.params.id;

  if (!isValidObjectId(id))
    return res.status(404).json({ message: "Post Not Found" });

  try {
    await Post.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Post deleted Successfully!!", data: id });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

export { getPosts, createPosts, likePosts, deletePosts, updatePosts };
