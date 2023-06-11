const sourceContainer = document.getElementById('sourceContainer');
const targetContainer = document.getElementById('targetContainer');
const resetButton = document.querySelector('button');

sourceContainer.addEventListener('dragstart', dragStart);
targetContainer.addEventListener('dragover', dragOver);
targetContainer.addEventListener('drop', drop);
resetButton.addEventListener('click', resetContainers);

function dragStart(event) {
  const imgElement = event.target.querySelector('img');
  if (imgElement && imgElement.getAttribute('src')) {
    const imageUrl = imgElement.getAttribute('src');
    event.dataTransfer.setData('text/plain', imageUrl);
    event.target.style.opacity = '0.5';
  }
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();

  const imageUrl = event.dataTransfer.getData('text/plain');

  const newItem = document.createElement('div');
  newItem.className = 'item';
  const newImage = document.createElement('img');
  newImage.src = imageUrl;
  newImage.alt = 'Dropped Image';
  newItem.appendChild(newImage);
  targetContainer.appendChild(newItem);

  const successMessage = document.createElement('p');
  successMessage.className = 'success-message';
  successMessage.innerText = 'Image dropped successfully!';
  targetContainer.appendChild(successMessage);

  const draggedItem = sourceContainer.querySelector(`div.item img[src="${imageUrl}"]`);
  if (draggedItem && draggedItem.closest('.item')) {
    draggedItem.closest('.item').style.opacity = '1';
  }
}

function resetContainers() {
  targetContainer.innerHTML = '';

  const items = sourceContainer.querySelectorAll('.item');
  items.forEach(item => {
    item.style.opacity = '1';
  });
}