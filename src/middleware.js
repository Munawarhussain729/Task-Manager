import { NextResponse } from 'next/server'

function middleware(req) {
    let verify = req.cookies.get("userProfile")
    let url = req.url
    if(!verify && url.includes('/dashboard')){
        return NextResponse.redirect('http://localhost:3000/')
    }
  
}

export default middleware
