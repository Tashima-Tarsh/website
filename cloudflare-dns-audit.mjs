// DNS-over-HTTPS audit for thenitishkr.in
import https from "node:https";

async function dohQuery(name, type) {
  return new Promise((resolve) => {
    const url = `https://cloudflare-dns.com/dns-query?name=${name}&type=${type}`;
    const req = https.get(url, { headers: { Accept: "application/dns-json" } }, (res) => {
      let b = "";
      res.on("data", (d) => (b += d));
      res.on("end", () => {
        try { resolve(JSON.parse(b)); } catch { resolve({ error: b.slice(0, 200) }); }
      });
    });
    req.on("error", (e) => resolve({ error: e.message }));
  });
}

async function getSSLInfo(hostname) {
  return new Promise((resolve) => {
    const req = https.request({ hostname, port: 443, method: "GET", servername: hostname }, (res) => {
      const cert = res.socket?.getPeerCertificate?.();
      resolve({
        status: res.statusCode,
        tlsVersion: res.socket?.getProtocol?.(),
        subject: cert?.subject?.CN,
        issuer: cert?.issuer?.CN,
        validFrom: cert?.valid_from,
        validTo: cert?.valid_to,
        subjectAltNames: cert?.subjectaltname,
      });
    });
    req.on("error", (e) => resolve({ error: e.message }));
    req.end();
  });
}

console.log("=".repeat(80));
console.log("DNS AUDIT — thenitishkr.in");
console.log("=".repeat(80));

// Apex A/AAAA
const apexA = await dohQuery("thenitishkr.in", "A");
console.log("\n--- Apex A ---");
apexA.Answer?.forEach((a) => console.log(`  ${a.name} → ${a.data} (TTL: ${a.TTL})`));

const apexAAAA = await dohQuery("thenitishkr.in", "AAAA");
console.log("\n--- Apex AAAA ---");
apexAAAA.Answer?.forEach((a) => console.log(`  ${a.name} → ${a.data} (TTL: ${a.TTL})`));

// www
const wwwCNAME = await dohQuery("www.thenitishkr.in", "CNAME");
console.log("\n--- www CNAME ---");
wwwCNAME.Answer?.forEach((a) => console.log(`  ${a.name} → ${a.data} (TTL: ${a.TTL})`));
if (!wwwCNAME.Answer || wwwCNAME.Answer.length === 0) {
  const wwwA = await dohQuery("www.thenitishkr.in", "A");
  wwwA.Answer?.forEach((a) => console.log(`  ${a.name} → ${a.data} (A record, TTL: ${a.TTL})`));
}

// MX
const mx = await dohQuery("thenitishkr.in", "MX");
console.log("\n--- MX ---");
mx.Answer?.forEach((a) => console.log(`  Priority: ${a.data.split(" ")[0]} → ${a.data.split(" ")[1]}`));

// TXT
const txt = await dohQuery("thenitishkr.in", "TXT");
console.log("\n--- TXT ---");
txt.Answer?.forEach((a) => console.log(`  ${a.data.slice(0, 150)}`));

// CAA
const caa = await dohQuery("thenitishkr.in", "CAA");
console.log("\n--- CAA ---");
caa.Answer?.forEach((a) => console.log(`  ${a.data}`));

// NS
const ns = await dohQuery("thenitishkr.in", "NS");
console.log("\n--- NS ---");
ns.Answer?.forEach((a) => console.log(`  ${a.data}`));

// SOA
const soa = await dohQuery("thenitishkr.in", "SOA");
console.log("\n--- SOA ---");
soa.Answer?.forEach((a) => console.log(`  ${a.data}`));

// DMARC
const dmarc = await dohQuery("_dmarc.thenitishkr.in", "TXT");
console.log("\n--- DMARC ---");
dmarc.Answer?.forEach((a) => console.log(`  ${a.data.slice(0, 200)}`));

// SSL/TLS inspection
console.log("\n" + "=".repeat(80));
console.log("SSL/TLS AUDIT");
console.log("=".repeat(80));
const ssl = await getSSLInfo("thenitishkr.in");
console.log(JSON.stringify(ssl, null, 2));

// Pages hostname
const pagesDev = await dohQuery("thenitishkr.pages.dev", "A");
console.log("\n--- Pages.dev ---");
pagesDev.Answer?.forEach((a) => console.log(`  ${a.name} → ${a.data}`));

// Preview
const previewCNAME = await dohQuery("9581b29e.thenitishkr-static.pages.dev", "A");
console.log("\n--- Preview ---");
previewCNAME.Answer?.forEach((a) => console.log(`  ${a.name} → ${a.data}`));

console.log("\n✅ DNS audit complete.");