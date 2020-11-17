
d3.json("samples.json").then((importedData) => {
    //importing the data from JSON format
    var data = importedData;
    //saving the names for the dropdown
    var dropDown = data.names;
    //saving the info of the patitents
    var metadata = data.metadata;
    // saving the samples of the data
    var samples = data.samples;


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






