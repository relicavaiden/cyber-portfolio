import app from "./app.js";
import prisma from "./lib/prisma.js";

const PORT = 4000

const startServer = async () => {
        try {
        const postCount = await prisma.post.count();
        console.log(`Database connected. Post count: ${postCount}`);
        app.listen(PORT, () => {
            console.log(`Port is listening on ${PORT}`)
        })
    } catch (error) {
        console.log("Did not startup", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

startServer()
