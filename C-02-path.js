/* C-02-path.js
/**
 * Node.js Path Module — Full Beginner-Friendly Bangla Notes
 * -------------------------------------------------------
 * Path module ফাইল path নিয়ে কাজ করার জন্য ব্যবহার করা হয়।
 * এটি Node.js এর core module, তাই আলাদা install করতে হয় না।
 *
 * 🔹 Tips & Common mistakes:
 * - Absolute এবং relative path পার্থক্য বুঝা দরকার
 * - Windows/Linux path separator ভিন্ন
 * - join vs resolve → relative vs absolute
 * - normalize → weird path fix করতে ব্যবহার করা হয়
 */

const path = require("path");

// ---------------------------------------------------------
// 1️⃣ Path Properties
// ---------------------------------------------------------
const separator = path.sep; // OS অনুযায়ী path separator (\ /)
const envDelimiter = path.delimiter; // Environment variable separator (; / :)
const posixExample = path.posix.join("user", "docs", "a.txt"); // Linux/Mac style
const win32Example = path.win32.join("user", "docs", "a.txt"); // Windows style

// Tip: posix / win32 → cross-platform compatibility test করতে সাহায্য করে

// ---------------------------------------------------------
// 2️⃣ File Path থেকে তথ্য বের করা
// ---------------------------------------------------------
const baseName = path.basename("/home/user/file.txt"); // file.txt
const dirName = path.dirname("/home/user/file.txt"); // /home/user
const extName = path.extname("index.html"); // .html

// Tip: extension check করার সময় dot (.) included থাকে

// ---------------------------------------------------------
// 3️⃣ Path Join / Resolve
// ---------------------------------------------------------
const joinPath = path.join("user", "documents", "photo.png"); // user/documents/photo.png
const resolvePath = path.resolve("folder", "file.txt"); // absolute path

// Tip: join → relative path, resolve → absolute path
// Tip: resolve → cwd(current working dir) থেকে absolute path তৈরি করে

// ---------------------------------------------------------
// 4️⃣ Normalize / Parse / Format
// ---------------------------------------------------------
const normalizePath = path.normalize("a//b/c/.."); // a/b
const parsed = path.parse("/home/user/a.txt");
// {
//   root: '/',
//   dir: '/home/user',
//   base: 'a.txt',
//   ext: '.txt',
//   name: 'a'
// }
const formatted = path.format({
  dir: "/home/user",
  name: "a",
  ext: ".txt",
}); // /home/user/a.txt

// Tip: normalize → path cleanup, parse → root/dir/base/ext/name বের করে, format → parse object থেকে path বানায়

// ---------------------------------------------------------
// 5️⃣ Relative এবং Absolute চেক
// ---------------------------------------------------------
const relativePath = path.relative("/a/b/c", "/a/d/e"); // ../../d/e
const isAbs = path.isAbsolute("/home/user"); // true

// Tip: relative → two paths এর মধ্যে relation দেখায়
// Tip: isAbsolute → absolute path confirm করার জন্য

// ---------------------------------------------------------
// 6️⃣ Console Output (সব কিছু একসাথে দেখার জন্য)
// ---------------------------------------------------------
console.log({
  separator,
  envDelimiter,
  posixExample,
  win32Example,
  baseName,
  dirName,
  extName,
  joinPath,
  resolvePath,
  normalizePath,
  parsed,
  formatted,
  relativePath,
  isAbs,
});

// ---------------------------------------------------------
// 7️⃣ Common Mistakes / Beginner Tips
// ---------------------------------------------------------
/**
 * ✅ Windows/Linux path separator ভিন্ন → cross-platform test করতে হবে
 * ✅ join → relative path, resolve → absolute path
 * ✅ normalize → weird path correct করতে ব্যবহার করা
 * ✅ basename → extension included থাকে
 * ✅ parse → path ভাগ করা, format → parse থেকে path বানানো
 * ✅ relative → path relation দেখায়, cwd change হলে different result আসতে পারে
 * ✅ isAbsolute → true/false check
 */
