import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();                                  {/*have to initialize dotenv before using it*/}

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB!")
}).catch((err) => {
    console.log("Error!MongoDB not connected")
     console.error("Details:", err.message);
});

const app = express();

// Middleware - Apply CORS first
app.use(cors());

app.use(express.json());                          {/*to parse incoming JSON requests*/}

// Add a test route to verify CORS is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

app.listen(3000, () => {                          {/* calling listen function/method */}
    console.log('Server is running on port 3000');
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next)=>{                     {/*error-handling middleware, run for every request*/}
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    
    });
});
