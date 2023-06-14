const Employee = require('../models/Employee')

const index = (req, res, next) => {
    Employee.find()
        .then(Response => {
            res.json({
                Response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

//show single employee
const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findByID(employeeID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

//added new employee
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })

    if (req.files) {
        let path = ''
        req.files.forEach(function(files, index, arr) {
            path = path + files.path + ','
        })
        path = path.substring(0, path.lastIndexOf(","))
        employee.photo = path
    }
    employee.save()
        .then(response => {
            res.json({
                message: 'Added Succesfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'Error Occured!'
            })
        })
}


//update an employee
const update = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updateData = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, { $set: updateData })
        .then(() => {
            res.json({
                message: 'Update Succes!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

//delete an employee
const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findOneAndRemove(employeeID)
        .then(() => {
            res.json({
                message: 'delete Succes!'
            })
        })
        .catch(error => {
            res.json({
                message: 'Error Occured!'
            })
        })
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}