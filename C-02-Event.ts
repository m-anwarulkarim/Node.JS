/**
 * Node.js Event Module — Full Bangla Notes
 * ---------------------------------------
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
 */

const myEmitter = new EventEmitter();

// ---------------------------------------------------------
// 2️⃣ Event Listener (কোনো event এর জন্য কোড define করা)
// ---------------------------------------------------------

/**
 * Example:
 * আমরা "greet" নামে একটি event handle করব।
 *
 * "on" method ব্যবহার করে event handle করি।
 */
myEmitter.on("greet", (name: string) => {
  console.log(`Hello, ${name}!`);
});

// ---------------------------------------------------------
// 3️⃣ Event Trigger (কোনো event চলানো)
// ---------------------------------------------------------

/**
 * Event trigger করার জন্য "emit" ব্যবহার করি।
 * প্রথম parameter → event এর নাম
 * পরের parameter → listener function এ পাঠাতে চাওয়া data
 */
myEmitter.emit("greet", "Anwarul");

// Output: Hello, Anwarul!

// ---------------------------------------------------------
// 4️⃣ Multiple listeners
// ---------------------------------------------------------

/**
 * একটি event এর জন্য একাধিক listener যুক্ত করা যায়।
 */
myEmitter.on("greet", (name: string) => {
  console.log(`How are you, ${name}?`);
});

myEmitter.emit("greet", "Karim");

// Output:
// Hello, Karim!
// How are you, Karim?

// ---------------------------------------------------------
// 5️⃣ once() — একবারের listener
// ---------------------------------------------------------

/**
 * "once" method ব্যবহার করলে listener শুধুমাত্র একবার execute হয়।
 */
myEmitter.once("login", (user) => {
  console.log(`${user} logged in (once)`);
});

myEmitter.emit("login", "Anwarul");
myEmitter.emit("login", "Karim");

// Output:
// Anwarul logged in (once)
// (দ্বিতীয়বার emit করার সময় কাজ হবে না)

// ---------------------------------------------------------
// 6️⃣ removeListener / off — listener remove করা
// ---------------------------------------------------------

/**
 * removeListener বা off method ব্যবহার করে listener remove করা যায়।
 */
function byeListener(name: string) {
  console.log(`Goodbye, ${name}`);
}

myEmitter.on("bye", byeListener);
myEmitter.emit("bye", "Anwarul"); // Output: Goodbye, Anwarul

myEmitter.removeListener("bye", byeListener);
myEmitter.emit("bye", "Karim"); // আর কিছু output হবে না

// ---------------------------------------------------------
// 7️⃣ EventEmitter এর অন্যান্য গুরুত্বপূর্ণ method
// ---------------------------------------------------------

/**
 * 1) listenerCount(eventName) → একটি event এ কত listener আছে
 * 2) eventNames() → সব registered event এর নামের array
 * 3) setMaxListeners(n) → maximum listeners সংখ্যা set করা
 * 4) getMaxListeners() → current max listener সংখ্যা
 */

console.log("Registered events:", myEmitter.eventNames());
console.log("Listeners count for greet:", myEmitter.listenerCount("greet"));

// ---------------------------------------------------------
// 8️⃣ Practical example
// ---------------------------------------------------------

/**
 * ধরুন আমরা server এর জন্য events ব্যবহার করতে চাই:
 * - dataReceive → যখন ডেটা আসে
 * - error → কোন সমস্যা হলে
 * - close → server close হলে
 */

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
 */
// ************************************************
// * Node.js EventEmitter Class Example
// ************************************************
/**

 * ----------------------------------
 * EventEmitter class ব্যবহার করে আমরা custom events তৈরি এবং handle করতে পারি।
 */

// ---------------------------------------------------------
// 1️⃣ Custom Class তৈরি করে EventEmitter extend করা
// ---------------------------------------------------------

/**
 * আমরা একটি custom class বানাচ্ছি যা EventEmitter extend করে
 * এর মাধ্যমে আমরা আমাদের object থেকে events trigger করতে পারব
 */
class MyServer extends EventEmitter {
  serverName: string;

  constructor(name: string) {
    super(); // EventEmitter এর সব functionality inherit করার জন্য
    this.serverName = name;
  }

  /**
   * Data receive হলে event trigger করার function
   */
  receiveData(data: string) {
    console.log(`[${this.serverName}] Data processing...`);
    // "data" নামে event trigger
    this.emit("data", data);
  }

  /**
   * Server বন্ধ করার সময় event trigger
   */
  shutdown() {
    console.log(`[${this.serverName}] Server shutting down...`);
    this.emit("close");
  }
}

// ---------------------------------------------------------
// 2️⃣ Object create করা
// ---------------------------------------------------------

const server = new MyServer("API Server");

// ---------------------------------------------------------
// 3️⃣ Listener attach করা
// ---------------------------------------------------------

server.on("data", (data) => {
  console.log("Received data:", data);
});

server.once("close", () => {
  console.log("Server closed (once listener)");
});

// ---------------------------------------------------------
// 4️⃣ Event trigger করা
// ---------------------------------------------------------

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
// 5️⃣ Advantages of class-based EventEmitter
// ---------------------------------------------------------

/**
 * - আমরা EventEmitter কে class হিসেবে encapsulate করতে পারি
 * - Custom properties যোগ করা যায় (যেমন serverName)
 * - Object oriented design + event driven architecture একসাথে পাওয়া যায়
 */
