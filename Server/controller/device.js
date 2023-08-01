const axios = require('axios')
const { DOMAIN } = require('../config')
const crypto = require('crypto')

const fs = require('fs')

let { logs } = require('../data/logs')

const { validatorDevice } = require('../validators/device')

const getDevices = async (req, res) => {
    try {
        const devices = fs.readFileSync('./data/device.json', (err) => {
            console.log('error: ', err)
            return res.status(500).json({
                success: true,
                message: 'Get devices fail!',
            })
        })

        // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

        // await delay(5000) // Đợi trong 200ms

        return res
            .status(200)
            .json({ success: true, devices: JSON.parse(devices) })
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Server Error', error })
    }
}

const addDevice = async (req, res) => {
    const { name = '', ip = '', power = 0 } = req.body

    const error = validatorDevice({ name, ip, power })

    if (error) {
        return res.status(400).json({ success: false, message: error })
    }

    const id = crypto.randomBytes(16).toString('hex')

    let device = {
        name,
        ip,
        power,
        id,
        mac: '00:1B:44:11:3A:B7	',
        createDate: '2023-02-25',
    }

    fs.readFile('./data/device.json', function (err, data) {
        var json = JSON.parse(data)

        json.push(device)

        fs.writeFile(
            './data/device.json',
            JSON.stringify(json, null, 2),
            (err) => {
                if (err) {
                    console.log(err.message)
                    return res.status(500).json({
                        success: true,
                        message: 'Add device fail!',
                        device: device,
                    })
                }
                console.log('data written to file')
            }
        )
    })

    return res.status(200).json({
        success: true,
        message: 'Add device success!',
        device: device,
    })
}

const getLogs = async (req, res) => {
    try {
        const { q = '', page: currentPage = 1, size: PageSize = 11 } = req.query

        const firstPageIndex = (currentPage - 1) * parseInt(PageSize)
        const lastPageIndex = firstPageIndex + parseInt(PageSize)

        if (!q) {
            const logsPage = logs.slice(firstPageIndex, lastPageIndex)

            return res.status(200).json({
                success: true,
                message: 'Get Logs Success',
                logs: logsPage,
                totalLogs: logs.length,
            })
        }

        const logTemp = logs.filter((log) =>
            log.name.toLowerCase().includes(q.toLowerCase())
        )

        const logsPage = logTemp.slice(firstPageIndex, lastPageIndex)

        return res.status(200).json({
            success: true,
            message: 'Get Logs Success',
            logs: logsPage,
            totalLogs: logTemp.length,
        })
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Server Error', error })
    }
}

module.exports = { getDevices, addDevice, getLogs }
