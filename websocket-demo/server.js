const WebSocket = require("ws");

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server is running on ws://localhost:8080");

// Connection event handler
wss.on("connection", (ws) => {
	console.log("New client connected");

	// Send a welcome message to the new client
	ws.send("Welcome to the WebSocket server!");

	// Message event handler
	ws.on("message", (message) => {
		console.log(`Received: ${message}`);

		// --- PREVENT ECHOES ---
		// Loop through EVERY client, but skip the one who sent the message
		wss.clients.forEach((client) => {
			// Check if the client is NOT the sender (client !== ws)
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(message.toString());
			}
		});
	});

	// Close event handler
	ws.on("close", () => {
		console.log("Client disconnected");

		// --- HANDLE DISCONNECTIONS ---
		// Broadcast to all remaining clients that someone left
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send("* An user has left the chat *");
			}
		});
	});
});
