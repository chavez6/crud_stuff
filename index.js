document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

const addStuffButton = document.querySelector('#add--stuff')

addStuffButton.onclick = function(){
    const nameInput = document.querySelector('#name--input')
    const spentInput = document.querySelector('#spent--input')

        const name = nameInput.value;
        const spent = spentInput.value;
        nameInput.value = "";
        spentInput.value = "";

        fetch('http://localhost:5000/insert', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name : name, spent : spent })
        })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']))
}

function insertRowIntoTable(data){
    const table = document.querySelector('table tbody');
    const isThereTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    // TODO: ->  spent string loads 
    // in as a rounded number but 
    // when new string submitted it 
    // is decimal (need to fix)

    for(var key in data){
        if (data.hasOwnProperty(key)){
            if (key === 'date'){
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete--row" data-id=${data.id}>delete</td>`;
    tableHtml += `<td><button class="edit--row" data-id=${data.id}>edit</td>`;

    tableHtml += "</tr>";

    if (isThereTableData){
        table.innerHTML = tableHtml;
    }else{
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data){
    const table = document.querySelector('table tbody');

    if (data.length === 0){
        table.innerHTML = "<tr><td class='no--data' colspan='5'>no data</td></tr>";
    }
    let tableHtml = "";

    data.forEach(function ({ id, name, spent, date }){
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${spent.toLocaleString()}</td>`;
        tableHtml += `<td>${new Date(date).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete--row" data-id=${id}>delete</td>`;
        tableHtml += `<td><button class="edit--row" data-id=${id}>edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}