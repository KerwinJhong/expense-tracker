const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
    return res.redirect('/')
})

router.get('/new', authenticated, (req, res) => {
    return res.render('new')
})

router.post('/', authenticated, (req, res) => {
    const record = Record({
        name: req.body.name,
        category: req.body.category,
        merchant: req.body.merchant || "",
        date: req.body.date,
        amount: req.body.amount,
        userId: req.user._id
    })
    record.save(err => {
        if (err) return console.log(err)
        return res.redirect('/')
    })
})

router.get('/:id/edit', authenticated, (req, res) => {
    Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
        if (err) return console.error(err)
            // ============ dateFormat ============
        let dateFormat = { "dateFormat": record.date.toJSON().substr(0, 10) }
        Object.assign(record, dateFormat)
        return res.render('edit', { record: record, dateFormat: dateFormat })
    })
})

router.put('/:id/edit', authenticated, (req, res) => {
    Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
        if (err) return console.error(err)
        record.name = req.body.name
        record.category = req.body.category
        record.merchant = req.body.merchant || ""
        record.date = req.body.date
        record.amount = req.body.amount
        record.save(err => {
            if (err) return console.error(err)
            return res.redirect('/')
        })
    })
})

router.delete('/:id/delete', authenticated, (req, res) => {
    Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
        if (err) return console.error(err)
        record.remove(err => {
            if (err) return console.error(err)
            return res.redirect('/')
        })
    })
})

module.exports = router