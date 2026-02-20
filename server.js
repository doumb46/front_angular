//Install express server
const express = require("express");
const path = require("path");

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/assignment-app/browser"));

// Express 5 utilise une version récente de path-to-regexp où "/*" est invalide.
// Une regex est un catch-all équivalent, sans parsing par path-to-regexp.
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname + "/dist/assignment-app/browser/index.html"));
});
// Start the app by listening on the default Heroku port, display message in console

app.listen(process.env.PORT || 8081, () => {
  console.log(`Serveur front-end démarré sur le port ${process.env.PORT || 8081}`);
});
