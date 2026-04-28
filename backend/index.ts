import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 8080;

app.get('/', (req,res) => {
    console.log("Reached backend!");
    res.status(200).json({message: "Hello!", successtype:"true"});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});