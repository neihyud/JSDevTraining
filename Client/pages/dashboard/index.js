import ChartDevice from '@/components/ChartDevice'
import DefaultLayout from '@/layout/DefaultLayout/DefaultLayout'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import store from '@/store/store'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getDevices, addDevice } from '@/store/actions/device'
import useWindowSize from '@/customHooks/useWindowSize'
import Loading from '@/components/Loading'
import Toast from '@/components/Toast'

const Dashboard = ({ devices = [], getDevices, addDevice }) => {
    const { width } = useWindowSize()
    const [toasts, setToasts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [device, setDeviceForm] = useState({
        name: '',
        power: 0,
        ip: '',
    })

    const refName = useRef(null)
    const refIp = useRef(null)
    const refPower = useRef(null)

    const total = useMemo(() => {
        let tt = 0
        devices.forEach((device) => {
            tt += +device.power
        })
        return tt
    }, [devices])

    const { name, power, ip } = device

    const [error, setError] = useState({})
    const refForm = useRef(null)

    const onChangeDeviceForm = (event) => {
        setDeviceForm({ ...device, [event.target.name]: event.target.value })
    }

    const onSubmitDeviceForm = (event) => {
        event.preventDefault()
        if (validateDeviceForm()) {
            addDevice(device)
                .then(() => {
                    setToasts(() => [
                        ...toasts,
                        {
                            message: 'Add device success!',
                            type: 'success',
                        },
                    ])
                })
                .catch(() => {
                    setToasts(() => [
                        ...toasts,
                        {
                            message: 'Add device fail!',
                            type: 'error',
                        },
                    ])
                })
            setDeviceForm({ name: '', power: 0, ip: '' })
        }
    }

    const onBlurDeviceForm = (event) => {
        if (!event.target.value) {
            setError({
                ...error,
                [event.target
                    .name]: `Please provide a valid ${event.target.name}`,
            })
        } else {
            setError({
                ...error,
                [event.target.name]: '',
            })
        }
    }

    const validateDeviceForm = () => {
        const { name = '', ip = '', power = 0 } = device

        let err = {}
        if (!name) {
            err.name = 'Please provide a valid name!'
        }

        if (!ip) {
            err.ip = 'Please provide a valid ip!'
        }

        if (!power) {
            err.power = 'Please provide a valid power!'
        }

        if (err.name) {
            refName.current.focus()
        } else if (err.ip) {
            refIp.current.focus()
        } else if (err.power) {
            refPower.current.focus()
        }

        setError(err)

        if (Object.keys(err).length > 0) {
            return false
        }
        return true
    }

    const handleClickOutSideForm = (event) => {
        if (!refForm.current.contains(event.target)) {
            console.log('ERROR')
            setError({ name: '', power: '', ip: '' })
            setDeviceForm({ name: '', power: 0, ip: '' })
        }
    }

    useEffect(() => {
        setIsLoading(true)
        getDevices()
            .catch(() => {
                setToasts(() => [
                    ...toasts,
                    {
                        message: 'Get device fail!',
                        type: 'error',
                    },
                ])
            })
            .finally(() => setIsLoading(false))

        document.addEventListener('click', handleClickOutSideForm)
        return () => {
            document.removeEventListener('click', handleClickOutSideForm)
        }
    }, [])

    // const devices2 = store.getState().devices.devices
    // const user2 = store.getState().users.user

    return (
        <>
            <DefaultLayout indexTab={1}>
                <div id="wrapper-table-device">
                    <table>
                        <thead>
                            <tr>
                                <th className="th-text-left">Devices</th>
                                <th>MAC Address</th>
                                <th>IP</th>
                                <th>Created Date</th>
                                <th>Devices Consumption (Kw/H)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <td className="th-text-left">Tv</td>
                                <td>00:1B:44:11:3A:B7</td>
                                <td>127.0.0.2</td>
                                <td>2023-02-25</td>
                                <td>50</td>
                            </tr> */}
                            {!isLoading && devices.length == 0 ? (
                                <tr
                                    style={{ height: '100%', fontSize: '30px' }}
                                >
                                    <td
                                        className="center"
                                        style={{ width: '100%' }}
                                    >
                                        <b>Table Empty</b>
                                    </td>
                                </tr>
                            ) : (
                                devices.map((device) => {
                                    return (
                                        <tr key={device.id}>
                                            <td className="th-text-left">
                                                {device.name}
                                            </td>
                                            <td>{device.mac}</td>
                                            <td>{device.ip}</td>
                                            <td>{device.createDate}</td>
                                            <td>{device.power}</td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="th-text-left">
                                    <b>Total</b>
                                </td>
                                <td></td>
                                <td></td>
                                <td>
                                    <b>{total ? total : 0}</b>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    {isLoading && <Loading />}
                </div>

                <div className="manage-device">
                    <ChartDevice />

                    <form id="form-add-device" className="form" ref={refForm}>
                        <div className="form-group" name="name">
                            <input
                                className={`form-control ${
                                    error.name && 'form-error'
                                }`}
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={onChangeDeviceForm}
                                onBlur={onBlurDeviceForm}
                                ref={refName}
                            />
                            {error.name && (
                                <span className="form-message">
                                    {error.name}
                                </span>
                            )}
                        </div>

                        <div className="form-group" name="ip">
                            <input
                                type="text"
                                className={`form-control ${
                                    error.ip && 'form-error'
                                }`}
                                placeholder="IP"
                                value={ip}
                                name="ip"
                                onChange={onChangeDeviceForm}
                                onBlur={onBlurDeviceForm}
                                ref={refIp}
                            />
                            {error.ip && (
                                <span className="form-message">{error.ip}</span>
                            )}
                        </div>

                        <div className="form-group" name="power">
                            <input
                                type="number"
                                className={`form-control ${
                                    error.power && 'form-error'
                                }`}
                                placeholder="Power"
                                value={power < 1 ? '' : power}
                                name="power"
                                onChange={onChangeDeviceForm}
                                onBlur={onBlurDeviceForm}
                                ref={refPower}
                            />
                            {error.power && (
                                <span className="form-message">
                                    {error.power}
                                </span>
                            )}
                        </div>

                        <div>
                            <button
                                className="btn btn-primary"
                                onClick={onSubmitDeviceForm}
                            >
                                ADD DEVICE
                            </button>
                        </div>
                    </form>
                </div>
            </DefaultLayout>
            <div id="toast">
                {toasts.map((toast, index) => (
                    <Toast key={index} {...toast} />
                ))}
            </div>
            <style jsx>{`
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                tbody::-webkit-scrollbar {
                    width: 2px;
                    background-color: #f5f5f5;
                }
                tbody::-webkit-scrollbar-thumb {
                    background-color: #c0c0c0;
                    border-radius: 50px;
                }
                tr th:first-child,
                tr td:first-child {
                    width: 25%;
                }

                tr th:nth-child(2),
                tr td:nth-child(2) {
                    width: 16%;
                }

                tr th:nth-child(3),
                tr td:nth-child(3) {
                    width: 16%;
                }

                tr th:nth-child(4),
                tr td:nth-child(4) {
                    width: 16%;
                }

                tbody {
                    max-height: 244px;
                }

                .th-text-left {
                    text-align: left;
                }

                .th-text-right {
                    text-align: right;
                }

                #wrapper-table-device {
                    box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
                    position: relative;
                }

                .manage-device {
                    margin-top: 50px;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    width: 100%;
                    gap: 40px;
                    max-height: 385px;
                }

                #form-add-device {
                    padding: 40px 24px 30px;
                    text-align: center;
                    width: 46%;
                }

                #form-add-device div:last-child {
                    padding-top: 15px;
                }

                thead tr th:last-child,
                tr td:last-child {
                    padding-right: 16px;
                }

                thead tr {
                    border-bottom: 4px solid #ebe8e8;
                }

                tbody {
                    display: block;
                    overflow: auto;
                    opacity: 0.6;
                    min-height: 48px;
                }

                thead,
                tfoot,
                tbody tr {
                    display: table;
                    width: 100%;
                    table-layout: fixed;
                    border-collapse: none;
                }

                tr {
                    border-bottom: 1px solid #ebe8e8;
                }

                tfoot tr {
                    border: none;
                    border-top: 2px solid #f5f5f5;
                }

                th,
                td {
                    height: 48px;
                    padding: 0 16px;
                    line-height: 48px;
                    text-align: right;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                table {
                    border-collapse: collapse;
                    width: 100%;
                    border: none;
                    outline: none;
                    background-color: #fff;
                    border-radius: 10px;
                }

                .form-control.form-error {
                    border: 1px solid red;
                }

                #toast {
                    position: fixed;
                    top: 32px;
                    right: 32px;
                    z-index: 999999;
                }
            `}</style>
        </>
    )
}

Dashboard.propTypes = {
    devices: PropTypes.array.isRequired,
    getDevices: PropTypes.func.isRequired,
    addDevice: PropTypes.func.isRequired,
}

// store se di qua cac component va Authentication se nhan duoc no
// state o duoi tuong ung voi state o combineReducers
const mapStateToProps = (state) => ({
    devices: state.devices.devices, // state (rootReducer); devices (deviceReduces  )
})

export default connect(mapStateToProps, { getDevices, addDevice })(Dashboard)

// export default Dashboard
