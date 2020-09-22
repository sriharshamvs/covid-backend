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
    res.status(200).send({
      message: 'COVID-19 Dataset',
      data: coviData,
    })
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
  rawData = rawData.split('\n')
  rawData.shift()

  const jsonData = rawData.map((row) => {
    values = row.split(',')
    const d = {
      province: values[0],
      country: values[1],
      latitude: +values[2],
      longitude: +values[3],
      date: values[4],
      total_confirmed: +values[5],
    }
    return d
  })

  return jsonData
}

app.use(cors())
app.get('/', index)
app.get('/covid', covidData)

app.listen(port, () => {
  console.log('Server Started on http://127.0.0.1:' + port)
})
