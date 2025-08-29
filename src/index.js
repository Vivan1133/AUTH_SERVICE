const express = require("express");
const { PORT, DB_SYNC } = require("./config/server-config");
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");
const db = require("./models/index");

const app = express();


const setupAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use("/api", apiRoutes);

    app.listen(PORT, () => {
        if(DB_SYNC) {
            db.sequelize.sync({alter: true})
        }
        console.log(`server started at PORT: ${PORT}`); 
    })  
    
}

setupAndStartServer();
