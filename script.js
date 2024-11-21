// Section 2: The Connection Between GHGs and Climate Change
// Create a line chart for CO2 levels and global temperatures

const co2Data = [
    { year: 1980, co2: 338, temperature: 0.1 },
    { year: 1990, co2: 354, temperature: 0.3 },
    { year: 2000, co2: 369, temperature: 0.5 },
    { year: 2010, co2: 390, temperature: 0.7 },
    { year: 2020, co2: 414, temperature: 1.0 },
  ];
  
  // Set dimensions and margins
  const margin = { top: 20, right: 30, bottom: 50, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  // Create SVG container
  const svgClimate = d3.select("#co2-temperature-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  // Set scales
  const x = d3.scaleLinear()
    .domain(d3.extent(co2Data, d => d.year))
    .range([0, width]);
  
  const y1 = d3.scaleLinear()
    .domain([d3.min(co2Data, d => d.co2), d3.max(co2Data, d => d.co2)])
    .range([height, 0]);
  
  const y2 = d3.scaleLinear()
    .domain([d3.min(co2Data, d => d.temperature), d3.max(co2Data, d => d.temperature)])
    .range([height, 0]);
  
  // Add axes
  svgClimate.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));
  
  svgClimate.append("g")
    .call(d3.axisLeft(y1));
  
  svgClimate.append("g")
    .attr("transform", `translate(${width}, 0)`)
    .call(d3.axisRight(y2));
  
  // Add CO2 line
  svgClimate.append("path")
    .datum(co2Data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(d => x(d.year))
      .y(d => y1(d.co2))
    );
  
  // Add temperature line
  svgClimate.append("path")
    .datum(co2Data)
    .attr("fill", "none")
    .attr("stroke", "tomato")
    .attr("stroke-width", 2)
    .style("stroke-dasharray", "5,5")
    .attr("d", d3.line()
      .x(d => x(d.year))
      .y(d => y2(d.temperature))
    );
  
  // Add labels
  svgClimate.append("text")
    .attr("x", -margin.left)
    .attr("y", -10)
    .attr("text-anchor", "end")
    .style("font-size", "12px")
    .text("CO₂ Levels (ppm)");
  
  svgClimate.append("text")
    .attr("x", width + margin.right)
    .attr("y", -10)
    .attr("text-anchor", "end")
    .style("font-size", "12px")
    .text("Temperature Anomaly (°C)");
  