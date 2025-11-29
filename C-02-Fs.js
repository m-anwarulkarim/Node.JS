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
//  1) CALLBACK BASED FS API
// ---------------------------------------------------------

/** ফাইল পড়া (asynchronous) */
fs.readFile("example.txt", "utf-8", (err, data) => {
  // output: file er text print hobe
});

/** ফাইল লেখা (overwrite করে) */
fs.writeFile("example.txt", "Hello World", (err) => {
  // output: file create/overwrite hobe
});

/** ফাইল append করা */
fs.appendFile("example.txt", " New Line", (err) => {
  // output: file er seshe new line add hobe
});

/** ফাইল delete করা */
fs.unlink("example.txt", (err) => {
  // output: file remove hoye jabe
});

/** ফাইল আছে কিনা চেক (stats পায়) */
fs.stat("example.txt", (err, stats) => {
  // output: stats.size, stats.isFile(), stats.isDirectory() etc
});

/** folder create করা */
fs.mkdir("myFolder", (err) => {
  // output: folder create hobe
});

/** folder recursive create */
fs.mkdir("a/b/c", { recursive: true }, (err) => {});

/** folder remove */
fs.rmdir("myFolder", (err) => {});

/** folder recursive remove */
fs.rm("a", { recursive: true, force: true }, (err) => {});

/** folder read -> এর ভিতরের সব file নাম দেখায় */
fs.readdir("myFolder", (err, files) => {
  // output: ["file1.txt", "file2.js"]
});

/** ফাইল copy */
fs.copyFile("src.txt", "dest.txt", (err) => {});

/** rename / move */
fs.rename("old.txt", "new.txt", (err) => {});

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
