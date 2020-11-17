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
        
        // Sort the samples in descending order of sample values
        otu_list.sort((a, b) => b.sample_values - a.sample_values);

        // To retrieve the first 10 items
        var top10SelSamples = otu_list.slice(0, 10);
        console.log(top10SelSamples);




        });
    
}






