//on load, the page will load the drop down
d3.select(window).on("load", loadDropDown);
//function to load the data
function loadDropDown(){
d3.json("samples.json").then((importedData) => {
    //importing the data from JSON format
    var data = importedData;
    //saving the names for the dropdown
    var dropDown = data.names;
    
    console.log(dropDown);
    // populate drop-down
    d3.select("#selDataset")
        .selectAll("option")
        .data(dropDown)
        .enter()
        .append("option")
        .attr("value", function (data, index) {
            return data;
        })
        .text(function (data, index) {
            return data;
        });

    });
};

//when the dropdown changes load the information
d3.select('#selDataset').on('change', updateInfo);

function updateInfo(){
    //preventing from not reloading
    d3.event.preventDefault();
    //grabbing the data to load
    //grabbing what the user selected
    var dropdown = d3.select('#selDataset');
    var dropdownValue = dropdown.property('value');
    console.log(dropdownValue)
    d3.json("samples.json").then((importedData) => {
        //importing the data from JSON format
        var data = importedData;
        //saving the info of the patitents
        var metadata = data.metadata;
        // saving the samples of the data
        var samples = data.samples;

        //Now to fill the demographic data
        data_info = []
        var data_info = metadata.filter(function(d){
            if d.id === dropdownValue{
                return d
            };
        });

        console.log(data_info)


    });

}






