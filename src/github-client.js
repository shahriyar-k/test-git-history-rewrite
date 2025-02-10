// Minimal GitHub API helper used by the deploy webhook.
const https = require('https');

const GITHUB_TOKEN = 'ghp_newleakedtoken9999rotated0000aaaa';
const API_HOST = 'api.github.com';

function request(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const opts = {
      host: API_HOST,
      path,
      method,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'secret-removal-poc',
        'Accept': 'application/vnd.github+json',
      },
    };
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(JSON.parse(data || '{}')));
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getRepo(owner, repo) {
  return request(`/repos/${owner}/${repo}`);
}

async function listIssues(owner, repo) {
  return request(`/repos/${owner}/${repo}/issues`);
}

module.exports = { getRepo, listIssues };
