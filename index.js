const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv")
const path = require("path");
//doenv config
dotenv.config()

//rest obj
const app = express();

//middlewares
app.use(cors())
app.use(express.json())

//static files
app.use(express.static(path.join(__dirname, "./client/dist")))

//route
app.use("/api/v1/portfolio", require("./routes/contact_route"))

app.get("*", function(req,res){
    res.sendFile(path.join(__dirname, "./client/dist/index.html"))
})
//port
// const port = 8080;
const PORT = process.env.PORT || 8080

//listener
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})