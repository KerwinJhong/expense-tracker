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
        date: req.body.date,
        amount: req.body.amount,
        userId: req.user._id
    })
    record.save(err => {
        if (err) return console.log(err)
        return res.redirect('/')
    })
})

router.get('/:id', authenticated, (req, res) => {
    Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
        if (err) return console.error(err)
        return res.render('detail', { record: record })
    })
})

router.get('/:id/edit', authenticated, (req, res) => {
    Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
        if (err) return console.error(err)
        return res.render('edit', { record: record })
    })
})

router.put('/:id/edit', authenticated, (req, res) => {
    Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
        if (err) return console.error(err)
        record.name = req.body.name
        record.category = req.body.category
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