/*C-02-path.js
/**
 * Node.js Path Module — Full Bangla Notes
 * ---------------------------------------
 * Path module ফাইল path নিয়ে কাজ করার জন্য ব্যবহার করা হয়।
 * এটি Node.js এর core module, তাই আলাদা করে install করতে হয় না।
 */

const path = require("path");

// ---------------------------------------------------------
// 1) Path Properties
// ---------------------------------------------------------

// path.sep → OS অনুযায়ী path separator
// Windows → \  |  Linux/Mac → /
const separator = path.sep;

// path.delimiter → Environment variable separator
// Windows → ;   |  Linux/Mac → :
const envDelimiter = path.delimiter;

// path.posix → POSIX (Linux/Mac) স্টাইল path functions
const posixExample = path.posix.join("user", "docs", "a.txt");

// path.win32 → Windows স্টাইল path functions
const win32Example = path.win32.join("user", "docs", "a.txt");

// ---------------------------------------------------------
// 2) File Path থেকে তথ্য বের করা
// ---------------------------------------------------------

// path.basename() → path থেকে ফাইলের নাম বের করে
const baseName = path.basename("/home/user/file.txt"); // file.txt

// path.dirname() → path এর directory অংশ দেয়
const dirName = path.dirname("/home/user/file.txt"); // /home/user

// path.extname() → ফাইলের extension দেয়
const extName = path.extname("index.html"); // .html

// ---------------------------------------------------------
// 3) Path Join / Resolve
// ---------------------------------------------------------

// path.join() → বিভিন্ন অংশকে merge করে সাধারণ path তৈরি করে
const joinPath = path.join("user", "documents", "photo.png");
// ফলাফল: user/documents/photo.png

// path.resolve() → absolute path তৈরি করে (current working dir থেকে)
const resolvePath = path.resolve("folder", "file.txt");
// যেমন: /Users/you/project/folder/file.txt

// ---------------------------------------------------------
// 4) Normalize / Parse / Format
// ---------------------------------------------------------

// path.normalize() → অদ্ভুত path ঠিক করে smooth করে দেয়
const normalizePath = path.normalize("a//b/c/..");
// ফলাফল: a/b

// path.parse() → path কে ভাগ করে দেয় → root, dir, base, ext, name
const parsed = path.parse("/home/user/a.txt");
// {
//   root: '/',
//   dir: '/home/user',
//   base: 'a.txt',
//   ext: '.txt',
//   name: 'a'
// }

// path.format() → parse করা object থেকে path বানায়
const formatted = path.format({
  dir: "/home/user",
  name: "a",
  ext: ".txt",
});
// ফলাফল: /home/user/a.txt

// ---------------------------------------------------------
// 5) Relative এবং Absolute চেক
// ---------------------------------------------------------

// path.relative(from, to) → দুই path এর মধ্যে relative path বের করে
const relativePath = path.relative("/a/b/c", "/a/d/e");
// ফলাফল: ../../d/e

// path.isAbsolute() → path absolute কিনা চেক করে
const isAbs = path.isAbsolute("/home/user"); // true

// ---------------------------------------------------------
// সবকিছু console.log করে দেখতে চাইলে:
// ---------------------------------------------------------

// console.log({
//   separator,
//   envDelimiter,
//   posixExample,
//   win32Example,
//   baseName,
//   dirName,
//   extName,
//   joinPath,
//   resolvePath,
//   normalizePath,
//   parsed,
//   formatted,
//   relativePath,
//   isAbs,
// });
