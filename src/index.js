const express = require("express");
const { PORT } = require("./config/server-config");
const app = express();


const setupAndStartServer = () => {

    app.listen(PORT , () => {
        console.log(`server started at PORT: ${PORT}`);
    })

}

setupAndStartServer();
