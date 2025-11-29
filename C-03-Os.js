/**
 * Node.js OS Module — Full Beginner-Friendly Bangla Notes
 * ------------------------------------------------------
 * OS module কম্পিউটার বা সার্ভারের Operating System সংক্রান্ত
 * সব প্রয়োজনীয় তথ্য নেওয়ার জন্য ব্যবহার করা হয়।
 *
 * 🔹 Tips & Common mistakes:
 * - সব function sync, তাই call করা safe
 * - platform-specific differences (Windows/Linux/Mac) খেয়াল রাখা
 * - loadavg → Windows এ সবসময় [0,0,0], Linux/Mac এ actual value
 * - cpu speed, memory bytes → human readable করতে divide/format করতে হবে
 */

const os = require("os");

// ---------------------------------------------------------
// 1️⃣ Operating System Basic Info
// ---------------------------------------------------------
const osType = os.type(); // OS এর নাম: Linux / Darwin / Windows_NT
const osPlatform = os.platform(); // Platform: win32 / linux / darwin
const osRelease = os.release(); // OS release version
const hostName = os.hostname(); // Device hostname
const architecture = os.arch(); // CPU architecture: x64 / arm / ia32
const versionInfo = os.version(); // Full OS version info

// Tip: os.type vs os.platform → type: OS name, platform: Node.js detect করা platform

// ---------------------------------------------------------
// 2️⃣ User Related Info
// ---------------------------------------------------------
const currentUser = os.userInfo(); // বর্তমান লগিন user info
const homeDirectory = os.homedir(); // Home directory path
const tempDirectory = os.tmpdir(); // Default temp folder

// Tip: userInfo() → sensitive info, console log করার আগে সাবধান

// ---------------------------------------------------------
// 3️⃣ CPU & Memory Info
// ---------------------------------------------------------
const cpuInfo = os.cpus(); // সমস্ত CPU core info
const totalMemory = os.totalmem(); // Total RAM (bytes)
const freeMemory = os.freemem(); // Free RAM (bytes)
const systemUptime = os.uptime(); // System uptime (seconds)
const loadAverage = os.loadavg(); // System load average (Linux/Mac only)

// Tip: totalMemory, freeMemory → human readable করতে MB/GB এ convert করা যায়
// Tip: loadAverage → Windows এ সবসময় [0,0,0]

// ---------------------------------------------------------
// 4️⃣ Network Info
// ---------------------------------------------------------
const networkInfo = os.networkInterfaces(); // সব network interface + IP/MAC

// Tip: IPv6/IPv4 difference খেয়াল রাখতে হবে, virtual adapters ও থাকতে পারে

// ---------------------------------------------------------
// 5️⃣ Constants (Signals / Errors / Flags)
// ---------------------------------------------------------
const osConstants = os.constants; // Error codes + Signals + File system flags

// Tip: system signals (SIGINT, SIGTERM) cross-platform different behaviour করতে পারে

// ---------------------------------------------------------
// 6️⃣ OS End of Line Character
// ---------------------------------------------------------
const endOfLine = os.EOL; // Windows → \r\n, Linux/Mac → \n

// Tip: text file write/read করার সময় platform EOL খেয়াল রাখা দরকার

// ---------------------------------------------------------
// 7️⃣ Human Readable Helper Functions (Extra)
// ---------------------------------------------------------
function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

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
  cpuInfo: cpuInfo.map((c) => ({ model: c.model, speed: c.speed + "MHz" })),
  totalMemory: formatBytes(totalMemory),
  freeMemory: formatBytes(freeMemory),
  systemUptime: `${(systemUptime / 3600).toFixed(2)} hours`,
  loadAverage,
  networkInfo,
  osConstants,
  endOfLine,
});

// ---------------------------------------------------------
// 8️⃣ Common Mistakes / Beginner Tips
// ---------------------------------------------------------
/**
 * ✅ সব OS info function sync, তাই try/catch optional (except sensitive access)
 * ✅ Windows/Linux/Mac behaviour ভিন্ন → test cross-platform
 * ✅ Memory in bytes → human readable format করা ভালো
 * ✅ loadavg Windows এ zero → logic লিখার সময় handle করা দরকার
 * ✅ networkInterfaces → virtual adapters থাকতে পারে
 * ✅ endOfLine → file write/read cross-platform safe করতে ব্যবহার করা
 * ✅ userInfo sensitive → production code এ সাবধান
 */
