const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

let blogs = [
  {
    id: 1,
    title: "First Blog Post",
    author: "Admin",
    content: "This is my first static blog post using Node and EJS."
  },
  {
    id: 2,
    title: "Learning Express",
    author: "Kinjal",
    content: "Express makes backend development simple and fast."
  }
];

app.get("/", (req, res) => {
    res.render("index", {blogs});
})

app.post("/newblog", (req, res) => {
    const {title, author, content} = req.body;

    blogs.push({
        id: blogs.length + 1,
        title, 
        author,
        content
    })

    res.redirect("/blogList");
})

app.get("/blogList", (req, res) => {
    res.render("blogList", {blogs});
})

app.post("/delete/:i", (req, res) => {
    const id = req.params.i;
    blogs.splice(id, 1);
    res.redirect("/blogList")
})

module.exports = { app }