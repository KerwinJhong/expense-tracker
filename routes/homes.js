const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
            let { year, month, day, categoryKey } = req.query
                // =========  category search  =========
            let categoryArr = []
            if (categoryKey === "家居物業") categoryArr.push("home")
            if (categoryKey === "交通出行") categoryArr.push("shuttle-van")
            if (categoryKey === "休閒娛樂") categoryArr.push("grin-beam")
            if (categoryKey === "餐飲食品") categoryArr.push("utensils")
            if (categoryKey === "其他") categoryArr.push("pen")
            let categoryValue
            if (categoryArr.length === 0) {
                categoryValue = { $nin: [] }
            } else {
                categoryValue = { $in: categoryArr }
            }
            // =========  search  =========
            if (year === "全部") year = ""
            if (month === "全部") month = ""
            if (day === "全部") day = ""
            let nowYear = new Date().getFullYear().toString()
            let gteDay = day ? (`${Number(day) - 1}`) : "01"
            let lteDay = day ? (`${Number(day) + 1}`) : "31"
            let gteDate = `${year || "1970"}-${month || "01"}-${gteDay}`
            if (gteDay === "0") {
                gteDate = `${year}-${`${Number(month) - 1}`}-31`
    }
    if (gteDay === "0" && (Number(month) - 1)===0) {
      gteDate = `${`${Number(year) - 1}`}-12-31`
    }
    let lteDate = `${year || nowYear}-${month || "12"}-${lteDay}`
    let dateLine = { $gte: gteDate, $lte: lteDate }
    Record.find({ userId: req.user._id, date: dateLine, category: categoryValue }).sort({ date: 'desc' }).exec((err, records) => {
    if (err) return console.error(err)
    // ============ amount&dateFormat ============
    let amount = 0
    let dateFormat = {}
    let selecterList = []
    records.map(record => {
        // ============ amount ============
        amount += record.amount
        // ============ dateFormat ============
        let dateToString = record.date.toJSON().substr(0, 10)
        dateFormat = { "dateFormat": dateToString }
        Object.assign(record, dateFormat)
        // ============ dateBox ============
        if (selecterList.indexOf(dateToString)) { selecterList.push(dateToString) }
        })
        return res.render('index', { records: records, amount, dateFormat, selecterList, year, month, day, categoryKey })
        })
})
module.exports = router