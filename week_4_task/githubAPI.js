/**
 * ============================================
 * GitHub API Demo – by codebasebo
 * Learn: GET, POST, PUT, DELETE
 * ============================================
 */

// If Node.js < 18, uncomment this line:
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const TOKEN = process.env.TOKEN;


// ✅ Helper function to make API requests
async function githubFetch(endpoint, options = {}) {
  const baseUrl = "https://api.github.com";
  const headers = {
    "Accept": "application/vnd.github+json",
    "Content-Type": "application/json",
    ...(TOKEN ? { Authorization: `token ${TOKEN}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  console.log(`\n📡 [${options.method || "GET"}] ${baseUrl}${endpoint}`);
  console.log("🔹 Status:", response.status);
  console.log("🔹 Response Data:", data);
  return data;
}

// 1️⃣ GET — Fetch user info for @codebasebo
async function getUser() {
  console.log("\n🚀 Running: GET /users/codebasebo");
  await githubFetch("/users/codebasebo");
}

// 2️⃣ POST — Create a new repository (Requires Auth)
async function createRepo() {
  console.log("\n🚀 Running: POST /user/repos");
  await githubFetch("/user/repos", {
    method: "POST",
    body: JSON.stringify({
      name: "api-demo-repo",
      description: "This repository was created via GitHub API demo by codebasebo",
      private: false,
    }),
  });
}

// 3️⃣ PUT — Star a repository
async function starRepo() {
  console.log("\n🚀 Running: PUT /user/starred/codebasebo/api-demo-repo");
  await githubFetch("/user/starred/codebasebo/api-demo-repo", {
    method: "PUT",
  });
}

// 4️⃣ DELETE — Unstar a repository
async function unstarRepo() {
  console.log("\n🚀 Running: DELETE /user/starred/codebasebo/api-demo-repo");
  await githubFetch("/user/starred/codebasebo/api-demo-repo", {
    method: "DELETE",
  });
}

// Choose which action to test
await getUser();    
await createRepo(); 
await starRepo();   
await unstarRepo(); 
