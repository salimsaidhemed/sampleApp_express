const CognitoExpress = require("cognito-express")
const express = require("express")
const app = express()
const Authenticatedroute = express.Router()
const { engine } = require('express-handlebars')
CognitoExpress = require("cognito-express")

const cognitoExpress = new CognitoExpress(
    {
        region: "us-east-1",
        cognitoUserPoolId: "us-east-1_1ie9aDc3T",
        tokenUse: "access",
        tokenExpiration: 3600000
    }
)


app.set('view engine', 'handlebars');

app.engine('handlebars', engine({
    layoutsDir: __dirname + '/views/layouts',
}));

app.use('/',Authenticatedroute)

Authenticatedroute.use(
    (req,res,next)=>{
        let accessTokenFromClient = req.headers.accesstoken;
        if (!accessTokenFromClient) return res.status(401).send("Access Token missing from header");
        cognitoExpress.validate(accessTokenFromClient,(err,response)=>{
            if (err) return res.status(401).send(err);
            res.locals.user = response;
            next();
        })

    }
)

Authenticatedroute.get("/",(req,res)=>{
    res.redirect("/landing")
})



Authenticatedroute.get("/landing",(req,res)=>{
    res.render(
        'index',{
            layout : 'base',
            title: 'Home Page for Test'
        }
    )
})

Authenticatedroute.get("/logout",(req,res)=>{
    res.send("logout Router")
})

Authenticatedroute.get("/logged_out",(req,res)=>{
    res.send("Logged Out Router")
})


// app.use('/',router)

app.listen(process.env.port || 3000)
console.log('Web Server is Listening on port 3000')