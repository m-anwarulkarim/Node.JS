/**
 * Node.js OS Module — Full Bangla Notes
 * -------------------------------------
 * OS module কম্পিউটার বা সার্ভারের Operating System সংক্রান্ত
 * সব প্রয়োজনীয় তথ্য নেওয়ার জন্য ব্যবহার করা হয়।
 *
 * এই ফাইলটি শুধুমাত্র শেখার উদ্দেশ্যে তৈরি করা হয়েছে।
 */

const os = require("os");
// ---------------------------------------------------------
// 1) Operating System Basic Info
// ---------------------------------------------------------

// os.type() → OS এর নাম: Linux / Darwin / Windows_NT
const osType = os.type();
// Example Output: "Windows_NT"

// os.platform() → Platform: win32 / linux / darwin
const osPlatform = os.platform();
// Example Output: "win32"

// os.release() → OS এর release version
const osRelease = os.release();
// Example Output: '10.0.26200'

// os.hostname() → Device এর hostname
const hostName = os.hostname();
// Example Output: "anwar"

// os.arch() → CPU architecture: x64 / arm / ia32
const architecture = os.arch();
// Example Output: "x64"

// os.version() → Full OS version info
const versionInfo = os.version();
// Example Output: "Windows 11 Home (Build 22631)"

// ---------------------------------------------------------
// 2) User Related Info
// ---------------------------------------------------------

// os.userInfo() → বর্তমান লগিন করা user এর তথ্য
const currentUser = os.userInfo();
// Example Output: { username: "anwarul", homedir: "C:\\Users\\anwarul", ... }

// os.homedir() → home directory এর path
const homeDirectory = os.homedir();
// Example Output: "C:\\Users\\anwarul"

// os.tmpdir() → temporary ফাইল রাখার default folder
const tempDirectory = os.tmpdir();
// Example Output: "C:\\Users\\ANWARU~1\\AppData\\Local\\Temp"

// ---------------------------------------------------------
// 3) CPU & Memory Info
// ---------------------------------------------------------

// os.cpus() → সমস্ত CPU core এর ডিটেইল (model + speed + usage times)
const cpuInfo = os.cpus();
// Example Output: [{ model: "Intel(R) Core(TM)...", speed: 2400, times: {...} }, ...]

// os.totalmem() → Total RAM in bytes
const totalMemory = os.totalmem();
// Example Output: 17179869184  (~16 GB)

// os.freemem() → Free RAM in bytes
const freeMemory = os.freemem();
// Example Output: 6878658560 (~6.4 GB)

// os.uptime() → কত সেকেন্ড ধরে ডিভাইস চালু আছে
const systemUptime = os.uptime();
// Example Output: 52341 (≈ 14 hours)

// os.loadavg() → System load average (Linux/Mac), Windows এ 0 দেয়
const loadAverage = os.loadavg();
// Example Output: [0, 0, 0] (Windows), Linux এ [0.42, 0.51, 0.48]

// ---------------------------------------------------------
// 4) Network Info
// ---------------------------------------------------------

// os.networkInterfaces() → সব network interface + IP/MAC address details
const networkInfo = os.networkInterfaces();
// Example Output: { Ethernet: [{ address: "192.168.0.105", mac: "74:d4:...", family: "IPv4" }] }

// ---------------------------------------------------------
// 5) Constants (Signals / Errors / Flags)
// ---------------------------------------------------------

// os.constants → Error codes + Signals + File system flags
const osConstants = os.constants;
// Example Output: { errno: {...}, signals: {...}, dlopen: {...} }

// ---------------------------------------------------------
// 6) OS End of Line Character
// ---------------------------------------------------------

// os.EOL → New line character
// Windows → \r\n
// Linux/Mac → \n
const endOfLine = os.EOL;
// Example Output: "\r\n" (Windows)

// ---------------------------------------------------------
// সবকিছু console.log করে দেখতে চাইলে:
// ---------------------------------------------------------

console.log({
  osType,
  osPlatform,
  osRelease,
  hostName,
  architecture,
  versionInfo,
  currentUser,
  homeDirectory,
  tempDirectory,
  cpuInfo,
  totalMemory,
  freeMemory,
  systemUptime,
  loadAverage,
  networkInfo,
  osConstants,
  endOfLine,
});
