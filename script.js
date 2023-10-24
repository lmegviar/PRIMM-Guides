// To Do - add syntax highlighting for predict
// https://stackoverflow.com/questions/54277438/how-to-connect-prism-js-to-textarea

/* Load lesson configuration */

// Determine which lesson to show based on query param
const urlParams = new URLSearchParams(window.location.search);
const folder = `templates/${urlParams.get('topic') || "example"}`;

let getSnippet = fetch(`${folder}/config.json`)
  .then(function(res) {
    return res.text();
  })
  .then(function(text) {
    let config = JSON.parse(text);
    loadConfig(config);
  });

function loadConfig(config) {
  console.log(`Loading ${config.topic}: `, config);
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

  loadSnippets(config);
  
  // Add topic
  let topic = document.querySelector("#topic h2");
  topic.innerHTML = config.topic;

  // Add Make requirements or skip
  if (config.make.skip) {
    document.querySelector("#make").innerHTML = "No make this time!";
    
  } else {
    let makeList = document.querySelector("#make ul");
    // Add explicit requirements before generic requirement, in the order they appear in the list
    let reqs = config.make.requirements.reverse().forEach((req) => {
      let item = document.createElement("li");
      item.innerHTML = req;
      makeList.insertBefore(item, makeList.firstChild);
    })
  }
};

function loadSnippets(config) {
  // To Do: Make the order of snippets rendered match order in configuration array
  let snippets = config.predict.snippets;
  snippets.forEach(function(snippet) {
    fetch(`${folder}/${snippet.path}`)
    .then(function(res) {
      return res.text();
    })
    .then(function(snippetText) {
      loadSnippet(snippet.displayName, snippetText);
    });
  })
};

function loadSnippet(fileName, snippet) {
  // SNIPPET_LINE_HEIGHT should match line height in #predict textarea.snippet
  const SNIPPET_LINE_HEIGHT = 2.5;
  let predictSection = document.querySelector("#predict");
  // Copy the snippet container template
  let snippetTemplate = predictSection.querySelector("#snippet-template");
  /* TO DO: Check for browser compatibility with template elements
  See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template */
  let snippetContainer = snippetTemplate.content.cloneNode(true);
  // // Add line numbers to snippet 
  // let lineNumber = 1;
  // snippet = snippet.replace(/^/gm, () => `${lineNumber++}.  `);
  // Set snippet text
  let snippetTextArea = snippetContainer.querySelector("textarea");
  snippetTextArea.innerHTML = snippet;
  // Set the file name text
  let snippetTab = snippetContainer.querySelector(".snippet-tab");
  snippetTab.innerHTML = fileName;
  // Update container height to fit code snippet
  // Regex from https://stackoverflow.com/questions/8488729/how-to-count-the-number-of-lines-of-a-string-in-javascript
  const lineCount = (snippet.match(/\n/g) || '').length + 1   ;
  const lineHeight = SNIPPET_LINE_HEIGHT;
  snippetTextArea.style.height = `${(lineCount * lineHeight)}em`;
  //Add snippet element to section
  predictSection.appendChild(snippetContainer);
}

function removeClass(selector, classname) {
  let el = document.querySelector(selector);
  if (el.classList.contains(classname)) {
    el.classList.remove(classname);
  }
}