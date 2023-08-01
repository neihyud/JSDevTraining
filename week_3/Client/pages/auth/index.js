import Cookies from 'js-cookie'
import styles from '@/styles/auth.module.css'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
import { login as loginAction } from '@/store/actions/user'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Authentication = ({ loginAction, user }) => {
    const [login, setLoginForm] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const router = useRouter()
    const { username, password } = login

    const onChangeLoginForm = (event) => {
        setLoginForm({ ...login, [event.target.name]: event.target.value })
    }

    
    const onSubmitLoginForm = async (event) => {
        event.preventDefault()

        let data = await loginAction({ ...login })

        if (!data.success) {
            setError(data.message)
            setTimeout(() => setError(''), 2000)
            return
        }

        Cookies.set('isLogin', 'true')

        router.push('/dashboard')
    }

    return (
        <div id={`${styles['authentication-page']}`} className="center">
            <form className="form" action="">
                <h3 className="heading">SOIOT SYSTEM</h3>
                {error && (
                    <div className={`${styles['form-message']}`}>{error}</div>
                )}
                <div className={'form-group'}>
                    <input
                        className={`'form-control'`}
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </div>

                <div className={'form-group'}>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </div>

                <div id={`${styles['account-access']}`}>
                    <button
                        className="btn btn-primary"
                        onClick={onSubmitLoginForm}
                    >
                        LOGIN
                    </button>
                    <a href="">or create new account</a>
                </div>
            </form>

            <style jsx>{`
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            `}</style>
        </div>
    )
}

Authentication.propTypes = {
    loginAction: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

// store se di qua cac component va Authentication se nhan duoc no
// state o duoi tuong ung voi state o combineReducers
const mapStateToProps = (state) => ({
    user: state.users.user, // state (rootReducer); user (userReducer  )
})

export default connect(mapStateToProps, { loginAction })(Authentication)
