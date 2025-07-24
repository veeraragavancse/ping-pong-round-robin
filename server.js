const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.post("/ping", (req, res) => {
  const hosts = req.body.hosts || [];

  if (!hosts.length) {
    return res.status(400).send("No hosts provided.");
  }

  let pingResults = [];
  let completed = 0;

  hosts.forEach((host) => {
    exec(`ping -n 4 ${host}`, (error, stdout, stderr) => {
      if (error || stderr) {
        pingResults.push({
          host: host,
          error: error?.message || stderr,
        });
      } else {
        pingResults.push({
          host: host,
          results: stdout.split("\n").filter((line) => line),
        });
      }
      completed++;

      if (completed === hosts.length) {
        res.json(pingResults);
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
