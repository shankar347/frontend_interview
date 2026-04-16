import https from "node:https"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, "..", "src", "data", "googleTranslateLanguageOptions.json")

const url =
  "https://raw.githubusercontent.com/AidanWelch/google-translate-api/master/lib/languages.cjs"

function get(urlStr) {
  return new Promise((resolve, reject) => {
    https
      .get(urlStr, (res) => {
        let d = ""
        res.on("data", (c) => {
          d += c
        })
        res.on("end", () => resolve(d))
      })
      .on("error", reject)
  })
}

const d = await get(url)
const start = d.indexOf("const langs = {")
const end = d.indexOf("};", start)
const body = d.slice(start + "const langs = {".length, end)

/** Keys in source order; skip duplicate keys (later wins in JS object). */
const out = [{ value: "", label: "Select Language" }]
const seen = new Set()
const re = /'((?:\\'|[^'])*)':\s*'((?:\\'|[^'])*)'/g
let m
while ((m = re.exec(body)) !== null) {
  const key = m[1].replace(/\\'/g, "'")
  const val = m[2].replace(/\\'/g, "'")
  if (key === "auto") continue
  if (seen.has(key)) continue
  seen.add(key)
  out.push({ value: key, label: val })
}

/** Align a few labels with the official Google Translate widget wording. */
const labelFix = {
  ga: "Irish Gaelic",
  new: "Nepal Bhasa (Newari)",
  pt: "Portuguese (Brazil)",
  pa: "Punjabi (Gurmukhi)",
  "bm-Nkoo": "N'Ko",
}
for (const o of out) {
  if (labelFix[o.value]) o.label = labelFix[o.value]
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(out))
console.log("wrote", out.length, "entries to", outPath)
