function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var dataArray = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filterArray = dataArray.filter(sampleObj => sampleObj.id == sample);
    console.log(filterArray);
    // 5. Create a variable that holds the first sample in the array.
    var samples = filterArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = samples.otu_ids;
    var otu_labels = samples.otu_labels;
    var sample_values = samples.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    // Using the slice() method and map() and reverse() functions, retrieve the top 10 otu_ids and sort them in descending order.
    var yticks = otu_ids.slice(0,10).map(otu_ID => `OTU ${otuID}`).reverse();
    console.log(yticks)
    //var  = otu_ids_sorted.slice(0,10);
    
    

    // 8. Create the trace for the bar chart. 
    var barData = [{
        x: sample_values.slice(0,10).reverse(),
        y: yticks,
        text: otu_labels.slice(0,10).reverse(),
        orientation: 'h',
        type: 'bar'
      }];
    //];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
        margin: {t:40 , l:160},
        title: "Top 10 Bacteria Cultures Found"
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Bubble Chart
// function init() {
//     // Grab a reference to the dropdown select element
//     var selector = d3.select("#selDataset");
  
//     // Use the list of sample names to populate the select options
//     d3.json("samples.json").then((data) => {
//       var sampleNames = data.names;
  
//       sampleNames.forEach((sample) => {
//         selector
//           .append("option")
//           .text(sample)
//           .property("value", sample);
//       });
  
//       // Use the first sample from the list to build the initial plots
//       var firstSample = sampleNames[0];
//       buildCharts(firstSample);
//       buildMetadata(firstSample);
//     });
//   }
  
//   // Initialize the dashboard
//   init();
  
//   function optionChanged(newSample) {
//     // Fetch new data each time a new sample is selected
//     buildMetadata(newSample);
//     buildCharts(newSample);
    
//   }
  
//   // Demographics Panel 
//   function buildMetadata(sample) {
//     d3.json("samples.json").then((data) => {
//       var metadata = data.metadata;
//       // Filter the data for the object with the desired sample number
//       var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
//       var result = resultArray[0];
//       // Use d3 to select the panel with id of `#sample-metadata`
//       var PANEL = d3.select("#sample-metadata");
  
//       // Use `.html("") to clear any existing metadata
//       PANEL.html("");
  
//       // Use `Object.entries` to add each key and value pair to the panel
//       // Hint: Inside the loop, you will need to use d3 to append new
//       // tags for each key-value in the metadata.
//       Object.entries(result).forEach(([key, value]) => {
//         PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
//       });
  
//     });
//   }
  
//   // Bar and Bubble charts
//   // Create the buildCharts function.
//   function buildCharts(sample) {
//     // Use d3.json to load and retrieve the samples.json file 
//     d3.json("samples.json").then((data) => {
//       // Create a variable that holds the samples array. 
  
//       // Create a variable that filters the samples for the object with the desired sample number.
  
//       // Create a variable that holds the first sample in the array.
  
  
//       // Create variables that hold the otu_ids, otu_labels, and sample_values.
  
  
//       // Create the yticks for the bar chart.
//       // Hint: Get the the top 10 otu_ids and map them in descending order  
//       // so the otu_ids with the most bacteria are last. 
//       var trace1 = {
//         x: [1, 2, 3, 4],
//         y: [10, 11, 12, 13],
//         mode: 'markers',
//         marker: {
//           size: [40, 60, 80, 100]
//         }
//       };
      
//       var data = [trace1];
      
//       var layout = {
//         title: 'Marker Size',
//         showlegend: false,
//         height: 600,
//         width: 600
//       };
      
//       Plotly.newPlot('myDiv', data, layout);
      
//       var yticks = 
  
//       // Create the trace for the bar chart. 
//       var barData = [
        
//       ];
//       // Create the layout for the bar chart. 
//       var barLayout = {
       
//       };
//       // Use Plotly to plot the data with the layout. 
  
//       // 1. Create the trace for the bubble chart.
//       var bubbleData = [
     
//       ];
  
//       // 2. Create the layout for the bubble chart.
//       var bubbleLayout = {
        
//       };
  
//       // 3. Use Plotly to plot the data with the layout.
      
//     });
//   }

// Gauge Chart
// function init() {
//     // Grab a reference to the dropdown select element
//     var selector = d3.select("#selDataset");
  
//     // Use the list of sample names to populate the select options
//     d3.json("samples.json").then((data) => {
//       var sampleNames = data.names;
  
//       sampleNames.forEach((sample) => {
//         selector
//           .append("option")
//           .text(sample)
//           .property("value", sample);
//       });
  
//       // Use the first sample from the list to build the initial plots
//       var firstSample = sampleNames[0];
//       buildCharts(firstSample);
//       buildMetadata(firstSample);
//     });
//   }
  
//   // Initialize the dashboard
//   init();
  
//   function optionChanged(newSample) {
//     // Fetch new data each time a new sample is selected
//     buildMetadata(newSample);
//     buildCharts(newSample);
    
//   }
  
//   // Demographics Panel 
//   function buildMetadata(sample) {
//     d3.json("samples.json").then((data) => {
//       var metadata = data.metadata;
//       // Filter the data for the object with the desired sample number
//       var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
//       var result = resultArray[0];
     
//       // Use d3 to select the panel with id of `#sample-metadata`
//       var PANEL = d3.select("#sample-metadata");
  
//       // Use `.html("") to clear any existing metadata
//       PANEL.html("");
  
//       // Use `Object.entries` to add each key and value pair to the panel
//       // Hint: Inside the loop, you will need to use d3 to append new
//       // tags for each key-value in the metadata.
//       Object.entries(result).forEach(([key, value]) => {
//         PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
//       });
  
//     });
//   }
  
//   // Create the buildChart function.
//   function buildCharts(sample) {
//     // Use d3.json to load the samples.json file 
//     d3.json("samples.json").then((data) => {
//       console.log(data);
  
//       // Create a variable that holds the samples array. 
  
//       // Create a variable that filters the samples for the object with the desired sample number.
  
//       // 1. Create a variable that filters the metadata array for the object with the desired sample number.
  
//       // Create a variable that holds the first sample in the array.
    
  
//       // 2. Create a variable that holds the first sample in the metadata array.
      
  
//       // Create variables that hold the otu_ids, otu_labels, and sample_values.
  
  
//       // 3. Create a variable that holds the washing frequency.
     
  
//       // Create the yticks for the bar chart.
//       // Hint: Get the the top 10 otu_ids and map them in descending order 
//       // so the otu_ids with the most bacteria are last. 
  
//       var data = [
//         {
//           domain: { x: [0, 1], y: [0, 1] },
//           value: 270,
//           title: { text: "Speed" },
//           type: "indicator",
//           mode: "gauge+number"
//         }
//       ];
      
//       var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//       Plotly.newPlot('myDiv', data, layout);
      
//       var yticks = 
  
//       // Create the trace for the bar chart. 
//       var barData = [
        
//       ];
//       // Create the layout for the bar chart. 
//       var barLayout = {
        
//       };
  
//       // Use Plotly to plot the data with the layout. 
  
//       // Create the trace for the bubble chart.
//       var bubbleData = [
     
//       ];
  
//       // Create the layout for the bubble chart.
//       var bubbleLayout = {
        
//       };
  
//       // D2: 3. Use Plotly to plot the data with the layout.
     
      
//       // 4. Create the trace for the gauge chart.
//       var gaugeData = [
       
//       ];
      
//       // 5. Create the layout for the gauge chart.
//       var gaugeLayout = { 
       
//       };
  
//       // 6. Use Plotly to plot the gauge data and layout.
      
//     });
//   }