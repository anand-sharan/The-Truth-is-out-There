// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Console.log the ufo data from data.js
console.table(tableData);

// Create a function to title case the City data and Shape data
function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
}).join(' ');
}

// Create a function to remove non ascii letters from string
function removeNonAscii(str) {
    if ((str===null) || (str===''))
        return false;
    else str = str.toString();
        return str.replace(/[^\x20-\x7E]/g, '');
}

// Format date to YYYY-MM-DD format
//function formatDate(date) {
//  date = new Date(date);

//  var day = ('0' + date.getDate()).slice(-2);
//  var month = ('0' + (date.getMonth() + 1)).slice(-2);
//  var year = date.getFullYear();

//  return year + '-' + month + '-' + day;
//}

// Function to create table
function buildTable(data) {

    // Clear existing data on the table
    tbody.html("");

    // Load UFO Sighting data onto the Web page using D3
    data.forEach((dataRow) => {
        // Append Table Row `tr` to the Table Body `tbody`
        var row = tbody.append("tr");

        // Format city, state, country and shape
        // dataRow.datetime = formatDate(Date.parse(dataRow.datetime));
        dataRow.city = titleCase(dataRow.city);
        dataRow.state = dataRow.state.toUpperCase();
        dataRow.country = dataRow.country.toUpperCase();
        dataRow.shape = titleCase(dataRow.shape);
        //dataRow.comments = removeNonAscii(dataRow.comments);

        // `Object.values` & `forEach` to Iterate Through Values
        Object.entries(dataRow).forEach(([key, value]) => {
            // Append a Cell to the Row for each value
            var cell = row.append("td");
            //    console.log(value);
            cell.html(value);
        });
    });
}

// Event that Triggers a Function When the Button is Clicked
function handleClick(){
    // Prevents the Page from Refreshing
    d3.event.preventDefault();
    // Select HTML Input Element & Get the Value Property of that Input Element
    var date = d3.select("#datetime").property("value");
    var filterData = tableData;

    // Check if a Date was Entered & Filter Data Using that Date;
    if(date) {
        // Apply Filter to the Table Data to Only Keep Rows Where datetime Value Matches the Filter Value
        filterData = filterData.filter((row) => row.datetime === date);

        
    }
    // Build Table with Filtered Data
    buildTable(filterData);
    
}
// `on` Function to attach an Event to the Handler Function
d3.selectAll("#filter-btn").on("click", handleClick);
// Build Table with data.js 
buildTable(tableData);


