const button = document.querySelector(".button");
const circle = document.querySelector(".circle");

let buttonOn = false;

// Retrieve saved state when the popup loads
chrome.storage.local.get(["buttonOn"], (result) => {
  buttonOn = result.buttonOn || false; // Default to false if no value is found
  updateButtonAppearance();
});

button.addEventListener("click", async () => { // Note for myself: () means function takes no parameters. "async" lets you use the keyword "await"
  try {
    // Query all tabs across all windows, Retrieves all tabs
    const tabs = await chrome.tabs.query({});

    buttonOn = !buttonOn;

    // Make sure the button's position is saved
    chrome.storage.local.set({ buttonOn });

    if (buttonOn) {
      circle.style.animation = "moveCircleRight 1s forwards";
      button.style.animation = "backgroundYellow 1s forwards";
    } else {
      circle.style.animation = "moveCircleLeft 1s forwards";
      button.style.animation = "backgroundBlue 1s forwards";
    }

    // Loops through each tab to ensure each one is changed properly
    for (const tab of tabs) {
      // Checks if the URL is allowed
      if (isUrlAllowed(tab.url)) {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: [buttonOn ? "appOn.js" : "appOff.js"], // Load appOn.js if buttonOn is true, otherwise appOff.js
        });
      } else {
        console.log(`Lumina Switch cannot toggle themes on this page: ${tab.url}`);
      }
    }
  } catch (error) {
    console.error('Script injection failed:', error);
    alert('An error occurred while toggling the theme.');
  }
});

// Function to update button appearance
function updateButtonAppearance() {
  if (buttonOn) {
    circle.style.animation = "moveCircleRight 1s forwards";
    button.style.animation = "backgroundYellow 1s forwards";
  } else {
    circle.style.animation = "moveCircleLeft 1s forwards";
    button.style.animation = "backgroundBlue 1s forwards";
  }
}

// Check if the URL is allowed
function isUrlAllowed(url) {
  const disallowedProtocols = ['chrome:', 'about:', 'edge:', 'moz-extension:', 'chrome-extension:', 'view-source:'];
  return !disallowedProtocols.some(protocol => url.startsWith(protocol)) && !url.includes('chrome.google.com/webstore');
}
