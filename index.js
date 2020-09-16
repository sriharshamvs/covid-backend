const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const csv = require('csv-parser')
const port = 9000

const covid = []

const index = (req, res) => {
  res.status(200).send({
    message: 'Server is Running at http://localhost:' + port,
    status: 'up',
    success: true,
  })
  console.log('Hello World!')
}

const covidData = (req, res) => {
  const csvPath = './data/covid.csv'
  console.log('Inside covid route')

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => {
      const d = {
        province: row.province,
        country: row.country,
        latitude: +row.latitude,
        longitude: +row.longitude,
        date: new Date(row.date),
        total_confirmed: +row.total_confirmed,
      }
      covid.push(d)
    })
    .on('end', () => {
      console.log('Done with end section')
    })
  res.status(200).json(covid)
  // res.json(covid)
}

app.use(cors())
app.get('/', index)
app.get('/covid', covidData)

app.listen(port, () => {
  console.log('Server Started on http://localhost:' + port)
})
