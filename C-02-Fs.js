/**
 * Node.js FS Module Full Cheatsheet
 * ---------------------------------
 * এখানে fs module-এর সব গুরুত্বপূর্ণ API সুন্দর করে সাজানো আছে:
 * 1) Callback-based API
 * 2) Promise-based API (fs.promises)
 * 3) Synchronous API
 */

const fs = require("fs");

// ---------------------------------------------------------
//  1) CALLBACK BASED FS API (Detailed Explanation)
// ---------------------------------------------------------

/**
 * 1️⃣ ফাইল পড়া (asynchronous)
 * fs.readFile(filename, encoding, callback)
 *
 * - filename → কোন ফাইল পড়তে চাচ্ছি? এখানে "example.txt"
 * - encoding → কিভাবে content পড়া হবে? "utf-8" এর মানে text হিসেবে পড়া
 * - callback(err, data) → পড়ার পর Node.js যা করবে, তা লিখি এখানে
 *     - err → যদি কোনো error হয় (ফাইল না থাকে ইত্যাদি)
 *     - data → ফাইলের content
 */
fs.readFile("example.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("ফাইল পড়া যায়নি:", err);
    return;
  }
  console.log("ফাইলের ভিতরের content:", data);
});

/**
 * 2️⃣ ফাইল লেখা (overwrite)
 * fs.writeFile(filename, content, callback)
 *
 * - filename → কোন ফাইল লিখতে চাচ্ছি? "example.txt"
 * - content → ফাইলে কি লেখা হবে? "Hello World"
 * - callback(err) → লেখা শেষ হলে এখানে control আসে
 *     - err → যদি error হয়
 */
fs.writeFile("example.txt", "Hello World", (err) => {
  if (err) console.error("ফাইল লেখা যায়নি:", err);
  else console.log("ফাইল তৈরি/overwrite হয়েছে।");
});

/**
 * 3️⃣ ফাইল append করা
 * fs.appendFile(filename, content, callback)
 *
 * - filename → কোন ফাইলে যোগ করা হবে? "example.txt"
 * - content → কি যোগ করা হবে? " New Line"
 * - callback(err) → শেষ হওয়ার পর control আসে
 */
fs.appendFile("example.txt", " New Line", (err) => {
  if (err) console.error("ফাইল append করা যায়নি:", err);
  else console.log("ফাইলের শেষে নতুন লাইন যোগ হয়েছে।");
});

/**
 * 4️⃣ ফাইল delete করা
 * fs.unlink(filename, callback)
 *
 * - filename → কোন ফাইল মুছতে চাচ্ছি? "example.txt"
 * - callback(err) → মুছে গেলে control আসে
 */
fs.unlink("example.txt", (err) => {
  if (err) console.error("ফাইল delete করা যায়নি:", err);
  else console.log("ফাইল সফলভাবে মুছে দেওয়া হয়েছে।");
});

/**
 * 5️⃣ ফাইল আছে কিনা এবং info চেক করা
 * fs.stat(filename, callback)
 *
 * - filename → কোন ফাইলের info চাই? "example.txt"
 * - callback(err, stats)
 *     - stats → ফাইলের size, isFile(), isDirectory() ইত্যাদি
 */
fs.stat("example.txt", (err, stats) => {
  if (err) console.error("ফাইলের stats পাওয়া যায়নি:", err);
  else {
    console.log("ফাইল size:", stats.size);
    console.log("Is file?", stats.isFile());
    console.log("Is directory?", stats.isDirectory());
  }
});

/**
 * 6️⃣ folder create করা
 * fs.mkdir(path, callback)
 *
 * - path → কোন ফোল্ডার তৈরি হবে? "myFolder"
 * - callback(err) → folder তৈরি হয়ে গেলে control আসে
 */
fs.mkdir("myFolder", (err) => {
  if (err) console.error("ফোল্ডার তৈরি হয়নি:", err);
  else console.log("ফোল্ডার তৈরি হয়েছে।");
});

/**
 * 7️⃣ folder recursive create
 * fs.mkdir(path, { recursive: true }, callback)
 *
 * - path → "a/b/c" এমন nested folder তৈরি করা হবে
 * - recursive: true → parent folder না থাকলেও তৈরি হবে
 */
fs.mkdir("a/b/c", { recursive: true }, (err) => {
  if (err) console.error("Recursive folder তৈরি হয়নি:", err);
  else console.log("Recursive folders তৈরি হয়েছে।");
});

/**
 * 8️⃣ folder remove (empty folder)
 * fs.rmdir(path, callback)
 *
 * - path → কোন folder মুছতে চাচ্ছি? "myFolder"
 * - callback(err) → মুছে গেলে control আসে
 */
fs.rmdir("myFolder", (err) => {
  if (err) console.error("ফোল্ডার মুছে দেওয়া যায়নি:", err);
  else console.log("ফোল্ডার মুছে দেওয়া হয়েছে।");
});

/**
 * 9️⃣ folder recursive remove
 * fs.rm(path, { recursive: true, force: true }, callback)
 *
 * - path → কোন folder মুছে হবে? "a"
 * - recursive → sub-folder + file সব মুছে যাবে
 * - force → permission error থাকলেও মুছে দিবে
 */
fs.rm("a", { recursive: true, force: true }, (err) => {
  if (err) console.error("Recursive folder remove error:", err);
  else console.log("Recursive folder মুছে দেওয়া হয়েছে।");
});

/**
 * 10️⃣ folder read (এর ভিতরের সব file name)
 * fs.readdir(path, callback)
 *
 * - path → কোন folder list করতে চাচ্ছি? "myFolder"
 * - callback(err, files) → files array পাওয়া যায়
 */
fs.readdir("myFolder", (err, files) => {
  if (err) console.error("ফোল্ডার পড়া যায়নি:", err);
  else console.log("ফোল্ডারের ভিতরের ফাইলগুলো:", files);
});

/**
 * 11️⃣ file copy
 * fs.copyFile(src, dest, callback)
 *
 * - src → কোন ফাইল কপি হবে? "src.txt"
 * - dest → কোথায় কপি হবে? "dest.txt"
 * - callback(err) → copy শেষে control
 */
fs.copyFile("src.txt", "dest.txt", (err) => {
  if (err) console.error("ফাইল কপি হয়নি:", err);
  else console.log("ফাইল কপি হয়েছে।");
});

/**
 * 12️⃣ rename / move
 * fs.rename(oldPath, newPath, callback)
 *
 * - oldPath → পুরানো ফাইল/ফোল্ডার নাম
 * - newPath → নতুন নাম বা নতুন জায়গা
 * - callback(err) → rename / move শেষে control
 */
fs.rename("old.txt", "new.txt", (err) => {
  if (err) console.error("Rename/move failed:", err);
  else console.log("ফাইল rename/move হয়েছে।");
});

// ---------------------------------------------------------
//  2) PROMISE BASED API (fs.promises)
// ---------------------------------------------------------

const fsP = fs.promises;

/** file read */
async function demoRead() {
  const data = await fsP.readFile("a.txt", "utf-8");
  // output: file er text
}

/** file write */
async function demoWrite() {
  await fsP.writeFile("a.txt", "Hello!");
}

/** file append */
async function demoAppend() {
  await fsP.appendFile("a.txt", "\nMore text");
}

/** delete file */
async function demoDelete() {
  await fsP.unlink("a.txt");
}

/** stats পাওয়া */
async function demoStats() {
  const stats = await fsP.stat("a.txt");
  // stats.isFile(), stats.size etc
}

/** folder create */
async function demoMkdir() {
  await fsP.mkdir("test-folder", { recursive: true });
}

/** folder read */
async function demoReaddir() {
  const files = await fsP.readdir("test-folder");
  // output: folder er file list
}

/** file copy */
async function demoCopy() {
  await fsP.copyFile("src.txt", "dest.txt");
}

/** rename */
async function demoRename() {
  await fsP.rename("old.txt", "new.txt");
}

// ---------------------------------------------------------
//  3) SYNC API (BLOCKING — ছোট কাজের জন্য)
// ---------------------------------------------------------

/** file read (sync) */
const readSync = fs.readFileSync("a.txt", "utf-8");

/** file write (sync) */
fs.writeFileSync("a.txt", "Hello");

/** append (sync) */
fs.appendFileSync("a.txt", "\nLine2");

/** delete file (sync) */
fs.unlinkSync("a.txt");

/** stats (sync) */
const statsSync = fs.statSync("a.txt");

/** mkdir (sync) */
fs.mkdirSync("folder", { recursive: true });

/** readdir (sync) */
const filesSync = fs.readdirSync("folder");

/** copy file (sync) */
fs.copyFileSync("src.txt", "dest.txt");

/** rename (sync) */
fs.renameSync("old.txt", "new.txt");

// ---------------------------------------------------------
//  EXTRAS: fs.createReadStream / fs.createWriteStream
// ---------------------------------------------------------

/** stream দিয়ে file read */
const readStream = fs.createReadStream("bigfile.txt", "utf-8");
readStream.on("data", (chunk) => {
  // output: part-part kore file read
});

/** stream দিয়ে file write */
const writeStream = fs.createWriteStream("output.txt");
writeStream.write("Writing via stream...");
writeStream.end();

/**
 * Node.js FS Module — readFile vs readFileSync
 * -------------------------------------------
 * এখানে fs.readFile এবং fs.readFileSync এর মধ্যে পার্থক্য step-by-step
 * এবং ডিটেইলস সহ
 */

// ---------------------------------------------------------
// 1️⃣ Asynchronous Read — fs.readFile (Non-blocking)
// ---------------------------------------------------------
/**
 * - Non-blocking: Node.js এই ফাইল পড়ার কাজ পেছনে (background) করে দেয়।
 * - এই ফাংশন কল করার পর, Node.js অবশিষ্ট কোড execution চালায়।
 * - যখন ফাইল পড়া শেষ হয়, তখন callback function execute হয়।
 * - অনেক ফাইল বা network operation একসাথে করতে সুবিধা হয়।
 */
fs.readFile("example.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("ফাইল পড়া যায়নি:", err);
    return;
  }
  console.log("Asynchronous Read (Non-blocking):", data);
});

console.log("এই লাইনটি আগে চলবে, file read হওয়ার আগে।");

// ---------------------------------------------------------
// 2️⃣ Synchronous Read — fs.readFileSync (Blocking)
// ---------------------------------------------------------
/**
 * - Blocking: Node.js এই ফাইল পড়া শেষ না হওয়া পর্যন্ত পরবর্তী কোড execution শুরু করে না।
 * - সহজে লেখা যায়, কিন্তু বড় ফাইল বা অনেক ফাইল হলে Node.js পুরো server freeze হতে পারে।
 * - ছোট স্ক্রিপ্ট বা single task script-এ সুবিধা।
 */
const dataSync = fs.readFileSync("example.txt", "utf-8");
console.log("Synchronous Read (Blocking):", dataSync);

console.log("এই লাইনটি পরে চলবে, কারণ readFileSync blocking।");
