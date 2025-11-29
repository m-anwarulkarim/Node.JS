/**
 * Node.js Event Module — Beginner-Friendly Bangla Notes
 * -----------------------------------------------------
 *
 * Event module Node.js এর core module যা
 * Event Driven Programming এর জন্য ব্যবহার হয়।
 *
 * অর্থাৎ, কোনো কাজ শেষ হলে বা কোনো নির্দিষ্ট ঘটনার পরে (event) কিছু কোড execute করতে দেয়।
 */

import { EventEmitter } from "events";

// ---------------------------------------------------------
// 1️⃣ EventEmitter ক্লাস
// ---------------------------------------------------------

/**
 * Node.js এ সব event handle করতে EventEmitter class ব্যবহার হয়।
 *
 * Key points:
 * - একটি EventEmitter object তৈরি করলে আমরা events trigger এবং listen করতে পারি।
 * - "on" method → Event listen করতে
 * - "emit" method → Event trigger করতে
 *
 * Tips:
 * - কখনো কখনো multiple listener থাকলে order matter করতে পারে
 * - নতুন listener attach করার আগে emit করলে কাজ হবে না
 */

const myEmitter = new EventEmitter();

// ---------------------------------------------------------
// 2️⃣ Event Listener
// ---------------------------------------------------------

/**
 * Example: "greet" নামে একটি event handle করা
 */
myEmitter.on("greet", (name: string) => {
  console.log(`Hello, ${name}!`);
});
// Tip: on → multiple times trigger হলে সব listener কাজ করবে

// ---------------------------------------------------------
// 3️⃣ Event Trigger
// ---------------------------------------------------------

myEmitter.emit("greet", "Anwarul");
// Output: Hello, Anwarul!
// Tip: emit → event trigger করে, প্রথম parameter = event name, পরের parameter = data

// ---------------------------------------------------------
// 4️⃣ Multiple listeners
// ---------------------------------------------------------

myEmitter.on("greet", (name: string) => {
  console.log(`How are you, ${name}?`);
});

myEmitter.emit("greet", "Karim");
// Output:
// Hello, Karim!
// How are you, Karim?
// Tip: এক event এর multiple listener থাকতে পারে, সব listener execute হবে

// ---------------------------------------------------------
// 5️⃣ once() — একবারের listener
// ---------------------------------------------------------

myEmitter.once("login", (user) => {
  console.log(`${user} logged in (once)`);
});

myEmitter.emit("login", "Anwarul");
// Output: Anwarul logged in (once)
myEmitter.emit("login", "Karim");
// Output: (কিছু output হবে না)
// Tip: once → listener একবার execute হওয়ার পর auto remove হয়ে যায়

// ---------------------------------------------------------
// 6️⃣ removeListener / off — listener remove করা
// ---------------------------------------------------------

function byeListener(name: string) {
  console.log(`Goodbye, ${name}`);
}

myEmitter.on("bye", byeListener);
myEmitter.emit("bye", "Anwarul"); // Output: Goodbye, Anwarul

myEmitter.removeListener("bye", byeListener);
myEmitter.emit("bye", "Karim"); // Output: (কিছু হবে না)
// Tip: removeListener / off → memory leak বা unwanted listener থেকে বাঁচায়

// ---------------------------------------------------------
// 7️⃣ EventEmitter অন্যান্য গুরুত্বপূর্ণ method
// ---------------------------------------------------------

console.log("Registered events:", myEmitter.eventNames());
// Output: ['greet', 'login']
// Tip: eventNames() → সব active event এর নাম দেখায়

console.log("Listeners count for greet:", myEmitter.listenerCount("greet"));
// Output: 2
// Tip: listenerCount(eventName) → একটি event এ কত listener আছে সেটা দেখায়

// ---------------------------------------------------------
// 8️⃣ Practical example (server style events)
// ---------------------------------------------------------

const serverEmitter = new EventEmitter();

serverEmitter.on("dataReceive", (data) => {
  console.log("Data received:", data);
});

serverEmitter.on("error", (err) => {
  console.error("Error:", err);
});

serverEmitter.emit("dataReceive", { id: 1, msg: "Hello" });
serverEmitter.emit("error", "Something went wrong");

/**
 * Output:
 * Data received: { id: 1, msg: 'Hello' }
 * Error: Something went wrong
 *
 * Tip:
 * - server-like events এ আমরা dataReceive, error, close ইত্যাদি ব্যবহার করতে পারি
 * - ভুল data type পাঠালে listener crash হতে পারে
 */

// ---------------------------------------------------------
// 9️⃣ Custom Class with EventEmitter
// ---------------------------------------------------------

class MyServer extends EventEmitter {
  serverName: string;

  constructor(name: string) {
    super(); // EventEmitter functionality inherit করা
    this.serverName = name;
  }

  receiveData(data: string) {
    console.log(`[${this.serverName}] Data processing...`);
    this.emit("data", data);
  }

  shutdown() {
    console.log(`[${this.serverName}] Server shutting down...`);
    this.emit("close");
  }
}

const server = new MyServer("API Server");

// Listener attach
server.on("data", (data) => {
  console.log("Received data:", data);
});

server.once("close", () => {
  console.log("Server closed (once listener)");
});

// Trigger events
server.receiveData("Hello World");
// Output:
// [API Server] Data processing...
// Received data: Hello World

server.receiveData("Another Request");
// Output:
// [API Server] Data processing...
// Received data: Another Request

server.shutdown();
// Output:
// [API Server] Server shutting down...
// Server closed (once listener)

server.shutdown();
// Output:
// [API Server] Server shutting down...
// (close listener একবারের জন্য active ছিল, তাই আর output নেই)

// ---------------------------------------------------------
// 🔹 Tips & Common Mistakes (Beginners Friendly)
// ---------------------------------------------------------

/**
 * 1. সব listener attach করার আগে emit করলে কাজ হবে না
 * 2. once → listener একবারের জন্য active, দুইবার emit করলে কাজ করবে না
 * 3. removeListener / off ব্যবহার করে memory leak এড়ানো
 * 4. Event name misspell করলে listener কাজ করবে না
 * 5. EventEmitter class extend করলে OOP + event driven একসাথে ব্যবহার করা যায়
 * 6. Data type mismatch → listener crash করতে পারে, তাই ঠিক data পাঠাতে হবে
 * 7. বেশি listener attach করলে process warning দিবে, setMaxListeners(n) দিয়ে সীমা নির্ধারণ করা যায়
 */
