const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Elon Musk',
    'Jeff Bezos',
    'Bernard Arnault',
    'Bill Gates',
    'Warren Buffett',
    'Larry Page',
    'Sergey Brin',
    'Steve Ballmer',
    'Larry Ellison',
    'Gautam Adani',
];

// Store list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into the DOM
function createList() {
    [...richestPeople]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a,b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${person}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);
            draggableList.appendChild(listItem);
        });

        addEventListeners();
}

function dragStart() {
    // console.log('dragstart');
    dragStartIndex = Number(this.closest('li').getAttribute('data-index'));
}

function dragEnter() {
    // console.log('dragenter');
    this.classList.add('over');
}

function dragLeave() {
    // console.log('dragleave');
    this.classList.remove('over');
}

function dragOver(e) {
    // console.log('dragover');
    e.preventDefault();
}

function dragDrop() {
    // console.log('drop');
    const dragEndIndex = Number(this.getAttribute('data-index'));
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}