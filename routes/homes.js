const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
    Record.find({ userId: req.user._id })
        .sort({ name: 'asc' })
        .exec((err, records) => {
            if (err) return console.error(err)
            let amount = 0
            records.map(record => {
                amount += record.amount
            })
            return res.render('index', { records: records, amount: amount })
        })
})

module.exports = router