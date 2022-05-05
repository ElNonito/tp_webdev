const express = require('express')
const fs = require("fs")
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Helloo World!')
})

app.get('/students', (req,res) => {
  fs.readFile('stub_database.csv', 'utf8',(err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data)
  });
} )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/students/create',(req,res) => {
  console.log(req.body)
  const csvLine =   `${req.body.name},${req.body.school}\n`
  fs.appendFile('test_writtingfiles.csv', csvLine, (err) => {
    if (err) throw err;
  });

  res.send('Student created (stub)')
} )