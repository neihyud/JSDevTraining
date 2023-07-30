import { NextResponse } from 'next/server'
import store from './store/store.js'

export default function middleware(req) {
    let isLogin = req.cookies.get('isLogin')
    let url = req.url

    if (!isLogin && url.includes('/dashboard')) {
        return NextResponse.redirect(`http://localhost:3000/auth`)
    }
}

// export const config = {
//     matcher: '/dashboard/:path*',
// }
