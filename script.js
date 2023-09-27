// Load lesson configuration
let getSnippet = fetch("config.json")
  .then(function(res) {
    return res.text();
  })
  .then(function(text) {
    let config = JSON.parse(text);
    loadConfig(config);
    return fetch(config.predict.snippetPath);
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
    makeList.insertBefore(item, makeList.firstChild)
  })
};

function loadSnippet(snippet) {
  let snippetContainer = document.querySelector("#predict .snippet");
  snippetContainer.innerHTML = snippet;
  // Regex from https://stackoverflow.com/questions/8488729/how-to-count-the-number-of-lines-of-a-string-in-javascript
  const lineCount = (snippet.match(/\n/g) || '').length + 1   
  // Padding to include around snippet, in heightUnit
  const containerPadding = 4;
  const heightUnit = "em";
  snippetContainer.style.height = `${lineCount + containerPadding}${heightUnit}`;
}

function toggleClass(selector, classname) {
  let el = document.querySelector(selector);
  el.classList.contains(classname) ? el.classList.remove(classname) : el.classList.add(classname);
}