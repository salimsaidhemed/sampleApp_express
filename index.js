const express = require("express")
const app = express()
const router = express.Router()
const { engine } = require('express-handlebars')

app.set('view engine', 'handlebars');

app.engine('handlebars', engine({
    layoutsDir: __dirname + '/views/layouts',
}));

router.get("/",(req,res)=>{
    res.redirect("/landing")
})

router.get("/redirect",(req,res)=>{
    res.send("Redirect Router")
})

router.get("/landing",(req,res)=>{
    res.render(
        'index',{
            layout : 'base',
            title: 'Home Page for Test'
        }
    )
})

router.get("/logout",(req,res)=>{
    res.send("logout Router")
})

router.get("/logged_out",(req,res)=>{
    res.send("Logged Out Router")
})


app.use('/',router)

app.listen(process.env.port || 3000)
console.log('Web Server is Listening on port 3000')