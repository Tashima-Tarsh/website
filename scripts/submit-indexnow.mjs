import fs from "node:fs";

const endpoint = "https://api.indexnow.org/indexnow";
const payload = JSON.parse(fs.readFileSync("indexnow-payload.json", "utf8"));
const response = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow returned HTTP ${response.status}: ${await response.text()}`);
}

console.log(`IndexNow accepted ${payload.urlList.length} canonical URLs with HTTP ${response.status}.`);
