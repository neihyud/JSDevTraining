const axios = require('axios')
const { DOMAIN } = require('../config')
const crypto = require('crypto')

let devices = require('../data/data.json')
let { logs } = require('../data/logs')

const { validatorDevice } = require('../validators/device')

const getDevices = async (req, res) => {
    try {
        // const data = await axios.get(
        //     'https://64be0fb22320b36433c801e4.mockapi.io/api/v1/device'
        // )

        // console.log('DATA: ', data)
        // console.log('DATATYPE: ', typeof data)

        // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

        // await delay(5000) // Đợi trong 200ms

        return res.status(200).json({ success: true, devices })
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

    devices = [...devices, { name, ip, power, id }]

    return res.status(200).json({
        success: true,
        message: 'Add device success!',
        device: { name, ip, power, id },
    })
}

const getLogs = async (req, res) => {
    try {
        const { q = '' } = req.query

        if (!q) {
            return res.status(200).json({
                success: true,
                message: 'Get Logs Success',
                logs: logs,
                totalLogs: logs.length,
            })
        }

        const logTemp = logs.filter((log) =>
            log.name.toLowerCase().includes(q.toLowerCase())
        )

        return res.status(200).json({
            success: true,
            message: 'Get Logs Success',
            logs: logTemp,
            totalLogs: logTemp.length,
        })
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Server Error', error })
    }
}

module.exports = { getDevices, addDevice, getLogs }
