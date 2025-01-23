import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";
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
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
            }

            const user = await db.user.findUnique({
                where: {
                    id: token.id as string,
                },
            });

            if (user) {
                session.user.image = user.image;
                session.user.name = user.name?.toLowerCase();
                session.user.email = user.email;
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