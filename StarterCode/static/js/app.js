//on load, the page will load the drop down
d3.select(window).on("load", loadDropDown);
//function to load the dropdown data
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
d3.select('#selDataset').on('change', removePrevData);

function removePrevData(){
d3.event.preventDefault();
    d3.select("#sample-metadata")
            .selectAll('p')
            .remove()
    
 updateInfo();
}

function updateInfo(){
    //preventing from not reloading
    
    d3.json("samples.json").then((importedData) => {
        //grabbing the data to load
        var data = importedData;
        //grabbing what the user selected
        var dropdown = d3.select('#selDataset');
        var dropdownValue = dropdown.property('value');

        console.log(dropdownValue)
        
            //saving the info of the patitents
        var metadataArr = data.metadata;
            // saving the samples of the data
        var samples = data.samples;
    
            //Now to fill the demographic data
            data_info = []
            var data_info = metadataArr.filter(function(d){
                if (d.id === parseInt(dropdownValue)){
                    return d
                };
            });
    
            
            //since it was in an array getting the actual values
            var tab_info = Object.values(data_info[0]);
            //not setting it as key value pairs and getting string of info
            var display_tab_info = [
                `id: ${tab_info[0]}`,
                `ethnicity: ${tab_info[1]}`,
                `gender: ${tab_info[2]}`,
                `age: ${tab_info[3]}`,
                `location: ${tab_info[4]}`,
                `bbttype: ${tab_info[5]}`,
                `wfreq: ${tab_info[6]}`
            ]
            //displaying the string of info onto table
            d3.select("#sample-metadata")
            .selectAll('p')
            .data(display_tab_info)
            .enter()
            .append('p')
            .text(function (data) {
                return data;
            });

        sample_info = []
        var sample_info = samples.filter(function(d){
            if (d.id === dropdownValue){
                return d
            };
        });

        

        //get the data into an array
        var sample_arr_info = sample_info[0];
        
        //we will need to sort to get top 10, however since data is split into 3 arrays, we will need to put it all together then sort
        var otu_list_ids = Object.values(sample_arr_info)[1];
        var sample_val = Object.values(sample_arr_info)[2];
        var otu_labels = Object.values(sample_arr_info)[3];
        var len_list = otu_list_ids.length;

        var otu_list = [];
        //looping through to get all data into the list
        for(var j = 0; j < len_list; j++){
          otu_list.push({ 'otu_ids': otu_list_ids[j],'sample_values': sample_val[j], 'otu_labels': otu_labels[j]})
        };

        sort_out_list = otu_list;
        
        // Sort the samples in descending order of sample values
        sort_out_list.sort((a, b) => b.sample_values - a.sample_values);

        // To retrieve the first 10 items
        var top10Samples = sort_out_list;
        top10Samples = sort_out_list.slice(0, 10);
        
        
        // Reverse the array due to Plotly's defaults
        top10Samples = top10Samples.reverse();
        console.log(top10Samples);
        // Trace1 for the otu Data
        var trace1 = {
            x: top10Samples.map(row => row.sample_values),
            y: top10Samples.map(row => `OTU ${row.otu_ids}`),
            text: top10Samples.map(row => row.otu_labels),
            type: "bar",
            orientation: "h"
        };

        // data
        var chartData = [trace1];

        // Apply the group bar mode to the layout
        var layout = {
            title: "Top 10 OTUs",
            margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
            }
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", chartData, layout);

        // Create a bubble chart that displays each sample.
        var trace2 = {
            x: otu_list.map(row => row.otu_ids),
            y: otu_list.map(row => row.sample_values),
            text: otu_list.map(row => row.otu_labels),
            mode: 'markers',
            marker: {
              size: otu_list.map(row => row.sample_values),
              color: otu_list.map(row => row.otu_ids),
              type: "scatter",
            }
          };
          var data_b = [trace2];
          var config = { responsive: true };
          var layout_b = {
            xaxis: { title: 'OTU ID' }
          };
          
          Plotly.newPlot('bubble', data_b, layout_b);

          //BONUS

          //attempting gauge
          var data_g = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: tab_info[6],
              title: { text: "Belly Button Washing Frequency" },
              labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "6-7","7-8","8-9"],
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                steps: [
                  { range: [0, 1], color: "rgb(255, 255, 255)"},
                  { range: [1, 2], color: "gray" },
                  { range: [2, 3], color: "gray" },
                  { range: [3, 4], color: "gray" },
                  { range: [4, 5], color: "gray" },
                  { range: [5, 6], color: "gray" },
                  { range: [6, 7], color: "gray" },
                  { range: [7, 8], color: "gray" },
                  { range: [8, 9], color: "gray" }
                ],
              }
            }
          ];
          
          var layout_g = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', data_g, layout_g);
          

        });
    
}






