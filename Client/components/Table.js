import React from 'react'

function Table({ children }) {
    return (
        <table>
            {children}

            <style jsx>{`
                table {
                    border-collapse: collapse;
                    width: 100%;
                    border: none;
                    outline: none;
                    background-color: #fff;
                    border-radius: 10px;
                }
            `}</style>
        </table>
    )
}

export default Table
