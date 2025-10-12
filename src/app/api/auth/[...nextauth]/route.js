import { connectToDatabase } from "@/lib/mongodb";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// 1. Define your options in a constant and export it
export const authOptions = ({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "username" },
                email: { label: "Email", type: "email" },
                password: { label: 'Password', type: "password" }
            },

            async authorize(credentials) {

                if (!credentials.email || !credentials.password) {
                    throw new Error("Please enter the username, email and password");
                }

                const { db } = await connectToDatabase();

                const user = await db.collection('users').findOne({
                    email: credentials.email,
                });

                if (!user) {
                    throw new Error("User not found");
                }

                const passwordMatch = bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!passwordMatch) {
                    throw new Error("Incorrect password");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    username: user.username,
                };
            }
        })
    ],

    pages: {
        signIn: '/login',
    },

    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
    },

        // 2. Add the callbacks object
    callbacks: {
        async jwt({ token, user }) {
            // The 'user' object is only available on the initial sign-in.
            // On subsequent requests, we're just passing the token along.
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            // Pass the data from the token to the client-side session object
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
            }
            return session;
        },
    },

});

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };