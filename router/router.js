const express=require("express");
const router=express.Router();
const postcontroller = require("../controller/postcontroller");

// get
router.get("/",postcontroller.getAllpost);

//craet
router.post("/",postcontroller.craetePost);

// update
router.patch("/:id",postcontroller.updatePost);

// delte
router.delete("/:id",postcontroller.DeletePost);

module.exports=router;