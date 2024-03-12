const bcrypt = require('bcryptjs')
// const User = require('../models/userModel')
const users= [
    {
        name:'Admin User',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('admin123',10),
        isAdmin:true
    },
    {
        name:'Nouman Ahmad',
        email:'nouman@gmail.com',
        password:bcrypt.hashSync('nouman123',10),
    },
    {
        name:'Sehar Akhtar',
        email:'sehar@gmail.com',
        password:bcrypt.hashSync('sehar123',10),
    }
]

module.exports = users