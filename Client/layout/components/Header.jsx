import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faBars } from '@fortawesome/free-solid-svg-icons'
import useWindowSize from '@/customHooks/useWindowSize'
import { useState } from 'react'
import store from '@/store/store'

function Header({ openMenu }) {
    const { width } = useWindowSize()

    return width < 415 ? (
        <div className="mobile mobile-header">
            <FontAwesomeIcon icon={faBars} onClick={() => openMenu(true)} />
            <h3>Device Manager</h3>
        </div>
    ) : (
        <header className="header">
            <div>
                <span>
                    <FontAwesomeIcon icon={faCircleUser} />
                </span>
                <span>Welcome John</span>
            </div>

            <style jsx>{`
                .header {
                    display: flex;
                    justify-content: flex-end;
                    padding: 0 40px;
                    align-items: center;
                    background-color: #fff;
                    height: var(--height-header);
                    border-bottom: 2px solid #ccc;
                }

                .header div {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .header div span:first-child {
                    font-size: 25px;
                }

                .header div span:last-child {
                    font-weight: 600;
                    opacity: 0.8;
                }
            `}</style>
        </header>
    )
}

export default Header
