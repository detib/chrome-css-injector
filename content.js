// content.js
const url = window.location.hostname;

// Retrieve saved CSS rules for the current URL
chrome.storage.local.get([url], function (result) {
  const cssRules = result[url];
  if (cssRules) {
    console.log(`Found existing rules for ${url}: \n ${cssRules}`);
    
    const style = document.createElement('style'); 
    style.textContent = cssRules;
    document.head.appendChild(style);
    console.log('Injected existing rules');
  }
});
