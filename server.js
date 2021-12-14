const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const db = require("./models");
db.sequelize.sync();

const PORT = 3000;

require("./routes/student.routes")(app);
require("./routes/family.routes")(app);

app.listen(PORT, function () {
    console.log("Sever running on localhost :" + PORT);
});

app.get('/', function (req, res) {
    res.send('hello from server');
})

//cls to clean
//https://github.com/supunmadushanka/sms-server.git