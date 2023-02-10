// Setting url for the dataset
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


function init() {
	// Grab a reference to the dropdown select element
	let selection = d3.select("#selDataset");

	// Use the list of sample names to populate the select options
	d3.json(url).then((data) => {
		let sampleNames = data.names;
		sampleNames.forEach((sample) => {
			selection
				.append("option")
				.text(sample)
				.property("value", sample);
		});

	// Use the first sample from the list to build the initial plots
	let defaultSample = sampleNames[0];
	buildCharts(defaultSample);
	buildMetadata(defaultSample);
	});
}

// Initialize the dashboard
init();

// Grab a reference to the dropdown select element

// Use the list of sample names to populate the select options

// Use the first sample from the list to build the initial plots

// Initialize the dashboard


// Fetch new data each time a new sample is selected


// Demographics Panel 

// Filter the data for the object with the desired sample number

// Use d3 to select the panel with id of `#sample-metadata`


// Use `.html("") to clear any existing metadata

// Use `Object.entries` to add each key and value pair to the panel
// Hint: Inside the loop, you will need to use d3 to append new
// tags for each key-value in the metadata.



// Bar Graph 

// 1. Create the buildCharts function.

// 2. Use d3.json to load and retrieve the samples.json file 

// 3. Create a variable that holds the samples array. 

// 4. Create a variable that filters the samples for the object with the desired sample number.

// DEV3-QUEST1: Create a variable that filters the metadata array for the object with the desired sample number.

// 5. Create a variable that holds the first sample in the array.

// DEV3-QUEST2: Create a variable that holds the first sample in the metadata array.

// 6. Create variables that hold the otu_ids, otu_labels, and sample_values.

// DEV3-QUEST3: Create a variable that holds the washing frequency.

// 7. Create the yticks for the bar chart. Hint: Get the the top 10 otu_ids and map them in descending order so the otu_ids with the most bacteria are last. 

// 8. Create the trace for the bar chart. 

// 9. Create the layout for the bar chart. 

// 10. Use Plotly to plot the data with the layout. 



// Bar and Bubble Charts 

// 1. Create the trace for the bubble chart.

// 2. Create the layout for the bubble chart.

// 3. Use Plotly to plot the data with the layout.

// Gauge Chart 

// 4. Create the trace for the gauge chart.

// 5. Create the layout for the gauge chart.

// 6. Use Plotly to plot the gauge data and layout.
