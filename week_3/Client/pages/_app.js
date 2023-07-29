import '@/styles/globals.css'
import '@/styles/form.css'
import '@/styles/button.css'

import { Provider } from 'react-redux'
import store from '../store/store.js'


export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}
