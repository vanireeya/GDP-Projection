import React, { Component } from "react";
import axios from "axios";
import * as d3 from "d3";
import "../assets/styles/graph.css";
import { TRILLION, URL } from '../constants/iconstants';


class Holder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: false
    };
  }
  componentDidMount() {

    axios
      .get(URL)
      .then(response => {
        this.setState({
          data: response.data[1]
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  render() {

    if (this.state.error)
      return (<div id="chart"> Oops!! Unable to fetch data </div>)




    let rawData = this.state.data;
    let values = [];
    rawData.map(d => {
      if (d.value != null) {
        values.push({
          date: d.date,
          value: (parseInt(d.value) / TRILLION).toString()
        });

      }

    });


    let data = [
      {
        name: "USA",
        values
      }
    ];

    let width = 700;
    let height = 300;
    let margin = 50;
    let duration = 250;

    let lineOpacity = "0.25";
    let lineOpacityHover = "0.85";
    let otherLinesOpacityHover = "0.1";
    let lineStroke = "1.5px";
    let lineStrokeHover = "2.5px";

    let circleOpacity = "0.85";
    let circleOpacityOnLineHover = "0.25";
    let circleRadius = 4;
    let circleRadiusHover = 6;

    /* Formatting Data */
    let parseDate = d3.timeParse("%Y");
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
      });
    });

    /* Adding Scale */
    let xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, d => d.date))
      .range([0, width - margin]);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data[0].values, d => d.value)])
      .range([height - margin, 0]);

    let color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Adding SVG */
    let svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin + "px")
      .attr("height", height + margin + "px")
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    /* Adding line into SVG */
    let line = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));

    let lines = svg.append("g").attr("class", "lines");

    lines
      .selectAll(".line-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "line-group")
      .on("mouseover", function (d, i) {
        svg
          .append("text")
          .attr("class", "title-text")
          .style("fill", color(3))
          .text(`${d.name}'s increasing trend`)
          .attr("text-anchor", "middle")
          .attr("x", (width - margin) / 2)
          .attr("y", 90);
      })
      .on("mouseout", function (d) {
        svg.select(".title-text").remove();
      })
      .append("path")
      .attr("class", "line")
      .attr("d", d => line(d.values))
      .style("stroke", (d, i) => color(3))
      .style("opacity", lineOpacity)
      .on("mouseover", function (d) {
        d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
        d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
        d3.select(this)
          .style("opacity", lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
      .on("mouseout", function (d) {
        d3.selectAll(".line").style("opacity", lineOpacity);
        d3.selectAll(".circle").style("opacity", circleOpacity);
        d3.select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });

    /* Add circles in the line */
    lines
      .selectAll("circle-group")
      .data(data)
      .enter()
      .append("g")
      .style("fill", (d, i) => color(i))
      .selectAll("circle")
      .data(d => d.values)
      .enter()
      .append("g")
      .attr("class", "circle")
      .on("mouseover", function (d) {
        d3.select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .style("fill", (d, i) => color(3))
          .text(`${d.value}`)
          .attr("x", d => xScale(d.date) + 5)
          .attr("y", d => yScale(d.value) - 10);
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .style("cursor", "none")
          .transition()
          .duration(duration)
          .selectAll(".text")
          .remove();
      })
      .append("circle")
      .attr("cx", d => xScale(d.date))
      .attr("cy", d => yScale(d.value))
      .attr("r", circleRadius)
      .style("opacity", circleOpacity)
      .on("mouseover", function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadius);
      });

    /* Add Axis into SVG */
    let xAxis = d3.axisBottom(xScale).ticks(15);
    let yAxis = d3.axisLeft(yScale).ticks(10);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(360)");

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", 300)
      .attr("y", height - 6)
      .text("Years");

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("GDP of USA (in trillion $)");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr(
        "y",
        yScale(
          d3.max(data, function (d) {
            return d.value;
          })
        ) - 20
      )
      .style("text-anchor", "middle")
      .text("GDP Graph");

    return <div id="chart" />;
  }
}

export default Holder;
