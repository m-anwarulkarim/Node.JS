/**
 * Node.js FS Module — Full Beginner-Friendly Cheatsheet
 * -----------------------------------------------------
 * এখানে fs module-এর সব গুরুত্বপূর্ণ API সুন্দরভাবে সাজানো হয়েছে:
 * 1) Callback-based API
 * 2) Promise-based API (fs.promises)
 * 3) Synchronous API
 *
 * 🔹 Tips & Common mistakes:
 * - ফাইল/ফোল্ডার না থাকলে error হবে → try/catch বা err handle করা জরুরি
 * - readFileSync বা writeFileSync বড় ফাইলের জন্য ব্যবহার করলে server block হতে পারে , কেননা তখন একটা কাজ শেষ হওয়ার পর আর একটা কাজ করে
 * - path ভুল হলে ENOENT error দেখাবে
 */

const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------
//  1️⃣ CALLBACK BASED FS API (Detailed Explanation)
// ---------------------------------------------------------

// --------------------
// 1) ফাইল পড়া (asynchronous)
// --------------------
fs.readFile("example.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("ফাইল পড়া যায়নি:", err);
    return;
  }
  console.log("ফাইলের ভিতরের content:", data);
});
// Tip: callback ছাড়া async code crash করতে পারে

// --------------------
// 2) ফাইল লেখা (overwrite)
// --------------------
fs.writeFile("example.txt", "Hello World", (err) => {
  if (err) console.error("ফাইল লেখা যায়নি:", err);
  else console.log("ফাইল তৈরি/overwrite হয়েছে।");
});
// Tip: writeFile সব content replace করে, append করতে চাইলে appendFile ব্যবহার করতে হবে

// --------------------
// 3) ফাইল append করা
// --------------------
fs.appendFile("example.txt", " New Line", (err) => {
  if (err) console.error("ফাইল append করা যায়নি:", err);
  else console.log("ফাইলের শেষে নতুন লাইন যোগ হয়েছে।");
});
// Tip: appendFile vs writeFile → writeFile overwrite করবে, appendFile যোগ করবে

// --------------------
// 4) ফাইল delete করা
// --------------------
fs.unlink("example.txt", (err) => {
  if (err) console.error("ফাইল delete করা যায়নি:", err);
  else console.log("ফাইল সফলভাবে মুছে দেওয়া হয়েছে।");
});
// Tip: ফাইল না থাকলে err throw হবে

// --------------------
// 5) ফাইল info / exists check
// --------------------
fs.stat("example.txt", (err, stats) => {
  if (err) console.error("ফাইলের stats পাওয়া যায়নি:", err);
  else {
    console.log("ফাইল size:", stats.size);
    console.log("Is file?", stats.isFile());
    console.log("Is directory?", stats.isDirectory());
  }
});
// Tip: fs.existsSync(path) দিয়ে সহজে check করা যায়

// --------------------
// 6) folder create
// --------------------
fs.mkdir("myFolder", (err) => {
  if (err) console.error("ফোল্ডার তৈরি হয়নি:", err);
  else console.log("ফোল্ডার তৈরি হয়েছে।");
});
// Tip: folder আগে থেকেই থাকলে EEXIST error হবে

// --------------------
// 7) folder recursive create
// --------------------
fs.mkdir("a/b/c", { recursive: true }, (err) => {
  if (err) console.error("Recursive folder তৈরি হয়নি:", err);
  else console.log("Recursive folders তৈরি হয়েছে।");
});
// Tip: recursive:true → parent folder না থাকলেও তৈরি হবে

// --------------------
// 8) folder remove (empty)
// --------------------
fs.rmdir("myFolder", (err) => {
  if (err) console.error("ফোল্ডার মুছে দেওয়া যায়নি:", err);
  else console.log("ফোল্ডার মুছে দেওয়া হয়েছে।");
});
// Tip: ফোল্ডার খালি না থাকলে err হবে → recursive remove ব্যবহার করতে হবে

// --------------------
// 9) folder recursive remove
// --------------------
fs.rm("a", { recursive: true, force: true }, (err) => {
  if (err) console.error("Recursive folder remove error:", err);
  else console.log("Recursive folder মুছে দেওয়া হয়েছে।");
});
// Tip: force:true → permission error থাকলেও মুছে যাবে

// --------------------
// 10) folder read
// --------------------
fs.readdir("myFolder", (err, files) => {
  if (err) console.error("ফোল্ডার পড়া যায়নি:", err);
  else console.log("ফোল্ডারের ভিতরের ফাইলগুলো:", files);
});

// --------------------
// 11) file copy
// --------------------
fs.copyFile("src.txt", "dest.txt", (err) => {
  if (err) console.error("ফাইল কপি হয়নি:", err);
  else console.log("ফাইল কপি হয়েছে।");
});

// --------------------
// 12) rename / move
// --------------------
fs.rename("old.txt", "new.txt", (err) => {
  if (err) console.error("Rename/move failed:", err);
  else console.log("ফাইল rename/move হয়েছে।");
});

// ---------------------------------------------------------
//  2️⃣ PROMISE BASED API (fs.promises)
// ---------------------------------------------------------
const fsP = fs.promises;

// Tip: async/await ব্যবহার করলে cleaner code হয় এবং callback hell এড়ানো যায়

async function demoFS() {
  try {
    const data = await fsP.readFile("a.txt", "utf-8");
    console.log("Promise read:", data);

    await fsP.writeFile("a.txt", "Hello via promise");
    await fsP.appendFile("a.txt", "\nMore text");

    const stats = await fsP.stat("a.txt");
    console.log("Stats size:", stats.size);

    await fsP.mkdir("test-folder", { recursive: true });
    const files = await fsP.readdir("test-folder");
    console.log("Folder files:", files);

    await fsP.copyFile("src.txt", "dest.txt");
    await fsP.rename("old.txt", "new.txt");
    await fsP.unlink("a.txt");
  } catch (err) {
    console.error("Promise FS error:", err);
  }
}

// ---------------------------------------------------------
//  3️⃣ SYNC API (BLOCKING — ছোট কাজের জন্য)
// ---------------------------------------------------------
const readSync = fs.readFileSync("a.txt", "utf-8"); // Blocking

fs.writeFileSync("a.txt", "Hello");

fs.appendFileSync("a.txt", "\nLine2");

fs.unlinkSync("a.txt");

const statsSync = fs.statSync("a.txt");

fs.mkdirSync("folder", { recursive: true });

const filesSync = fs.readdirSync("folder");

fs.copyFileSync("src.txt", "dest.txt");

fs.renameSync("old.txt", "new.txt");

// Tip: sync API বড় ফাইল বা server এ ব্যবহার করলে freeze হতে পারে

// ---------------------------------------------------------
//  4️⃣ Stream API
// ---------------------------------------------------------
const readStream = fs.createReadStream("bigfile.txt", "utf-8");
readStream.on("data", (chunk) => {
  console.log("Chunk:", chunk);
});

const writeStream = fs.createWriteStream("output.txt");
writeStream.write("Writing via stream...");
writeStream.end();
// Tip: Stream → বড় ফাইলের জন্য memory efficient

// ---------------------------------------------------------
//  5️⃣ Important Tips / Common Mistakes
// ---------------------------------------------------------
/**
 * ✅ সবসময় err handle করা
 * ✅ Path ভুল হলে error হবে, absolute path use করতে পারা ভালো
 * ✅ writeFile → overwrite, appendFile → যোগ
 * ✅ Sync API বড় ফাইলের জন্য avoid করা
 * ✅ Recursive mkdir/rm → nested folder handling সহজ করে
 * ✅ Streams → বড় file, non-blocking read/write
 * ✅ fs.promises → cleaner async/await
 * ✅ File/folder permission error হলে force:true বা try/catch ব্যবহার
 */
