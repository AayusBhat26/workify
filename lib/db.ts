import { PrismaClient } from "@prisma/client";

declare global{
    var prisma: PrismaClient | undefined;
};

// const globalForPrisma = globalThis as unknown as {prisma?: PrismaClient};

let prisma : PrismaClient;


// globalThis is a global object in the browser, and global in Node.js. 


 if(process.env.NODE_ENV !== "production") {
   prisma = new PrismaClient();
 }
 else{
    if(!global.prisma){
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
 }

 export const db = prisma;


 // now explain what is going on ?
 // globalThis is a global object in the browser, and global in Node.js.
 // we are declaring a global variable prisma and assigning it to PrismaClient
 // we are checking if the environment is not production then we are creating a new instance of PrismaClient
 // else we are checking if the global variable prisma is not defined then we are creating a new instance of PrismaClient
