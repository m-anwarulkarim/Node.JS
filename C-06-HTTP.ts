/**
 * Node.js HTTP Module — Beginner-Friendly Version
 * -------------------------------------------------
 *
 * HTTP module দিয়ে আমরা:
 * ✅ server create করতে পারি
 * ✅ incoming request handle করতে পারি
 * ✅ client কে response পাঠাতে পারি
 *
 * এটি Node.js এর core module, কোন extra installation লাগবে না।
 */

const http = require("http");

// ---------------------------------------------------------
// 1️⃣ HTTP Server Create করা
// ---------------------------------------------------------

/**
 * http.createServer(callback)
 * ----------------------------
 * - callback → প্রতিটি incoming request handle করার function
 * - req (request) → client থেকে আসা request (URL, method, headers)
 * - res (response) → server থেকে client কে response পাঠানোর object
 *
 * Tip / ভুল এড়ানোর কথা:
 * - প্রতিটি request এ res.end() না দিলে browser hang হতে পারে
 * - res.write() একাধিক বার ব্যবহার করা যায়
 */

const server = http.createServer((req: any, res: any) => {
  console.log("Request received:", req.url);

  // response header set
  res.writeHead(200, { "Content-Type": "text/plain" });

  // response body
  res.write("Hello World from Node.js HTTP Module!");

  // response finish
  res.end();
});

// ---------------------------------------------------------
// 2️⃣ Server listen করা
// ---------------------------------------------------------

/**
 * server.listen(port, hostname?, callback)
 * - port → কোন port এ server run করবে
 * - hostname → optional, default: localhost
 * - callback → server start হয়ে গেলে call হবে
 *
 * Tip / ভুল এড়ানোর কথা:
 * - যদি একই port আরেকটা app use করছে → error হবে
 */

server.listen(3000, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:3000/");
});

// ---------------------------------------------------------
// 3️⃣ HTTP Methods Handle করা
// ---------------------------------------------------------

/**
 * req.method ব্যবহার করে request type চেক করা যায়
 * সাধারণত GET, POST, PUT, DELETE ইত্যাদি
 *
 * Tip / ভুল এড়ানোর কথা:
 * - POST/PUT request এর body handle করতে body parse করতে হবে
 * - শুধুমাত্র GET দেখলে POST request ignore হবে
 */

server.on("request", (req: any, res: any) => {
  if (req.method === "GET") {
    console.log("GET request received for:", req.url);
  } else if (req.method === "POST") {
    console.log("POST request received for:", req.url);
  }
});

// ---------------------------------------------------------
// 4️⃣ Request URL & Headers
// ---------------------------------------------------------

server.on("request", (req: any, res: any) => {
  console.log("Requested URL:", req.url);
  console.log("Request headers:", req.headers);

  // Tip:
  // headers এ cookies, content-type ইত্যাদি থাকে
});

// ---------------------------------------------------------
// 5️⃣ Response Methods
// ---------------------------------------------------------

/**
 * res.writeHead(statusCode, headers) → header set করে
 * res.write(data) → body write করে
 * res.end() → response finish করে
 *
 * Tip:
 * - res.end() না দিলে client response পাবে না
 * - writeHead() ছাড়া default 200 status code পাঠায়
 */

// ---------------------------------------------------------
// 6️⃣ Server Events
// ---------------------------------------------------------

/**
 * server.on("eventName", callback) → HTTP server এর events handle করা যায়
 * Common events:
 * - request → client থেকে request এলে trigger
 * - connection → নতুন connection এ trigger
 * - close → server বন্ধ হলে trigger
 * - error → error হলে trigger
 *
 * Tip:
 * - error handle না করলে server crash হতে পারে
 */

server.on("connection", (socket: any) => {
  console.log("New connection from:", socket.remoteAddress);
});

server.on("close", () => {
  console.log("Server closed");
});

server.on("error", (err: any) => {
  console.error("Server error:", err);
});

// ---------------------------------------------------------
// 7️⃣ HTTP Module Key Points
// ---------------------------------------------------------

/**
 * 1. Node.js HTTP module core module → server + client create করতে use হয়
 * 2. createServer(callback) → প্রতিটি request handle করে
 * 3. req → incoming request object
 * 4. res → outgoing response object
 * 5. HTTP methods → GET, POST, PUT, DELETE
 * 6. Response methods → writeHead, write, end
 * 7. Server events → request, connection, close, error
 *
 * 💡 Tips / Best Practices:
 * - সব request এ res.end() ব্যবহার করুন
 * - POST/PUT body handle করতে body-parser logic লাগবে
 * - এক port এ একবারে শুধুমাত্র একটি server চলতে পারে
 * - error event handle না করলে server crash হতে পারে
 */
