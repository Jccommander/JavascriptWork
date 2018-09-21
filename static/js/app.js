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

// Create variables to hold filtered data outside of function

var filterHolder = undefined;
var buttonPushed = false;

// Save the select tag so that its value can be called later

var selector = d3.select("#filterSelect");

// Create filter button that reads the current selection value and uses it to filter the appropriate
// data

var button = d3.select("#filter-btn");

button.on("click", function() {
    d3.event.preventDefault();

    // Get selector's current value on click
    var selValue = selector.node().value;

    // Delete the existing tbody
    var tbody = d3.select("tbody");
    tbody.remove();

    // Retrieve the input
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
    console.log(inputValue);

    // Check to see if the user has already pushed the button once; if not, use standard dataset
    // If so, use the already filtered data in order to stack filter options
    if (buttonPushed === true) {
        var funcData = filterHolder;
    } else {
        var funcData = data;
    };

    // Use the retrieved selector value to determine which filter should be used
    switch (selValue) {
        case "datetime":
            filteredData = funcData.filter(alien => alien.datetime === inputValue);
            console.log(filteredData);
            break;
        case "city":
            filteredData = funcData.filter(alien => alien.city === inputValue);
            console.log(filteredData);
            break;
        case "state":
            filteredData = funcData.filter(alien => alien.state === inputValue);
            console.log(filteredData);
            break;
        case "country":
            filteredData = funcData.filter(alien => alien.country === inputValue);
            console.log(filteredData);
            break;
        case "shape":
            filteredData = funcData.filter(alien => alien.shape === inputValue);
            console.log(filteredData);
            break;
        default:
            console.log("Failed to retrieve appropriate selector value");
            break;
    }

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
    })

    // Create if statement that detects if the filtered data is empty, and alerts the user that no results
    // for their filter search were returned
    if (filteredData == "") {
        d3.select("table")
            .append("h1")
            .text("Sorry, No results matching your query were found")
    }
    
    // Put the filtered data into the filterHolder variable to save it in case of multiple filter options
    // being used by the user
    filterHolder = filteredData;

    // Set the boolean buttonPushed to true
    buttonPushed = true;

    // Create p tag under filter box to display to user all filter options they have currently selected
    var filterStorage = d3.select(".filter_storage");

    filterStorage.append("p")
        .html(`<strong>${selValue}</strong>: ${inputValue}`)

});