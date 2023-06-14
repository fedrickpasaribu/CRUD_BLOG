const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth')

mongoose.connect("mongodb+srv://fedrick:12345@cluster0.mokfxop.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Terhubung ke MongoDB'))
    .catch(err => console.error('Koneksi MongoDB gagal', err));

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const port = 3001;

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)