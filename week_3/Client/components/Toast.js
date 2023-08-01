import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faXmark,
    faCircleCheck,
    faCircleInfo,
    faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons'

const Toast = ({
    title = '',
    message = '',
    type = 'success',
    duration = 0,
}) => {
    const [isActive, setIsActive] = useState(true)

    const autoRemoveId = setTimeout(function () {
        setIsActive(false)
    }, duration + 1000)

    const closeToast = (event) => {
        if (event.target.closest('.toast__close')) {
            clearTimeout(autoRemoveId)
            setIsActive(false)
        }
    }

    const icons = {
        success: faCircleCheck,
        info: faCircleInfo,
        warning: faCircleExclamation,
        error: faCircleExclamation,
    }

    const icon = icons[type]
    return (
        isActive && (
            <div className={`toast toast--${type}`} onClick={closeToast}>
                <div className="toast__icon">
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div className="toast__msg">{message}</div>
                <div className="toast__close">
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <style jsx>{`
                    .toast {
                        display: flex;
                        align-items: center;
                        background-color: #fff;
                        border-radius: 4px;
                        min-height: 48px;
                        min-width: 320px;
                        max-width: 320px;
                        box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
                        transition: all linear 0.3s;
                        animation: slideInLeft ease 0.3s,
                            fadeOut linear 1s 2s forwards;
                    }

                    @keyframes slideInLeft {
                        from {
                            opacity: 0;
                            transform: translateX(calc(100% + 32px));
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes fadeOut {
                        to {
                            opacity: 0;
                        }
                    }

                    .toast--success {
                        border-color: #47d864;
                        color: #47d864;
                    }

                    .toast--success .toast__icon {
                        color: #47d864;
                    }

                    .toast--info {
                        border-color: #2f86eb;
                    }

                    .toast--info .toast__icon {
                        color: #2f86eb;
                    }

                    .toast--warning {
                        border-color: #ffc021;
                    }

                    .toast--warning .toast__icon {
                        color: #ffc021;
                    }

                    .toast--error {
                        border-color: #ff623d;
                        color: #ff623d;
                    }

                    .toast--error .toast__icon {
                        color: #ff623d;
                    }

                    .toast + .toast {
                        margin-top: 24px;
                    }

                    .toast__icon {
                        font-size: 24px;
                    }

                    .toast__icon,
                    .toast__close {
                        padding: 0 16px;
                    }

                    .toast__body {
                        flex-grow: 1;
                    }

                    .toast__title {
                        font-size: 16px;
                        font-weight: 600;
                        color: #333;
                    }

                    .toast__msg {
                        color: #000000;
                        flex: 1;
                    }

                    .toast__close {
                        /* position: absolute;
    right: 0; */
                        font-size: 24px;
                        cursor: pointer;
                    }
                `}</style>
            </div>
        )
    )
}

export default Toast
