import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLayerGroup,
    faHouse,
    faClockRotateLeft,
    faGear,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function Menu({ tagIndex }) {
    return (
        <div className="menu mobile-menu">
            <div className="menu-top">
                <div className="wrapper-icon center">
                    <FontAwesomeIcon icon={faLayerGroup} />
                </div>
                <div className="menu-top-name">Device Manager</div>
            </div>

            {/* <div className="mobile mobile-menu-top">
        <span>
          <i className="fa-solid fa-circle-user"></i>
        </span>
        <span>Welcome John</span>
      </div> */}

            <Link
                href="/dashboard"
                style={{ textDecoration: 'none', color: 'black' }}
            >
                <div
                    className={`menu-item ${tagIndex == 1 ? 'selected' : ''}`}
                    nav="dashboard"
                >
                    <div className="wrapper-icon center">
                        <FontAwesomeIcon icon={faHouse} />
                    </div>
                    <div className="menu-item__text">Dashboard</div>
                </div>
            </Link>
            <Link
                href={'/dashboard/logs'}
                style={{ textDecoration: 'none', color: 'black' }}
            >
                <div
                    className={`menu-item ${tagIndex == 2 ? 'selected' : ''}`}
                    nav="logs"
                >
                    <div className="wrapper-icon center">
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                    </div>
                    <div className="menu-item__text">Logs</div>
                </div>
            </Link>
            <Link
                href={'/dashboard/settings'}
                style={{ textDecoration: 'none', color: 'black' }}
            >
                <div
                    className={`menu-item ${tagIndex == 3 ? 'selected' : ''}`}
                    nav="setting"
                >
                    <div className="wrapper-icon center">
                        <FontAwesomeIcon icon={faGear} />
                    </div>
                    <div className="menu-item__text">Setting</div>
                </div>
            </Link>

            <style jsx>{`
                .menu {
                    min-height: 100vh;
                    width: 250px;
                    border-right: 2px solid #ccc;
                    background-color: #fff;
                    display: flex;
                    flex-direction: column;
                }

                .menu.link {
                    text-decoration: none !important;
                }

                .menu-top {
                    height: var(--height-header);
                    display: flex;
                    align-items: center;
                }

                .menu-item,
                .menu-top {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                }

                .menu-item .wrapper-icon,
                .menu-top .wrapper-icon {
                    width: 52px;
                    height: 44px;
                    font-size: 20px;
                }

                .menu-item:hover {
                    background-color: #cfe2ff;
                    cursor: pointer;
                    opacity: 0.8;
                }

                .menu-item:active {
                    opacity: 0.6;
                }

                .menu-item.selected {
                    background-color: #c0d9ff;
                    color: #0e67d1;
                }
            `}</style>
        </div>
    )
}

export default Menu
