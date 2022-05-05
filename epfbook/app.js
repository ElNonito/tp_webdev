const express = require('express')

const fs = require("fs")
const path = require("path");

const app = express()
const port = 3000

app.set('views', '/home/arnaud/Documents/tp_dev/epfbook/views');
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"))
})


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