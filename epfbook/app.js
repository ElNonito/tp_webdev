const express = require('express')

const fs = require("fs")
const path = require("path");
const basicAuth = require('express-basic-auth')
const bcrypt = require("bcrypt");

const app = express()
const port = 3000

app.set('views', './views');
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
  basicAuth({
    authorizer: myAsyncAuthorizer,
    authorizeAsync: true,
    users: {[process.env.ADMIN_USERNAME]: process.env.ADMIN_PASSWORD },
    challenge:true,
  }))

function myAsyncAuthorizer(username, password, cb) {

  fs.readFile('users.csv', 'utf8',(err, data) => {

    const rows = data.split("\n");
    var possible_password = '0'
    for (let i = 1; i < rows.length; i++) {
      var user = rows[i].split(',');
      if (username == user[0]){
        possible_password = user[1]
      } 
    }
    bcrypt.compare(password, possible_password, cb);
  })
}

      


// ENDPOINTS
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"))
})


app.get('/students/data', (req, res) => {
  res.render(path.join(__dirname, "./views/students_data.ejs"))
})





app.get('/students/:id', (req, res) => {
  const id = req.params
  console.log(id)
  /*
  fs.readFile('stub_database.csv', 'utf8',(err, data) => {
    const rows = data.split("\n");
    var student_data = '0'
    for (let i = 1; i < rows.length; i++) {
      var student = rows[i].split(',');
      if (student == user[0]){
        possible_password = user[1]
      } 
    }
  })
*/

  res.render(path.join(__dirname, "./views/student_details.ejs"),
  {students: [{name:"Student name", school: "EPF"}]})
  
})







app.post("/api/login", (req, res) => {
  console.log("new cookie:", req.cookies);
  const token = "FOOBAR";
  const tokenCookie = {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  };
  res.cookie("auth-token", token, tokenCookie);
});


app.get('/students', (req,res) => {
  fs.readFile('stub_database.csv', 'utf8',(err, data) => {
    const rows = data.split("\n");
    var student_array = [] 
    for (let i = 1; i < rows.length; i++) {
      var student = rows[i].split(',');
      student = {
        name: student[0],
        school: student[1],
      };
      student_array.push(student)
    } 
    res.render("students", {
      students: student_array})

  })})



app.get("/students/create", (req, res) => {
  res.render("create-student");
});

app.post("/students/create", (req,res) => {
    console.log(req.body)
    const csvLine =   `\n${req.body.name},${req.body.school}`
    fs.appendFile('stub_database.csv', csvLine, (err) => {
      if (err) throw err;
    }); 
    res.redirect("/students/create?created=1")
});

app.get('/api/students', (req,res) => {
  fs.readFile('stub_database.csv', 'utf8',(err, data) => {
    if (err) throw err;
    res.send(data)
  });
} )

app.post('/api/students/create',(req,res) => {
  console.log(req.body)
  const csvLine =   `\n${req.body.name},${req.body.school}`
  fs.appendFile('stub_database.csv', csvLine, (err) => {
    if (err) throw err;
  });
  res.send('Student created')
 
} )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})