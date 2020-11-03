const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()
const port = 9000

const index = (req, res) => {
  res.status(200).send({
    message: 'Server is Running at http://127.0.0.1:' + port,
    status: 'up',
    success: true,
  })
}

const covidData = (req, res) => {
  const coviData = csvToJson()
  if (coviData.length > 0) {
    res.status(200).json(coviData)
  } else {
    res.status(500).send({
      message: 'Internal Server Error',
    })
  }
}

const csvToJson = () => {
  var filePath = path.join(__dirname, './data/covid.csv')

  var rawData = fs.readFileSync(filePath, { encoding: 'utf-8' }, function (
    err
  ) {
    console.log(err)
  })
  const jsonData = rawData.split('\n')
  
  return jsonData
}

app.use(cors())
app.get('/', index)
app.get('/covid', covidData)

app.listen(port, () => {
  console.log('Server Started on http://127.0.0.1:' + port)
})
