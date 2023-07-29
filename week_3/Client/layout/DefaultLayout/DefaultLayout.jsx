import React from 'react'
import Menu from '../components/Menu'
import Header from '../components/Header'

function DefaultLayout({ children, indexTab }) {
    return (
        <div className="page">
            <Menu tagIndex={indexTab} />
            <div className="wrapper-content">
                <Header />
                <main>{children}</main>
            </div>

            <style jsx>{`
                .page {
                    display: flex;
                }

                .wrapper-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                main {
                    background-color: #f5f5f5;
                    flex: 1;
                    padding: 40px 180px 40px 180px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
            `}</style>
        </div>
    )
}

export default DefaultLayout
