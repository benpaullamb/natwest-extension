chrome.runtime.onMessage.addListener((req) => {
  const pinIndexes = getRequiredCharacters('Pin');
  populateCharacters('Pin', req.pin, pinIndexes);

  const passIndexes = getRequiredCharacters('Password');
  populateCharacters('Password', req.password, passIndexes);

  chrome.runtime.sendMessage({ message: 'close' });
});

function getRequiredCharacters(inputType) {
  const labels = getAllNodes(`#${inputType}Wrapper label`);

  return labels.map((label) => {
    const num = label.textContent.match(/(\d+)\D+/)[1];
    return Number(num) - 1;
  });
}

function populateCharacters(inputType, credential, indexes) {
  const inputs = getAllNodes(`#${inputType}Wrapper input`);

  inputs.forEach((input, i) => {
    input.value = credential[indexes[i]];
  });
}

function getAllNodes(query) {
  const { body } = window.frames[0].document;
  const nodes = body.querySelectorAll(query);
  return Array.from(nodes);
}
