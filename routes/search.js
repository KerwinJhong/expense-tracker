const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/search', (req, res) => {
    const sortKey = req.query.sortKey
    const sortValue = req.query.sortValue || 'desc'
    const sortObj = {}
    sortObj[sortKey] = sortValue
    Record.find({ userId: req.user._id })
        .sort(sortObj)
        .exec((err, records) => {

            if (err) return console.error(err)
            const record = records.filter(record => {
                const regex = new RegExp(sortKey, 'gi')
                return record.category.match(regex)
            })
            let amount = 0
            record.map(record => {
                amount += record.amount
            })
            res.render('index', { records: record, sortKey: sortKey, amount: amount })
        })
})

module.exports = router