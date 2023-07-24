// import data from '/data/data.json' assert { type: 'json' }
import { data } from '/data/data.js'
import { NUM_ROW_PER_PAGE_TABLE_LOGS, DOMAIN } from '/js/constant.js'
import { showSuccessToast } from '/js/components/toast.js'
import { drawChar } from '/js/components/charDevice.js'
import { randomColor } from '/js/utils/generalColor.js'
import { getCurrentDateFormatted } from '/js/utils/getCurrentDateFormatted.js'

import {
    pagination,
    handleButton,
    valuePage,
} from '/js/components/pagination.js'

let devices = []
let infoCharDevice = {}
let searchDevices = []
let isSearch = false

$(document).ready(() => {
    navigation()
    getDevices()
    validateFormDevice()
    getLogs(data.logs, 1)
    // pagination()
    handlePagination()
    searchLogs()
})

let navigation = () => {
    // Navigation - group collection
    $('.menu .menu-item').click(function () {
        let prevNav = $('.menu-item.selected').attr('nav')
        let curNav = $(this).attr('nav')

        $('#' + prevNav).hide()
        $('#' + curNav).show()

        $('.menu-item.selected').removeClass('selected')
        $(this).addClass('selected')
    })
}

let validateFormDevice = () => {
    $('#form-add-device button').click((event) => {
        event.preventDefault()

        let isValid = true

        let inputs = $('#form-add-device input')

        // check empty input
        $.each(inputs, function (index, element) {
            let isEmpty = $(this).val().trim() == ''

            if (isEmpty) {
                isValid = false
                let inputName = $(this).parent().attr('name')
                $(this).next().text(`Please provide a valid ${inputName}!`)
                $(this).addClass('form-error')
            }
        })

        if (isValid) {
            let name = $(`#form-add-device div[name='name'] input`).val()
            let mac = '00:1B:44:11:3A:B7'
            let ip = $(`#form-add-device div[name='ip'] input`).val()
            let power = $(`#form-add-device div[name='power'] input`).val()
            let created = getCurrentDateFormatted()

            addDevice({ name, mac, ip, created, power })

            // clear all input
            $('#form-add-device input').val('')
        }
    })

    $('#form-add-device input').blur(function () {
        let value = this.value.trim()
        if (!value) {
            let inputName = $(this).parent().attr('name')
            $(this).addClass('form-error')
            $(this).next().text(`Please provide a valid ${inputName}!`)
        } else {
            $(this).removeClass('form-error')
            $(this).next().text('')
        }
    })

    // Check click outside #form-add-device
    // check #form-add-device and inside it
    let formAddDevice = $('#form-add-device')
    $(document).click(function (event) {
        if (
            !formAddDevice.is(event.target) &&
            !formAddDevice.has(event.target).length
        ) {
            $('#form-add-device input').val('')
            $('#form-add-device input').removeClass('form-error')
            $('#form-add-device input').next().text('')
        }
    })
}

let getDevices = async () => {
    displayLoading('#wrapper-table-device .loading')
    devices = await $.get(`${DOMAIN}/device`)
    hideLoading('#wrapper-table-device .loading')

    if (devices.length == 0) {
        $('#wrapper-table-device tbody').append(
            `<td class='center' style="font-weight: 700">Table Empty</td>`
        )
        return
    }

    let total = 0
    devices.forEach((device) => {
        let name = device.name
        let mac = '00:1B:44:11:3A:B7'
        let ip = '127.0.0.2'
        let create = getCurrentDateFormatted()
        let power = device.power

        total += parseInt(power)

        // Render device
        let tr = $('<tr></tr>').append(`<td class="th-text-left">${name}</td>`)
        tr.append(`<td>${mac}</td>`)
        tr.append(`<td>${ip}</td>`)
        tr.append(`<td>${create}</td>`)
        tr.append(`<td>${power}</td>`)

        $('#wrapper-table-device tbody').append(tr)
        $('#wrapper-table-device tfoot tr td:last-child b').html(total)

        // update char device
        if (
            infoCharDevice[name] &&
            Object.keys(infoCharDevice[name]).length != 0
        ) {
            let dv = infoCharDevice[device.name]
            dv.value += parseInt(power)
        } else {
            infoCharDevice[name] = {
                value: parseInt(power),
                color: randomColor(),
            }
        }
    })

    drawChar(infoCharDevice)
}

let addDevice = ({ name, mac, ip, created, power }) => {
    $.post(
        `${DOMAIN}/device`,
        { name, mac, ip, created, power },
        function (data, status) {
            if (status == 'success') {
                let tr = $('<tr></tr>').append(
                    `<td class="th-text-left">${name}</td>`
                )
                tr.append(`<td>${mac}</td>`)
                tr.append(`<td>${ip}</td>`)
                tr.append(`<td>${created}</td>`)
                tr.append(`<td>${power}</td>`)

                $('#wrapper-table-device tbody').append(tr)

                if (
                    infoCharDevice[name] &&
                    Object.keys(infoCharDevice[name]).length != 0
                ) {
                    let dv = infoCharDevice[name]
                    dv.value += parseInt(power)
                } else {
                    infoCharDevice[name] = {
                        value: parseInt(power),
                        color: randomColor(),
                    }
                }

                // show toast
                showSuccessToast('Add Device Success!')
                updateAfterAddDevice({
                    name,
                    mac,
                    ip,
                    create: created,
                    consumption: power,
                })
            }
        }
    )
}

// Logs
let getLogs = (data, curPage) => {
    let startIndexLogs = 11 * (curPage - 1)
    let endIndexLogs = 11 * curPage
    let logs = data.slice(startIndexLogs, endIndexLogs)

    valuePage.totalPages = Math.ceil(data.length / NUM_ROW_PER_PAGE_TABLE_LOGS)

    $('#logs-table tbody').empty()

    if (data.length == 0) {
        $('#logs-table tbody').append(
            `<td class="center" style="height: 100%; font-size: 30px"><b>Table Empty</></td>`
        )
    }

    logs.forEach((log) => {
        let deviceId = log.deviceId
        let name = log.name
        let action = log.action
        let date = log.date

        let tr = $('<tr></tr>').append(
            `<td class="th-text-left">${deviceId}</td>`
        )
        tr.append(`<td>${name}</td>`)
        tr.append(`<td>${action}</td>`)
        tr.append(`<td>${date}</td>`)

        $('#logs-table tbody').append(tr)
    })

    pagination()

    $('#logs-table tfoot tr td:last-child b').html(data.length)
}

let handlePagination = () => {
    $('#pagination-table-logs').click(function (event) {
        handleButton(event.target)

        let curPage = valuePage.curPage

        if (isSearch) {
            getLogs(searchDevices, curPage)
        } else {
            getLogs(data.logs, curPage)
        }
    })
}

let updateAfterAddDevice = (device) => {
    devices = [...devices, { ...device }]

    let total = parseInt(
        $('#wrapper-table-device tfoot tr td:last-child b').html()
    )
    total += parseInt(device.consumption)

    $('#wrapper-table-device tfoot tr td:last-child b').html(total)
    drawChar(infoCharDevice)
}

let searchLogs = () => {
    $('#action-logs button').click(function () {
        valuePage.curPage = 1
        isSearch = true
        let nameDeviceSearch = $('#action-logs input').val()

        if (!nameDeviceSearch.trim()) {
            isSearch = false
            getLogs(data.logs, 1)
            return
        }
        searchDevices = data.logs.filter((log) =>
            log.name.toLowerCase().includes(nameDeviceSearch.toLowerCase())
        )

        valuePage.totalPages = Math.ceil(
            searchDevices.length / NUM_ROW_PER_PAGE_TABLE_LOGS
        )

        getLogs(searchDevices, 1)
    })
}

// spin
let displayLoading = (element) => {
    $(element).show()
}

let hideLoading = (element) => {
    $(element).hide()
}

// =================== Mobile ===================

$('.mobile.mobile-header .bar').click(function () {
    $('.menu').show()
    $('.modal').show()
})

$('.modal').click(function () {
    $('.menu').hide()
    $('.modal').hide()
})
