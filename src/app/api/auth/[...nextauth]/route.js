import NextAuth from "next-auth"
import GoogeProvider from "next-auth/providers/google"

export const  authOption = {
    providers:[
        GoogeProvider({
            clientId:process.env.GOOGLE_ID ?? "",
            clientSecret:process.env.GOOGLE_SECRET ?? ""
        })
    ]
}

export const handler = NextAuth(authOption)

export {handler as GET, handler as POST}