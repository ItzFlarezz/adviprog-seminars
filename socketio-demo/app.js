const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Simple route
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Socket.IO connection handler
// In app.js, modify the connection handler
io.on("connection", (socket) => {
	console.log("A user connected");

	// Store username with socket
	socket.username = "Anon";
	// Handle new messages with username
	socket.on("chat message", (msg) => {
		io.emit("chat message", {
			// This is instead of the loop sending the message to everyone.
			username: socket.username,
			message: msg,
			timestamp: new Date().toISOString(),
		});
	});
	// Handle username change
	socket.on("set username", (username) => {
		const oldUsername = socket.username;
		socket.username = username || "Anon";
		io.emit("user joined", {
			oldUsername: oldUsername,
			newUsername: socket.username,
		});
	});

	// Handle disconnection
	socket.on("disconnect", () => {
		console.log("A user disconnected");
		io.emit("user left", { username: socket.username });
	});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
