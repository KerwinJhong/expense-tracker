require('dotenv').config()
const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const record = require('./recods.json')
const userList = require('./users.json')
const bcrypt = require('bcryptjs')

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/record"
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('db error')
})

db.once('open', () => {
    console.log('db connected!')
    let createUsers = (newUser) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) return reject(err)
                    newUser.password = hash
                    newUser.save()
                    return resolve(newUser)
                })
            )
        })
    }

    let createRecords = (user, person) => {
        return new Promise((resolve, reject) => {
            return resolve(Record.create({
                userId: user._id,
                name: record[person].name,
                category: record[person].category,
                merchant: record[person].merchant,
                date: record[person].date,
                amount: record[person].amount
            }))
        })
    }

    async function start() {
        try {
            let person = 0
            for (var i = 0; i < userList.length; i++) {
                const newUser = new User({
                    name: userList[i].name,
                    email: userList[i].email,
                    password: userList[i].password
                })
                let user = await createUsers(newUser)
                for (var j = 0; j < record.length / 2; j++) {
                    await createRecords(user, person)
                    person++
                }

            }
            process.exit()
        } catch (e) {
            console.warn(e)
        }
    }

    start()

})