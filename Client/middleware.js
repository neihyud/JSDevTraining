import { NextResponse } from 'next/server'

export default function middleware(req) {
    let isLogin = req.cookies.get('isLogin')
    let url = req.url


    if (isLogin && url.includes('/auth')) {
        return NextResponse.redirect(`http://localhost:3000/dashboard`)
    }

    if (!isLogin && url.includes('/dashboard')) {
        return NextResponse.redirect(`http://localhost:3000/auth`)
    }
}
