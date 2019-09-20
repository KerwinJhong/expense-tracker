const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

function cheakDuplicates(aArray) {
    [...new Set(aArray)]
    aArray.filter((item, index) => aArray.indexOf(item) === index)
    return aArray.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
}

router.get('/', authenticated, (req, res) => {
    Record.find({ userId: req.user._id })
        .sort({ date: 'desc' })
        .exec((err, records) => {
            if (err) return console.error(err)
                // ============ amount&dateFormat ============
            let amount = 0
            let dateFormat = {}
            records.map(record => {
                    amount += record.amount
                    dateFormat = { "dateFormat": record.date.toJSON().substr(0, 10) }
                    Object.assign(record, dateFormat)
                })
                // ============ list ============
                // let yearBox = []
                // let monthBox = []
                // let dayBox = []
                // let categoryBox = []
                // records.map(record => {
                //     yearBox.push(record.date.substr(0, 4))
                //     monthBox.push(record.date.substr(5, 2))
                //     dayBox.push(record.date.substr(8, 2))
                // })
                // let yearSrt = cheakDuplicates(yearBox)
                // console.log(yearSrt)
            return res.render('index', { records: records, amount: amount, dateFormat: dateFormat })
        })
})

module.exports = router