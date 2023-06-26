const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const verify = require("./middlewares/verify");
const controller = require("./middlewares/controller");
const auth_jwt_token = require("./middlewares/auth");
const Role = require("./models/role");
const Post = require("./models/posts");
const User = require("./models/user");
require('dotenv/config');
const app = express();
const port = 5000;

app.listen(port, () => console.log(`listening on port ${port}!`));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

async function initialize() {
    try {
      const count = await Role.estimatedDocumentCount();
      if (count === 0) {
        await Promise.all([
          new Role({ name: "user" }).save(),
          new Role({ name: "admin" }).save()
        ]);
        console.log("'user' and 'admin' roles added to the roles collection");
      }
    } catch (err) {
      console.error("Error initializing roles:", err);
    }
} 

mongoose
  .connect("mongodb+srv://sonudeo2012:1234asdg@cluster0.7o9mssq.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connected!");
    initialize();
  })
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

app.post("/signin", controller.signin);

app.post("/signup", 
  [
      verify.checkDuplicate,
      verify.checkRolesExisted
  ],
  controller.signup
);

app.post("/post", [auth_jwt_token.verifyToken, auth_jwt_token.isAdmin], (req, res)=>{
    const post = new Post({
        images: req.body.images,
        foods: req.body.foods,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        createdBy: req.body.createdBy
    });
    post.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.json({ message: err });
    });
});

app.get('/test', [auth_jwt_token.verifyToken, auth_jwt_token.isAdmin], (req, res)=>{
    res.send('Hello Admin!');
});

app.get('/allpost', async (req, res)=>{
    const posts = await Post.find({active: true});
    res.send(posts);
});

app.get('/getPost/:id',[auth_jwt_token.verifyToken],async(req,res)=>{
  const post = await Post.findById(req.params.id);
  res.json(post);
});

app.put('/accept', [auth_jwt_token.verifyToken], async (req, res) => {
    const accId = req.body.accId;
    const postId = req.body.postId;

    try {
        const post = await Post.findOne({ _id: postId });
        post.set({ active: false, acceptedBy: accId });

        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

