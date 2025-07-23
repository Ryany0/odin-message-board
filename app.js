const express = require("express");
const app = express();
const path = require("node:path");

//const newMessageRouter = require("./controller/new");
const  { Router } = require("express");
const newMessageRouter = Router();
const messageDetails = Router();




app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded( { extended: true } ));

const messages = [
    {
        text: "Hi!",
        user: "Name",
        added: new Date()
    },
    {
        text: "Hello!",
        user: "Name2",
        added: new Date()
    },
];

app.get("/", (req,res) => {
    res.render("index", {title: "Messages", messages: messages});
});

app.use("/new", newMessageRouter);
app.use("/details", messageDetails);

newMessageRouter.get("/", (req, res) => {
    res.render("form");
});

newMessageRouter.post("/", (req,res) => {
    const author = req.body.author;
    const messageText = req.body.messageText;
    messages.push({ text: messageText, user: author, added: new Date() });
    res.redirect("/");
});

messageDetails.get("/", (req,res) => res.send("No messages"));
messageDetails.get("/:author", (req, res) => {
    const { author } = req.params;
    const messageDetails = messages.find(m => m.user === author);
    res.render("details", {message: messageDetails});
});



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listen on PORT ${PORT}`);
});