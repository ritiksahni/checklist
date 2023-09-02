/* 

Example Checklist Object:

{
    'read a book': true, // true = check
    'clean room': false // false = uncheck
}
*/

class Checklist {
    addItem(item) {
        window.localStorage.setItem(item, false);
        refreshChecklist();
    }

    checkItem(item) {
        window.localStorage.setItem(item, true);
    }

    uncheckItem(item) {
        window.localStorage.setItem(item, false);
    }

    readItems() {
        const items = [];

        // Iterate over the keys in localStorage and push their values into the 'items' array
        // Iterate over the keys in localStorage
        Object.keys(window.localStorage).forEach((key) => {
            const value = window.localStorage.getItem(key);
            items.push({ key, value }); // Push both key and value as an object
        });

        return items; // Return the array of items
    }
}

const defaultChecklist = new Checklist();

// DOM Manipulation

// add-item button handler
function addHandler() {
    const data = prompt("Write details of checklist item");
    defaultChecklist.addItem(data);
}

function clearList() {
    window.localStorage.clear();
    refreshChecklist();
}

const checklistDiv = document.getElementById("checklist");
const data = defaultChecklist.readItems();

// Function to refresh and display the checklist from localStorage
function refreshChecklist() {
    const checklistDiv = document.getElementById("checklist");
    checklistDiv.innerHTML = ""; // Clear the existing checklist

    const data = defaultChecklist.readItems();

    data.forEach((item) => {
        const listItem = document.createElement("li");

        // Create a checkbox input element
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.value === "true"; // Set the checkbox state based on key.value

        // Create a label for the checkbox displaying the key
        const label = document.createElement("label");
        label.innerText = item.key;

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        checklistDiv.appendChild(listItem);
    });
}
