import PaginationTable from '@/components/PaginationTable'
import DefaultLayout from '@/layout/DefaultLayout/DefaultLayout'
import { getLogs } from '@/store/actions/device'
import React, { useEffect, useState, useMemo, use } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PageSize = 11

function Logs({ logs = [], getLogs, totalLogs = 1 }) {
    const [search, setSearch] = useState('')
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        console.log('useEffect run ...')
        getLogs(search)
    }, [counter])

    const [currentPage, setCurrentPage] = useState(1)

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize
        console.log('LastPageIndex: ', lastPageIndex)
        return logs.slice(firstPageIndex, lastPageIndex)
    }, [currentPage, logs])

    const onPageChange = (page) => {
        setCurrentPage(page)
    }

    const onSubmitSearchLogs = () => {
        console.log('ON Search')
        setCounter(() => (counter > 10 ? 0 : counter + 1))
        console.log('counter: ', counter)
    }

    const onChangeSearch = (event) => {
        setSearch(event.target.value)
    }

    return (
        <DefaultLayout indexTab={2}>
            <div id="action-logs">
                <h2>Action Logs</h2>
                <div>
                    <input
                        type="text"
                        className="search"
                        placeholder="Search"
                        onChange={onChangeSearch}
                    />
                    <button
                        className="btn btn-second"
                        onClick={onSubmitSearchLogs}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div id="logs-table">
                <table>
                    <thead>
                        <tr>
                            <th className="th-text-left">Device ID #</th>
                            <th>Name</th>
                            <th>Action</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTableData.length == 0 ? (
                            <tr
                                style={{ height: '100%', fontSize: '30px' }}
                            >
                                <td className='center' style={{ height: '100%'}}>
                                    <b>Table Empty</b>
                                </td>
                            </tr>
                        ) : (
                            currentTableData.map((log) => {
                                return (
                                    <tr key={log.deviceId}>
                                        <td className="th-text-left">
                                            {log.deviceId}
                                        </td>
                                        <td>{log.name}</td>
                                        <td>{log.action}</td>
                                        <td>{log.date}</td>
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
                            <td></td>
                            <td>
                                <b>{logs.length}</b>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <PaginationTable
                currentPage={currentPage}
                totalCount={totalLogs}
                pageSize={PageSize}
                onPageChange={onPageChange}
            />

            <style jsx>{`
                #action-logs {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                }

                #action-logs + div {
                    display: flex;
                }

                #action-logs input.search {
                    margin-right: 24px;
                    padding: 10px 20px;
                    border-radius: 6px;
                    height: 44px;
                    border: none;
                    outline: none;
                    border-radius: 6px;
                    font-size: 16px;
                    width: 360px;
                    box-shadow: inset 0 3px 6px rgb(0 0 0 / 16%);
                }

                #logs-table {
                    margin-bottom: 25px;
                    box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
                }

                #logs-table tbody {
                    display: block;
                    min-height: 48px;
                    height: 536px;
                    overflow: hidden;
                    opacity: 0.6;
                }

                #logs-table tr th:nth-child(2),
                #logs-table tr td:nth-child(2) {
                    width: 350px;
                }

                #logs-table tr th:nth-child(3),
                #logs-table tr td:nth-child(3) {
                    width: 350px;
                }

                .th-text-left {
                    text-align: left;
                }

                .th-text-right {
                    text-align: right;
                }

                thead tr th:last-child,
                tr td:last-child {
                    padding-right: 16px;
                }

                thead tr {
                    border-bottom: 4px solid #ebe8e8;
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
                tbody::-webkit-scrollbar {
                    width: 2px;
                    background-color: #f5f5f5;
                }
                tbody::-webkit-scrollbar-thumb {
                    background-color: #c0c0c0;
                    border-radius: 50px;
                }
            `}</style>
        </DefaultLayout>
    )
}
Logs.propTypes = {
    logs: PropTypes.array.isRequired,
    getLogs: PropTypes.func.isRequired,
    totalLogs: PropTypes.any.isRequired,
}

// store se di qua cac component va Authentication se nhan duoc no
// state o duoi tuong ung voi state o combineReducers
const mapStateToProps = (state) => ({
    logs: state.devices.logs, // state (rootReducer); devices (deviceReduces  )
    totalLogs: state.devices.totalLogs,
})

export default connect(mapStateToProps, { getLogs })(Logs)
