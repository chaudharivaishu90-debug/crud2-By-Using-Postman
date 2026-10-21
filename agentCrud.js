const express = require("express");
const { post } = require("./data/data");

const app = express();
const PORT = 3001;

app.use(express.json());

const isObject = (value) =>
    value !== null && typeof value === "object" && !Array.isArray(value);

// Get all posts
app.get("/api/posts", (req, res) => {
    res.status(200).json({
        success: true,
        data: post
    });
});

// Get one post by ID
app.get("/api/posts/:id", (req, res) => {
    const foundPost = post.find((item) => String(item.id) === req.params.id);

    if (!foundPost) {
        return res.status(404).json({
            success: false,
            message: `Post not found with id ${req.params.id}`
        });
    }

    res.status(200).json({
        success: true,
        data: foundPost
    });
});

// Create a post
app.post("/api/posts", (req, res) => {
    if (!isObject(req.body)) {
        return res.status(400).json({
            success: false,
            message: "The request body must be a JSON object"
        });
    }

    let id = Date.now();
    while (post.some((item) => String(item.id) === String(id))) {
        id += 1;
    }

    const newPost = { ...req.body, id: String(id) };
    post.push(newPost);

    res.status(201).json({
        success: true,
        data: newPost
    });
});

// Update a post by ID
app.put("/api/posts/:id", (req, res) => {
    const postIndex = post.findIndex(
        (item) => String(item.id) === req.params.id
    );

    if (postIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Post not found with id ${req.params.id}`
        });
    }

    if (!isObject(req.body) || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: "The request body must be a non-empty JSON object"
        });
    }

    const updatedPost = {
        ...post[postIndex],
        ...req.body,
        id: post[postIndex].id
    };
    post[postIndex] = updatedPost;

    res.status(200).json({
        success: true,
        data: updatedPost
    });
});

// Delete a post by ID
app.delete("/api/posts/:id", (req, res) => {
    const postIndex = post.findIndex(
        (item) => String(item.id) === req.params.id
    );

    if (postIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Post not found with id ${req.params.id}`
        });
    }

    const [deletedPost] = post.splice(postIndex, 1);
    res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        data: deletedPost
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Return JSON errors, including invalid JSON sent to express.json().
app.use((err, req, res, next) => {
    const statusCode = Number.isInteger(err.status) ? err.status : 500;

    if (statusCode >= 500) {
        console.error(err);
    }

    res.status(statusCode).json({
        success: false,
        message: statusCode >= 500 ? "Internal server error" : err.message
    });
});

app.listen(PORT, () => {
    console.log(`Post CRUD server is running on port ${PORT}`);
});
