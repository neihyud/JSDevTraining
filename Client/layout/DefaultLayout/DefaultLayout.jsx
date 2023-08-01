import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import Header from '../components/Header'
import useWindowSize from '@/customHooks/useWindowSize'
import Modal from '@/components/Modal'

function DefaultLayout({ children, indexTab }) {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const { width } = useWindowSize()

    const onClickModal = () => {
        setIsOpenMenu(false)
    }

    return (
        <>
            <div className="page">
                {width < 415 ? (
                    <Menu tagIndex={indexTab} isOpenMenu={isOpenMenu} />
                ) : (
                    <Menu tagIndex={indexTab} isOpenMenu={isOpenMenu} />
                )}

                <div className="wrapper-content">
                    <Header openMenu={setIsOpenMenu} />
                    <main>{children}</main>
                </div>
            </div>

            {width < 415 && isOpenMenu && <Modal onClickModal={onClickModal} />}
            <style jsx>{`
                .page {
                    display: flex;
                    height: 100%;
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
        </>
    )
}

export default DefaultLayout
