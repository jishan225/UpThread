const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
let methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded ({extended : true}));

let posts = [
    {
        id : uuidv4(),
        username : "Mark Zuckerberg",
        content : "Every step you take, no matter how small, moves you closer to where you want to be.",
    },
    {
        id : uuidv4(),
        username : "Elon Musk",
        content : "Great things never come from comfort zones.",
    },
    {
        id : uuidv4(),
        username : "Bill Gates",
        content : "Progress is progress, no matter how slow—keep going!",
    },
];
// Implement GET  /posts {Index main}
app.get("/posts", (req, res) =>{
    res.render("index.ejs", {posts});
});

// Implement POST  /posts {Create Route}

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});
app.post("/posts", (req, res) =>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});


// Implement Get /posts/:id {show route}
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});


//Implement PATCH /posts/:id{update route}
app.patch("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})

//Implement Delete 
app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
})

app.listen(port, ()=>{
    console.log(`sun rha hu me at ${port}`);
});