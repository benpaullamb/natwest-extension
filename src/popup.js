const insertButton = document.querySelector('#submit');
const passInput = document.querySelector('#pass');

passInput.addEventListener('keyup', ({ key }) => {
  if (key.toLowerCase() === 'enter') {
    sendCredsToPage();
  }
});

insertButton.addEventListener('click', sendCredsToPage);

function sendCredsToPage() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const pin = document.querySelector('#pin').value;
    const password = document.querySelector('#pass').value;

    chrome.tabs.sendMessage(tabs[0].id, { pin, password });
  });
}

chrome.runtime.onMessage.addListener((req) => {
  if (req.message === 'close') {
    window.close();
  }
});
