import { jsonData } from './ranks.js';
console.log("Here1");
function fixJsonFormat(fakeJsonData) {
    // Convert the object to a string first
    let jsonString = JSON.stringify(fakeJsonData, (key, value) => {
        // For each key, add quotes if not already present
        if (typeof key === 'string' && key !== '') {
            return value;
        }
        return value;
    });

    // Add quotes around keys (if not already added by stringify)
    jsonString = jsonString.replace(/(\w+)\s*:/g, '"$1":');

    // Return the parsed JSON object
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error('Error parsing JSON:', e);
        return null;
    }
}


const finalData = fixJsonFormat(jsonData);

// Sort function
function sortDataByCRL(sheet) {
    return sheet.sort((a, b) => {
        if (a.CRL === 0) return 1; // Place entries with CRL = 0 at the end
        if (b.CRL === 0) return -1; // Place entries with CRL = 0 at the end
        return a.CRL - b.CRL; // Regular ascending sort otherwise
    });
}
console.log("Here2");
// Function to create a table and display the data
function createTable(sheetName, sortedData) {
    const table = document.createElement('table');

    // Create table header
    const headerRow = document.createElement('tr');
    ['Rank', 'Name', 'DTU Roll No', 'CRL', 'EWS', 'OBC', 'SC', 'ST'].forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create table rows for each entry
    sortedData.forEach((entry, rank) => {
        const row = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = rank+1;
        row.appendChild(td);
        Object.values(entry).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    // Add the table to the data-container
    const container = document.getElementById('data-container');
    const sheetTitle = document.createElement('h2');
    sheetTitle.textContent = sheetName;
    container.appendChild(sheetTitle);
    container.appendChild(table);
}
console.log("Here3");

Object.keys(finalData).forEach(sheetName => {
    const sortedData = sortDataByCRL(finalData[sheetName]);
    createTable(sheetName, sortedData);
});

console.log("Here4");