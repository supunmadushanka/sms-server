const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

const PORT = 3000;

require("./routes/student.routes")(app);

app.listen(PORT, function () {
    console.log("Sever running on localhost :" + PORT);
});

app.get( '/' , function(req , res) {
	res.send('hello from server');
}) 


//cls to clean