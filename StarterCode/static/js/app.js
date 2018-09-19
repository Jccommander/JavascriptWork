// from data.js
var tableData = data;

// Start by displaying all data in the HTML table

// Select the HTML table body and appending table rows for each item in the dataset

var tbody = d3.select("tbody");

data.forEach((alien) => {
    var row = tbody.append("tr");
    Object.entries(alien).forEach(([key,value]) => {
        var cell = row.append("td");
        cell.text(value);
    })
});

var button = d3.select("#filter-btn");

function dateUpdater() {

    // Prevent refresh and delete the tbody so a new one can be appended in its place
    d3.event.preventDefault();
    tbody.remove();

    // Retrieve the input
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
    console.log(inputValue);

    // Filter through the data using the inputed date
    filteredData = data.filter(alien => alien.date === inputValue);
    console.log(filteredData);

    // Rebuild the tbody
    var table = d3.select("#ufo-table");
    var tbody = table.append("tbody");

    // Use filtered data to repopulate the tbody
    filteredData.forEach((alien) => {
        var row = tbody.append("tr");
        Object.entries(alien).forEach(([key,value]) => {
            var cell = row.append("td");
            cell.text(value);
        })
    });
};

// Create an event listener to detect filter button click, then call the dateUpdater function
button.on("click", function() {

    // Prevent refresh and delete the tbody so a new one can be appended in its place
    d3.event.preventDefault();
    var tbody = d3.select("tbody");
    tbody.remove();

    // Retrieve the input
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
    console.log(inputValue);

    // Filter through the data using the inputed date
    filteredData = data.filter(alien => alien.datetime === inputValue);
    console.log(filteredData);

    // Rebuild the tbody
    var table = d3.select("#ufo-table");
    var newtbody = table.append("tbody");

    // Use filtered data to repopulate the tbody
    filteredData.forEach((alien) => {
        var row = newtbody.append("tr");
        Object.entries(alien).forEach(([key,value]) => {
            var cell = row.append("td");
            cell.text(value);
        })
    });
});