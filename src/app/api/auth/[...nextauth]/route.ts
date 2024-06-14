import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "../actions/auth-actions";



export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter, // adaptador de prisma con next-auth, el Adapter es solo un tipado
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'email', placeholder: "user@mail.com"},
                password: {label: 'Password', type: 'password', placeholder: "*********"}
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = await signInEmailPassword(credentials!.email, credentials!.password)
          
                if (user) {
                  // Any object returned will be saved in `user` property of the JWT
                  return user
                }

                return null
              }
        
        })
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // console.log({ user });
            return true
        },

        async jwt({token, user, account, profile, }){
            const dbUser = await prisma.user.findUnique({where: {email: token.email ?? 'no-email'}})
            token.roles = dbUser?.roles ?? ['no-role']
            token.id = dbUser?.id ?? 'no-id'
            return token
        },

        async session({session, token, user}){
            if (session && session.user) {
                session.user.roles = token.roles
                session.user.id = token.id
            
            }
            return session
        }
    }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST } // export both GET and POST handlers

