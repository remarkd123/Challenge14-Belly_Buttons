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

// Fetch new data each time a new sample is selected
function optionChanged(newsample) {
buildCharts(newsample);
buildMetadata(newsample);
}

// Create the Demographics / Metadata Panel    ++++++++++++++++++
function buildMetadata(sample) {
d3.json(url).then((data) => {
	// get all metadata
	let metadata = data.metadata;

	// Filter the data for the sampleObj with the desired sample number
	let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

	// get the first result
	let result = resultArray[0];

	// Use `.html("") to clear any existing metadata
	d3.select("#sample-metadata").html("");

	// Use `Object.entries` to add each key-value pair to the panel
	// need to use d3 to append new tags for each k-v in the metadata.
	Object.entries(result).forEach(([key, value]) => {
		d3.select("#sample-metadata")
			.append("h6")
			.text(`${key.toUpperCase()}: ${value}`);
	});
});
}


// Create the buildCharts function.   +++++++++++++++++++++++++++
function buildCharts(sample) {

	// -----------------------------------------  Get Data
	// Use d3.json to load and retrieve data 
	d3.json(url).then((data) => {
	
		// Create a variable that holds the samples array. 
		let samples = data.samples;
	
		// filter sampleObj for the desired sample number.
		let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
	
		// grab the metadata array for the desired sample Obj.
		let metadata = data.metadata;
		let metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);
	
		// get the first sample in the array.
		let result = resultArray[0]; 
	
		// Create a variable that holds the first sample in the metadata array.
		let metaresults = metadataArray[0];
	
		// get the otu_ids, otu_labels, and sample_values.
		let otu_ids = result.otu_ids;
		let otu_labels = result.otu_labels;
		let sample_values = result.sample_values;
	
		// (For Bonus) Create a variable that holds the washing frequency.
		let washing_frequency = metaresults.wfreq;
	
		//  ----------------------------------------------- Bar Chart
		// Create the yticks for the bar chart. Hint: Get the the top 10 otu_ids and map them in 
		// descending order so the otu_ids with the most bacteria are last. 
		let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

		// Create the trace for the bar chart. 
		let barData = [
		{
			y: yticks,
			x: sample_values.slice(0, 10).reverse(),
			text: otu_labels.slice(0, 10).reverse(),
			type: "bar",
			orientation: "h",
		} 
		];
	
		// Create the layout for the bar chart. 
		let barLayout = {
			width: 500, height: 500,
			title: "Top 10 Bacteria Cultures",
			margin: { t: 30, l: 150 }   
		};
	
		// Use Plotly to plot the data with the layout. 
		Plotly.newPlot("bar", barData, barLayout); 

		//  ----------------------------------------------- 2: Bubble Chart
		// Create the trace for the bubble chart.
		// Use otu_ids for the x values.
		// Use sample_values for the y values.
		// Use sample_values for the marker size.
		// Use otu_ids for the marker colors.
		// Use otu_labels for the text values.
		let bubbleData = [
		{
			x: otu_ids,
			y: sample_values,
			text: otu_labels,
			mode: "markers",
			marker: {
				size: sample_values,
				color: otu_ids,
				colorscale: "Navy"
			}
		}
		];
		// Create the layout for the bubble chart.
		let bubbleLayout = {
			title: "Bacteria Cultures Per Sample",
			margin: { t: 30 },
			hovermode: "closest",
			xaxis: { title: "OTU ID" },
			margin: { t: 30} 
		};  
		// Use Plotly to plot the data with the layout.
		Plotly.newPlot("bubble", bubbleData, bubbleLayout);

		//  -----------------------------------------------  3: Gauge Chart
		// Create the trace for the gauge chart.
		let gaugeData = [{
		domain: { x: [0, 1], y: [0, 1] },
		value: washing_frequency,
		type: "indicator",
		mode: "gauge+number",
		title: { text: "<b> Belly Button Washing Frequency</b> <br> # of Scrubs per Week" },
		gauge: {
			axis: { range: [null, 10], tickwidth: 2, tickcolor: "black" },
			bar: { color: "blue" },
			steps: [
			{ range: [0, 2], color: "red" },
			{ range: [2, 4], color: "orange" },
			{ range: [4, 6], color: "yellow" },
			{ range: [6, 8], color: "lightgreen" },
			{ range: [8, 10], color: "green" }
			],
			threshold: {
			value: washing_frequency,
			}
			},
		}];
		
		// Create the layout for the gauge chart.
		let gaugeLayout = { 
		width: 600, height: 500, margin: { t: 0, b: 0 },
		font: { color: "black"}
		};
		
		// Use Plotly to plot the gauge data and layout.
		Plotly.newPlot("gauge", gaugeData, gaugeLayout);
	});
}