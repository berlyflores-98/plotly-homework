
d3.json("samples.json").then((importedData) => {
    // console.log(importedData);
   //var data = importedData;
    var data = importedData;

    var dropDown = data.names;

    console.log(dropDown);

    d3.select("#selDataset")
        .selectAll("option")
        .data(dropDown)
        .enter()
        .append("option")
        .attr("value", function(option) { return option.value; })
        .text(function(option) { return option.text; });
});

//var selectDropDown = 




