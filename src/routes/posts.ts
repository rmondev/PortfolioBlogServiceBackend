import express, { Request, Response, Router } from "express";
import Post from "../models/post";

// Explain: The `Router` type is imported from the `express` package and used to define the type of the `router` object.
// The `router` object is then used to define the routes for the posts API.
const router: Router = express.Router();

// ✅ Get all posts

// Explain: The `get` method is used to define a route that responds to HTTP GET requests.
// The route path is "/", and the callback function is an `async` function that retrieves all posts from the database.
// If an error occurs, the server responds with a 500 status code and an error message.
// If the operation is successful, the server responds with a JSON array of posts.
// The `await` keyword is used to wait for the `Post.findAll()` method to complete before returning the result.
// The `try-catch` block is used to handle any errors that occur during the database operation.
// The `res.json()` method is used to send the response to the client in JSON format.
// The `res.status()` method is used to set the status code of the response.
// The `console.error()` method is used to log the error to the console.
// The `Promise<void>` type is used to indicate that the function returns a promise that resolves to `void`.
// The `Request` and `Response` types are imported from the `express` package and used to define the types of the `req` and `res` objects.
// The `req` object represents the HTTP request, and the `res` object represents the HTTP response.
// The `async` keyword is used to define an asynchronous function that can use the `await` keyword to wait for promises to resolve.
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get a single post by ID
router.get("/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Create a new post

// Explain: The `post` method is used to define a route that responds to HTTP POST requests.
// The route path is "/", and the callback function is an `async` function that creates a new post in the database.
// The `req.body` object contains the data sent by the client in the request body.
// The `Post.create()` method is used to create a new post with the specified data.
// If an error occurs, the server responds with a 500 status code and an error message.
// If the operation is successful, the server responds with a 201 status code and the newly created post in JSON format.
// The `Promise<void>` type is used to indicate that the function returns a promise that resolves to `void`.
// The `Request` and `Response` types are imported from the `express` package and used to define the types of the `req` and `res` objects.
// The `req` object represents the HTTP request, and the `res` object represents the HTTP response.
// The `async` keyword is used to define an asynchronous function that can use the `await` keyword to wait for promises to resolve.
// The `res.status()` method is used to set the status code of the response.
// The `res.json()` method is used to send the response to the client in JSON format.
// The `console.error()` method is used to log the error to the console.

// What is the 1st and 2nd argument in the Request type?
// The 1st argument in the Request type is used to define the type of the `req.params` object.
// In this case, the 1st argument is an object with a property `id` of type `string`.
// This property represents the `id` parameter in the route path when getting a single post by ID.
// The 2nd argument in the Request type is an empty object `{}`.
// This argument is used to define the type of the `req.query` object, which is empty in this case.

// Why are the 1st and 2nd arguments in the Request type empty objects?
// The 1st and 2nd arguments in the Request type are empty objects because the route path for creating a new post does not contain any parameters or query strings.
// The `req.params` and `req.query` objects are not used in this route handler, so their types are defined as empty objects `{}`.
// The `req.body` object is used to access the data sent by the client in the request body when creating a new post.


// What is the 3rd argument in the Request type?
// The 3rd argument in the Request type is used to define the type of the `req.body` object.
// In this case, the 3rd argument is an object with the following properties: `title`, `body`, `category`, and `date`.
// These properties represent the data sent by the client in the request body when creating a new post.
// The type of the `req.body` object is defined as an object with the specified properties and their types.
// The `Request` type is a generic type that takes three type arguments: `ParamsType`, `BodyType`, and `QueryType`.
// The `BodyType` type argument is used to define the type of the `req.body` object.
// In this case, the `BodyType` type argument is an object with the specified properties and their types.




router.post("/", async (req: Request<{}, {}, { title: string; body: string; category: string; date: string }>,res: Response): Promise<void> => {
    try {
      const { title, body, category, date } = req.body;
      const newPost = await Post.create({ title, body, category, date });
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// ✅ Delete a post
router.delete("/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
