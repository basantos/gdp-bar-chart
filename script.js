document.addEventListener('DOMContentLoaded', () => {

    req = new XMLHttpRequest();
    req.open('GET','https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
    req.send();
    req.onload = () => {
        dataset = JSON.parse(req.responseText).data;

        // Create chart
        const w = 900;
        const h = 500;
        const padding = 50;

        const xScale = d3.scaleTime()
            .domain([d3.min(dataset, d => new Date(d[0])), d3.max(dataset, d => new Date(d[0]))])
            .range([padding, w - padding]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, d => d[1])])
            .range([h-padding, padding]);

        const svg = d3.select('div')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

        svg.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('x', (d,i) => xScale(new Date(d[0])))
            .attr('y', (d,i) => yScale(d[1]))
            .attr('width', 2)
            .attr('height', d => d[1]/45)
            .attr('class', 'bar')
            .attr('data-date', d => d[0])
            .attr('data-gdp', d => d[1])
            .append('title')
            .attr('id','tooltip')
            .attr('data-date',  d => d[0])
            .text(d => 'Date: ' + new Date(d[0]).toLocaleDateString() + '\nGDP: ' + d[1] + ' Billion USD');

        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat('%Y'));

        svg.append('g')
            .attr('transform', 'translate(0,' +(h-padding) + ')')
            .attr('id', 'x-axis')
            .call(xAxis);

        const yAxis = d3.axisLeft(yScale);

        svg.append('g')
            .attr('transform', 'translate(' + padding + ',0)')
            .attr('id', 'y-axis')
            .call(yAxis);

        
    }

});

