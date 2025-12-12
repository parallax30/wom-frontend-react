const fs = require("fs");
const path = require("path");

const COLLECTION_FILE = "./postman_collection.json"; 
const OUTPUT_FILE = "./src/services/apiService.js";

function cleanName(name) {
  return name
    .replace(/^(GET|POST|PUT|DELETE)\s*/i, "")
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^[a-z]/, (c) => c.toLowerCase());
}

function buildUrl(url) {
  if (typeof url === "string") {
    return url.replace("{{url}}", "${process.env.REACT_APP_API_URL}");
  }

  if (url.raw) {
    return url.raw.replace("{{url}}", "${process.env.REACT_APP_API_URL}");
  }

  const protocol = url.protocol || "https";
  const host = Array.isArray(url.host) ? url.host.join(".") : url.host || "";
  const port = url.port ? `:${url.port}` : "";
  const pathParts = Array.isArray(url.path) ? "/" + url.path.join("/") : "";
  const query = url.query
    ? "?" +
      url.query
        .map((q) => `${q.key}=${q.value}`)
        .join("&")
    : "";

  return `${protocol}://${host}${port}${pathParts}${query}`.replace(
    "localhost:1337",
    "${process.env.REACT_APP_API_URL}"
  );
}

function generateFunction(item) {
  const name = cleanName(item.name);
  const method = item.request.method.toLowerCase();
  const url = buildUrl(item.request.url);

  if (method === "get") {
    return `export const ${name} = (params) => api.get(\`${url}\`, { params });`;
  }

  if (method === "post") {
    return `export const ${name} = (data) => api.post(\`${url}\`, data);`;
  }

  if (method === "put") {
    return `export const ${name} = (data) => api.put(\`${url}\`, data);`;
  }

  if (method === "delete") {
    return `export const ${name} = (params) => api.delete(\`${url}\`, { params });`;
  }

  return "";
}

function generate() {
  const collection = JSON.parse(fs.readFileSync(COLLECTION_FILE, "utf8"));
  const items = collection.item;

  let output = `import api from "../api/api";\n\n`;

  items.forEach((item) => {
    output += generateFunction(item) + "\n";
  });

  fs.writeFileSync(OUTPUT_FILE, output, "utf8");

  console.log(`✔ Archivo generado: ${OUTPUT_FILE}`);
}

generate();
