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
}