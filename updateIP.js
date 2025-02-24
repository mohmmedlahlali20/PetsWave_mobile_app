const os = require("os");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

function getWiFiIPv4() {
  const networkInterfaces = os.networkInterfaces();
  
  for (const iface of Object.values(networkInterfaces)) {
    for (const details of iface) {
      if (
        details.family === "IPv4" &&
        !details.internal &&
        details.mac !== "00:00:00:00:00:00"
      ) {
        return details.address;
      }
    }
  }

  return null; 
}

function updateEnvFile(ip) {
  if (!ip) {
    console.log("No IPv4 address found!");
    return;
  }

  const envPath = path.resolve(__dirname, ".env");
  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";

  if (/^EXPO_PUBLIC_URL=.*/m.test(envContent)) {
    envContent = envContent.replace(/^EXPO_PUBLIC_URL=.*/m, `EXPO_PUBLIC_URL=${ip}`);
  } else {
    envContent += `\nEXPO_PUBLIC_URL=${ip}\n`;
  }

  fs.writeFileSync(envPath, envContent, "utf8");
  console.log(`✅ .env file updated: EXPO_PUBLIC_URL=${ip}`);
}

const ip = getWiFiIPv4();
updateEnvFile(ip);
