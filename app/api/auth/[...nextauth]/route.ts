import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler =  NextAuth(authOptions);
export {handler as GET, handler as POST};

// This file is the entry point for the NextAuth API route. It imports the authOptions from lib/auth.ts and uses them to create a NextAuth instance. It then exports the instance as both a GET and POST handler. This is necessary because NextAuth uses a POST request to handle authentication requests and a GET request to handle session requests. By exporting the instance as both a GET and POST handler, we ensure that the NextAuth API route can handle both types of requests.