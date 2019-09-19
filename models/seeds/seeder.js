const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const record = require('./recods.json')
const bcrypt = require('bcryptjs')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection
const userList = [{
        name: 'mom',
        email: 'mom@example.com',
        password: '12345678'
    },
    {
        name: 'dad',
        email: 'dad@example.com',
        password: '12345678'
    }
]

db.on('error', () => {
    console.log('db error')
})

db.once('open', () => {
    console.log('db connected!')
    var i = 0
    userList.forEach(user => {
        const newUser = new User({
            name: user.name,
            email: user.email,
            password: user.password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err
                newUser.password = hash

                newUser.save().then(users => {
                    for (var j = 0; j < record.length / 2; j++) {
                        Record.create({
                            userId: users._id,
                            name: record[i].name,
                            category: record[i].category,
                            date: record[i].date,
                            amount: record[i].amount
                        })
                        i++
                    }
                }).catch(err => {
                    console.log(err)
                })
            })
        })
    })
    console.log('done')
})