const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

const SECRET_KEY = "your-super-secret-key";

// Login Route
app.post("/login", (req, res) => {
	const { username } = req.body;
	const user = { name: username || "TestUser" };

	const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
	res.json({ accessToken: token });
});

// Authentication Middleware
function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res
			.status(401)
			.json({ message: "Access denied. No token provided." });
	}

	jwt.verify(token, SECRET_KEY, (err, user) => {
		if (err)
			return res
				.status(403)
				.json({ message: "Invalid or expired token." });
		req.user = user;
		next();
	});
}

// Protected Route
app.get("/protected", authenticateToken, (req, res) => {
	res.json({
		message: "Welcome to the protected area!",
		user: req.user,
	});
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
