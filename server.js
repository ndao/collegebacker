const express = require('express')
const path = require('path')
const uniqid = require('uniqid')
const app = express()
const multer  = require('multer')
const upload = multer()
const convertMaptoArray = require('./src/utils').convertMaptoArray
const contributors = new Map()

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/api/contributors', (req, res) => {
  res.json(convertMaptoArray(contributors))
})

app.put('/api/contributors/add',  upload.single('photo'), (req, res) => {
  try {
    const key = uniqid()
    const contributor = { id: key, ...req.body }
    contributors.set(key, contributor)

    res.json({
      success: true,
      contributor
    })
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    })
    console.log(`Error adding ${req.body}`, error)
  }
})

app.delete('/api/contributors/remove', (req, res) => {
  try {
    var id = req.query.id
    console.log('Removing', id)
    const success = contributors.delete(id)
    res.json({ success })
  } catch (error) {
    console.log(`Error deleting ${id}`, error)
  }
})

app.listen(3000)
console.log('Running on port 3000')