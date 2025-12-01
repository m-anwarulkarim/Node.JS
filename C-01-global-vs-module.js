/**
 * Node.js Global vs Module Objects —
 * -----------------------------------------------------
 * প্রতিটি অংশ step-by-step ব্যাখ্যা + short output
 * এবং global vs module এর পার্থক্য
 */

///////////////////////////////
// 1️⃣ GLOBAL OBJECTS (Import ছাড়া ব্যবহার)
///////////////////////////////

console.log("---- GLOBAL OBJECTS ----");

/**
 * Global objects হলো Node.js এর built-in objects/functions
 * যা সব ফাইলে import ছাড়াই পাওয়া যায়।
 * উদাহরণ: console, process, Buffer, setTimeout ইত্যাদি
 */

// 1) console → লগ দেখানোর জন্য
console.log("Hello from global!");
// Output: Hello from global!
// Tip: console.log ব্যবহার করে debugging সহজ হয়

// 2) Timers
setTimeout(() => console.log("1s later"), 1000);
// Output: 1s later (1 second পরে)
// Tip: setTimeout / setInterval ব্যবহার করে asynchronous কাজ করা যায়

setInterval(() => console.log("Every 1s"), 1000);
// Output: Every 1s (প্রতি 1 second)
// Tip: stop করতে clearInterval(timer) ব্যবহার করতে হবে

setImmediate(() => console.log("Immediately after current cycle"));
// Output: Immediately after current event loop cycle

// 3) process → Node.js runtime info
console.log("Current directory:", process.cwd());
// Output: বর্তমান working directory path

console.log("CLI arguments:", process.argv);
// Output: Node CLI arguments array
// Tip: process.argv[0] → node executable, process.argv[1] → script path

// 4) Buffer → binary data handle
const buf = Buffer.from("Hello");
console.log("Buffer:", buf);
// Output: <Buffer 48 65 6c 6c 6f>
// Tip: Buffer ব্যবহার করে file, network, binary data manage করা যায়

///////////////////////////////
// 2️⃣ NON-GLOBAL MODULES (Import করতে হয়)
///////////////////////////////

/**
 * নিচের module গুলো global নয়, import / require করতে হয়:
 * fs, path, http, os, events, crypto
 */
import fs from "fs";
import path from "path";

console.log("---- Non-global modules need import ----");
// Tip: import ছাড়া এদের access করা যাবে না, error দিবে

///////////////////////////////
// 3️⃣ MODULE SCOPE (CommonJS)
///////////////////////////////

console.log("---- MODULE-SCOPE VARIABLES ----");

/**
 MODULE কি?
 Module হলো Node.js এ প্রতিটি ফাইলের নিজস্ব scope বা unit
 Node.js প্রতিটি .js ফাইলকে একটি module হিসেবে চালায়
 একটি module অন্য module এর সাথে code share করতে পারে(exports/require)
 
 CommonJS wrapper function এর কারণে কিছু variable module scope এ পাওয়া যায়:
 (function (exports, require, module, __filename, __dirname){ ... })
 */

// 1) __dirname → current file folder path
console.log("__dirname:", __dirname);
// Output: current folder path
// Tip: directory relative path resolve করতে সাহায্য করে

// 2) __filename → current file full path
console.log("__filename:", __filename);
// Output: current file path
// Tip: file relative operations এ useful

// 3) module → current module info
console.log("module.id:", module.id);
// Output: module id

console.log("module.exports:", module.exports);
// Output: {} (initially empty)

console.log("exports object:", exports);
// Output: {} (shortcut of module.exports)

console.log("require function type:", typeof require);
// Output: function
// Tip: CommonJS import করতে require ব্যবহার হয়

///////////////////////////////
// 4️⃣ ESM MODULE (type: "module")
///////////////////////////////

/**
 * ESM (ECMAScript Module) এ CommonJS wrapper থাকে না
 * তাই সরাসরি পাওয়া যায় না:
 * __dirname, __filename, require, module, exports
 *
 * ESM এ __dirname / __filename পেতে হলে:
 */
import { fileURLToPath } from "url";

const esmFile = fileURLToPath(import.meta.url);
const esmDir = path.dirname(esmFile);

console.log("ESM __filename:", esmFile);
// Output: current file path

console.log("ESM __dirname:", esmDir);
// Output: current folder path
// Tip: import.meta.url ব্যবহার করে file path বের করা হয়

///////////////////////////////
// 5️⃣ GLOBAL vs MODULE SUMMARY
///////////////////////////////

/**
 * 🌟 GLOBAL → সব ফাইলে import ছাড়াই ব্যবহার করা যায়
 * ✔ console
 * ✔ setTimeout / setInterval / setImmediate
 * ✔ process
 * ✔ Buffer
 * ✔ queueMicrotask
 * ✔ fetch / AbortController (v18+)
 *
 * Tips:
 * - সব global objects সব ফাইলে instant access হয়
 * - Timing / async কাজের জন্য setTimeout/setImmediate ব্যবহার করা যায়
 *
 * 🌟 MODULE → শুধুমাত্র module wrapper / import এর কারণে পাওয়া যায়
 * ✔ __dirname
 * ✔ __filename
 * ✔ module
 * ✔ exports
 * ✔ require
 *
 * Tips:
 * - CommonJS এ require / module / exports ব্যবহার হয়
 * - ESM এ import / export ব্যবহার করতে হবে
 *
 * ✅ সংক্ষেপে:
 * Global = Node.js runtime built-in
 * Module = প্রতিটি ফাইলের module scope, wrapper function থেকে আসে
 */
