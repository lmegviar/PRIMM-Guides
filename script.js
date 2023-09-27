// Load lesson configuration
// Determine which lesson to show based on query param
const urlParams = new URLSearchParams(window.location.search);
const folder = urlParams.get('topic') || "example";

let getSnippet = fetch(`${folder}/config.json`)
  .then(function(res) {
    return res.text();
  })
  .then(function(text) {
    let config = JSON.parse(text);
    loadConfig(config);
    return fetch(`${folder}/${config.predict.snippetPath}`);
  })
  .then(function(res) {
    return res.text();
  })
  .then(function(snippet) {
    loadSnippet(snippet);
  });

function loadConfig(config) {
  // Load embedded Replit environments
  let primmRepl = document.querySelector("#run .repl iframe");
  let makeRepl = document.querySelector("#make .repl iframe");
  primmRepl.src = config.primmEmbedLink;
  makeRepl.src = config.makeEmbedLink;
  
  // Add open in new tab links for these environments
  let primmAnchor = document.querySelector("#run .repl a");
  let makeAnchor = document.querySelector("#make .repl a");
  primmAnchor.href = config.primmEmbedLink;
  makeAnchor.href = config.makeEmbedLink;
  
  // Add Predict file name
  let fileName = document.querySelector("#file-name");
  fileName.innerHTML = config.predict.fileDisplayName;

  // Add topic
  let topic = document.querySelector("#topic h2");
  topic.innerHTML = config.topic;

  // Add Make requirements
  let makeList = document.querySelector("#make ul");
  // Add explicit requirements before generic requirement, in the order they appear in the list
  let reqs = config.make.requirements.reverse().forEach((req) => {
    let item = document.createElement("li");
    item.innerHTML = req;
    makeList.insertBefore(item, makeList.firstChild);
  })
};

function loadSnippet(snippet) {
  let snippetContainer = document.querySelector("#predict .snippet");
  snippetContainer.innerHTML = snippet;
  // Update container height to fit code snippet
  // Regex from https://stackoverflow.com/questions/8488729/how-to-count-the-number-of-lines-of-a-string-in-javascript
  const lineCount = (snippet.match(/\n/g) || '').length + 1   ;
  const lineHeight = 1.6;
  snippetContainer.style.height = `${(lineCount * lineHeight)}em`;
}

function removeClass(selector, classname) {
  let el = document.querySelector(selector);
  if (el.classList.contains(classname)) {
    el.classList.remove(classname);
  }
}