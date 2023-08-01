import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLayerGroup,
    faHouse,
    faClockRotateLeft,
    faGear,
    faCircleUser,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import useWindowSize from '@/customHooks/useWindowSize'

function Menu({ tagIndex, isOpenMenu }) {
    const { width } = useWindowSize()

    return (
        <div className={`menu ${isOpenMenu ? 'mobile-menu' : ''}`}>
            <div className="menu-top">
                <div className="wrapper-icon center">
                    <FontAwesomeIcon icon={faLayerGroup} />
                </div>
                <div className="menu-top-name">Device Manager</div>
            </div>

            {width < 415 && (
                <div className="mobile mobile-menu-top center">
                    <span>
                        <FontAwesomeIcon icon={faCircleUser} />
                    </span>
                    <span>Welcome John</span>
                </div>
            )}
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

                .mobile-menu-top {
                    flex-direction: column;
                    height: 100px;
                    opacity: 0.4;
                }

                .mobile-menu-top span:first-child {
                    font-size: 30px;
                }

                .mobile-menu-top span:last-child {
                    font-weight: 800;
                    margin-top: 5px;
                }
                

                @media only screen and (max-width: 414px) {
                    .menu {
                        display: block;
                        position: fixed;
                        top: 0;
                        bottom: 0;
                        z-index: 2;
                        width: 70%;
                        left: -100%;
                        transition: left 0.5s ease;
                    }

                    .menu.mobile-menu {
                        left: 0;
                    }
                }
            `}</style>
        </div>
    )
}

export default Menu
