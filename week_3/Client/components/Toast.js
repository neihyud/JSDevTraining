import React from 'react'

const Toast = ({
    title = '',
    message = '',
    type = 'success',
    duration = 3000,
}) => {
    const closeToast = (event) => {
        if (!event.target.closest('.toast__close')) {
        }
    }
    const icons = {
        success: 'faCircleCheck',
        info: 'faCircleInfo',
        warning: 'faCircleExclamation',
        error: 'faCircleExclamation',
    }

    const icon = icons[type]
    return (
        <div id="toast" className={`toast toast--${type}`} onClick={closeToast}>
            <div class="toast__icon">
                <FontAwesomeIcon icon={`${icon}`} />
            </div>
            <div class="toast__msg">${message}</div>
            <div class="toast__close">
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    )
}

export default Toast
