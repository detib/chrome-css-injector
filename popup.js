document.addEventListener('DOMContentLoaded', function () {
  const cssRulesInput = document.getElementById('cssRulesInput');
  const injectButton = document.getElementById('injectButton');

  // Load saved CSS rules for the active tab's URL when the popup opens
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    const absolutePath = new URL(activeTab.url);
    const url = absolutePath.hostname;

    chrome.storage.local.get([url], function (result) {
      if (result[url]) {
        cssRulesInput.value = result[url];
      }
    });
  });

  injectButton.addEventListener('click', function () {
    const cssRules = cssRulesInput.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      const absolutePath = new URL(activeTab.url);
      const url = absolutePath.hostname;

      // Save the CSS rules to storage for the specific URL
      const data = {};
      data[url] = cssRules;
      chrome.storage.local.set(data);

      // Inject the CSS rules into the active tab
      chrome.tabs.insertCSS(activeTab.id, {
        code: cssRules,
      });
    });
  });
});
