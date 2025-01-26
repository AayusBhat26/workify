import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";
import {generateFromEmail} from "unique-username-generator";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
        error: "/signin",
    },
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            async profile(profile) {
                const username = generateFromEmail(profile.email, 5);
                return{
                    id: profile.sub, 
                    username,
                    name: profile.given_name ? profile.given_name : profile.name,
                    surname: profile.surname ? profile.surname : "",
                    email: profile.email,
                    image: profile.picture,
                }
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            async profile(profile) {
                const username = generateFromEmail(profile.email, 5);
                const fullname = profile.name.split(" ");
                return{
                    id: profile.id, 
                    username : profile.login ? profile.login :username,
                    name: fullname.at(0), 
                    surname: fullname.at(0),
                    email: profile.email,
                    image: profile.avatar_url,
                }
            },
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID!,
            clientSecret: process.env.APPLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                name: {
                    label: "Name",
                    type: "text",
                    placeholder: "Name",
                },
                username: {
                    label: "username",
                    type: "text",
                    placeholder: "Username",
                },
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user || !user.hashedPassword) {
                    throw new Error("User not found, provide valid credentials");
                }

                const validatePassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!validatePassword) {
                    throw new Error("Are you sure you own this account?");
                }

                return user;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.username = token.usernam;
            }

            const user = await db.user.findUnique({
                where: {
                    id: token.id ,
                },
            });

            if (user) {
                session.user.image = user.image;
                session.user.moveToDashboard = user.moveToDashboard;
            }

            return session;
        },
        async jwt({ token, user }) {
            if (user?.email) {
                const dbuser = await db.user.findFirst({
                    where: {
                        email: user.email,
                    },
                });

                if (dbuser) {
                    return {
                        id: dbuser.id,
                        name: dbuser.name,
                        email: dbuser.email,
                        picture: dbuser.image,
                        usernam: dbuser.username,
                    };
                }
            }

            if (user?.id) {
                token.id = user.id;
            }

            return token;
        },
    },
};

export const getAuthSession = () => getServerSession(authOptions);