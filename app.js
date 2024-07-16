var express = require("express");
var path = require("path");
var logger = require("morgan");
const eja = require('ejs')
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const axios = require('axios')

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  return res.render('home')
})


app.post('/capture', (req, res) => {
  try {
    const data = {
      "phone": 9795002085,
      "mx_program_details": "Certificate",
      "email_address": "abc@gmail.com",
      "otherData": {
          "first_name": "test",
          "last_name": "test",
          "email_address": "abc@gmail.com",
          "phone": "9795002085",
          "source": "Website",
          "mx_program_details": "Certificate Program In Extended Reality",
          "mx_city": "Arunachal Pradesh",
          "mx_highest_qualification": "BBA",
          "mx_total_work_experience": "0-1"
      }
  }
    const response = axios.post('https://backend-n066.onrender.com/capture', data)
    console.log('headers: ', response.headers)
    console.log('data: ', response.data)

    return res.render('ok')
  } catch (error) {
    console.log('Error: ', error)
    return res.render('404')
  }
})

app.get('/validate', (req, res) => {
  try {
    const response = axios.get('https://backend-n066.onrender.com/validate')
    console.log('headers: ', response.headers)
    console.log('data: ', response.data)

    return res.json({ ok: true, data: response.data, headers: response.headers })
  } 
  catch (error) {
    console.log('Error in validate: ', error)
    return res.json({ ok: false, message: error.message })
  }
})



app.listen(3000, (req, res) => {
  console.log('Server running on port 3000')
})
