const express = require('express')

const fs = require("fs")
const path = require("path");

const app = express()
const port = 3000

app.set('views', '/home/arnaud/Documents/tp_dev/epfbook/views');
app.set('view engine', 'ejs')

app.use(express.json())

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
      console.log(student)
      student_array.push(student)
    } 
    console.log(student_array)
    
  
    res.render("students", {
      students: student_array})

  })})




app.get('/api/students', (req,res) => {
  fs.readFile('stub_database.csv', 'utf8',(err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data)
  });
} )

app.post('/api/students/create',(req,res) => {
  console.log(req.body)
  const csvLine =   `${req.body.name},${req.body.school}\n`
  fs.appendFile('test_writtingfiles.csv', csvLine, (err) => {
    if (err) throw err;
  });

  res.send('Student created (stub)')
} )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})