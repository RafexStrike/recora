const fs = require("fs");
const path = require("path");

// CONFIG
const ROOT = process.cwd();
const SRC_DIRS = ["client", "server"];
const EXTENSIONS = [".js", ".ts", ".tsx", ".jsx"];
const IGNORE = ["node_modules", ".next", "dist", "build"];

// ENTRY POINTS (VERY IMPORTANT)
const ENTRY_POINTS = [
  "server/src/server.ts",
  "server/src/app.ts",
  "client/src/app",
  "client/src/pages",
];

// ---- HELPERS ----

function isIgnored(filePath) {
  return IGNORE.some((dir) => filePath.includes(dir));
}

function getAllFiles(dir, files = []) {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const full = path.join(dir, entry);

    if (isIgnored(full)) continue;

    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      getAllFiles(full, files);
    } else if (EXTENSIONS.includes(path.extname(full))) {
      files.push(full);
    }
  }

  return files;
}

// Extract imports
function getImports(fileContent) {
  const importRegex =
    /import\s+.*?from\s+['"](.*?)['"]|require\(['"](.*?)['"]\)/g;

  const imports = [];
  let match;

  while ((match = importRegex.exec(fileContent))) {
    imports.push(match[1] || match[2]);
  }

  return imports;
}

// Resolve import path → actual file
function resolveImport(fromFile, importPath) {
  if (!importPath.startsWith(".")) return null;

  const base = path.resolve(path.dirname(fromFile), importPath);

  for (const ext of EXTENSIONS) {
    if (fs.existsSync(base + ext)) return base + ext;
  }

  if (fs.existsSync(base)) return base;

  return null;
}

// ---- MAIN LOGIC ----

function buildGraph(files) {
  const graph = {};

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const imports = getImports(content);

    graph[file] = imports
      .map((imp) => resolveImport(file, imp))
      .filter(Boolean);
  }

  return graph;
}

// DFS to find reachable files
function findUsedFiles(graph, entryPoints) {
  const visited = new Set();

  function dfs(file) {
    if (!file || visited.has(file)) return;
    visited.add(file);

    const neighbors = graph[file] || [];
    for (const n of neighbors) dfs(n);
  }

  entryPoints.forEach((entry) => {
    const full = path.resolve(ROOT, entry);
    if (fs.existsSync(full)) dfs(full);
  });

  return visited;
}

// ---- RUN ----

function main() {
  console.log("🔍 Scanning codebase...");

  const files = SRC_DIRS.flatMap((dir) =>
    getAllFiles(path.join(ROOT, dir))
  );

  const graph = buildGraph(files);

  const used = findUsedFiles(graph, ENTRY_POINTS);

  const unused = files.filter((f) => !used.has(f));

  console.log(`\n✅ Total files: ${files.length}`);
  console.log(`📦 Used files: ${used.size}`);
  console.log(`🗑️ Unused files: ${unused.length}\n`);

  unused.forEach((file) => console.log("❌", file));

  // OPTIONAL DELETE
  console.log("\n⚠️ To delete unused files, type YES:");

  process.stdin.once("data", (data) => {
    const input = data.toString().trim();

    if (input === "YES") {
      unused.forEach((file) => {
        fs.unlinkSync(file);
        console.log("Deleted:", file);
      });
      console.log("✅ Cleanup complete");
    } else {
      console.log("❌ Aborted");
    }
  });
}

main();
