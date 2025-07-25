const http = require("http");
const { Server } = require("socket.io");
const { database } = require("./Database/database");
const app = require("./app");
const { setupSocket } = require("./socket");
const cloudinary = require("cloudinary").v2;

const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "https://iconiq-frontend.vercel.app",
];

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("Blocked CORS origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true, // critical for cookies/auth headers
  },
});

setupSocket(io); // 💬 Register Socket.IO logic

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect DB and start server
database()
  .then(() => {
    const PORT = process.env.PORT;
    server.listen(PORT, () => {
      console.log(`🚀 Server + Socket.IO running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
