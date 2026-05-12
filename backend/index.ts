import express from "express";
import cors from "cors";

// Routers
import authRouter from "./src/auth/auth";

const app = express();
app.use(express.json())
app.use(cors());    
const port = 8080;

// Mount Router
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});