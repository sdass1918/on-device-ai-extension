chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SHOW_RESULT") {
    displayPopup(request.payload.title, request.payload.text);
  } else if (request.type === "SHOW_ERROR") {
    displayPopup("Error", request.payload, true);
  }
});

function displayPopup(title, text, isError = false) {
  const oldPopup = document.getElementById('adept-ai-popup');
  if (oldPopup) {
    oldPopup.remove();
  }

  const popup = document.createElement('div');
  popup.id = 'adept-ai-popup';

  const header = document.createElement('div');
  header.id = 'adept-ai-header';
  header.innerText = title; 

  const closeButton = document.createElement('button');
  closeButton.id = 'adept-ai-close';
  closeButton.innerText = '×'; 
  closeButton.onclick = () => popup.remove();

  const content = document.createElement('div');
  content.id = 'adept-ai-content';
  content.innerText = text;

  if (isError) {
    content.style.color = 'red';
  }

  header.appendChild(closeButton);
  popup.appendChild(header);
  popup.appendChild(content);

  document.body.appendChild(popup);
}
