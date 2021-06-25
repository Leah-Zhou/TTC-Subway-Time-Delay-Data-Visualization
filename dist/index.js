"use strict";

//get dom 
var $form = document.getElementById("form-option");
var $monthsOptions = document.getElementById("months-options");
var $checkBtn = document.getElementById("btn-check");
var $morningBtn = document.getElementById("morning-btn");
var $noonBtn = document.getElementById("noon-btn");
var $afternoonBtn = document.getElementById("afternoon-btn");
var $nightBtn = document.getElementById("night-btn");
var $midnightBtn = document.getElementById("midnight-btn");
var startBtn = document.querySelectorAll('.generate-graph');
var closeBtn = document.querySelector('.form-close');
var viewBtn = document.querySelector('.view-more');
var optGroup = document.querySelector('.all-btn');
var form = document.querySelector('.form');
var home = document.querySelector('.header');
var graphSection = document.querySelector('.graph-section');
startBtn.forEach(function (btn) {
  btn.addEventListener('click', function () {
    form.classList.toggle('show-form');
  });
});
closeBtn.addEventListener('click', function () {
  form.classList.toggle('show-form');
});
viewBtn.addEventListener('click', function () {
  optGroup.style.display = "flex";
});
optGroup.addEventListener('click', function (e) {
  if (e.target.classList.contains('time-opt')) {
    var prevActive = document.querySelector('.active-opt');

    if (prevActive != null) {
      prevActive.classList.remove('active-opt');
    }

    e.target.classList.add('active-opt');
  }
});

var illustrationAnimate = function illustrationAnimate() {
  var tl = gsap.timeline();
  tl.from('.title', {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "back.out(1)"
  }, "<").from('.btn-start', {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "back.out(1)"
  }, "-=0.5").from('#subway', {
    x: -1000,
    duration: 1,
    ease: "back.out(1.75)"
  }).fromTo('#holder-left', {
    rotate: -2
  }, {
    rotate: 6,
    duration: 1.5,
    repeat: -1,
    ease: "power2.in",
    yoyo: true
  }).fromTo('#holder-right', {
    rotate: -2
  }, {
    rotate: 5,
    duration: 1.5,
    repeat: -1,
    ease: "power2.in",
    yoyo: true
  }, "<");
};

illustrationAnimate(); //load months in the options

var months = ["January", "February", "March", "April", "May"]; //load each option

var loadOptions = function loadOptions(op) {
  return "<option>".concat(op, "</option>");
}; //print all options


var printOptions = function printOptions() {
  $monthsOptions.innerHTML = months.map(loadOptions);
}; //call the funcitons


printOptions(); //grapping data in month

var grapData = function grapData(dataset) {
  var newData = dataset.filter(function (arr) {
    return arr.minDelay !== 0;
  });
  var quantities = newData.length;
  var height = 1300;
  var width = 2500;
  var topBottomPadding = 200;
  var leftRightPadding = 60;
  var canvas = d3.select("#time-line");
  canvas.selectAll("line").remove();
  canvas.selectAll("g").remove();
  canvas.selectAll("line").data(newData).enter().append("line").attr("x1", function (num, i) {
    return newData[i].timeInHrs * (width / 24) + leftRightPadding;
  }).attr("y1", height + topBottomPadding).attr("x2", function (num, i) {
    return newData[i].timeInHrs * (width / 24) + leftRightPadding;
  }) // delay time in hour
  .attr("y2", function (num, i) {
    return height - newData[i].minDelay * (height / d3.max(newData, function (obj) {
      return obj.minDelay;
    })) + topBottomPadding;
  }) //how long it delay in mins
  .attr("stroke-width", 1.5).attr("stroke", function (num, i) {
    return newData[i].color;
  }); //y-axis for the time-line of the delay mins

  var maxMins = d3.max(newData, function (obj) {
    return obj.minDelay;
  });
  var minMins = d3.min(newData, function (obj) {
    return obj.minDelay;
  });
  var minsRange = d3.extent(newData, function (obj) {
    return obj.minDelay;
  });
  console.log(maxMins);
  var yAxis = d3.scaleLinear().domain([0, maxMins]).range([height + topBottomPadding, topBottomPadding]);
  var yScale = d3.axisLeft().scale(yAxis).ticks(5);
  canvas.append("g").attr("transform", "translate(60,0)").attr("stroke", "white").classed("axis-color", true).call(yScale); //x-axis for the time-line of hours

  /**
   * ?is it any better way to code the hours time line instead of using scaleLinear? how dose the sacleTime() work?
   */

  /**
   * ?any way to adjust the thiness and the color of the ticks?
   */

  var maxHrs = d3.max(newData, function (obj) {
    return obj.timeInHrs;
  });
  var minHrs = d3.min(newData, function (obj) {
    return obj.timeInHrs;
  });
  var hrsRange = d3.extent(newData, function (obj) {
    return obj.timeInHrs;
  });
  console.log(hrsRange);
  var xAxis = d3.scaleLinear().domain(hrsRange).range([leftRightPadding, width + leftRightPadding]);
  var xScale = d3.axisBottom().scale(xAxis).ticks(maxHrs);
  canvas.append("g").attr("transform", "translate(0,1500)").attr("stroke", "white").classed("axis-color", true).call(xScale);
  canvas.append("text").attr("x", "1250").attr("y", "1580").text("Time Slot").classed("axis-color", true);
  canvas.append("text").attr("x", "80").attr("y", "200").text("Delay Minutes").classed("axis-color", true);
};

$form.addEventListener("submit", function (event) {
  event.preventDefault(); //     gsap.to('.home', {y:-1000, opacity:0, display:none, duration:2});

  home.classList.add("move-home");
  form.classList.toggle('show-form');
  graphSection.classList.add('show-graph');
  var input = $form.options.value;
  console.log(input);
  var url = "data/".concat(input, ".json");
  d3.json(url).then(function (dataset) {
    grapData(dataset);
    var morningData = dataset.filter(function (obj) {
      return obj.timeInHrs <= 11 && obj.timeInHrs >= 5;
    });
    var noonData = dataset.filter(function (obj) {
      return obj.timeInHrs > 11 && obj.timeInHrs <= 15;
    });
    var afternoonData = dataset.filter(function (obj) {
      return obj.timeInHrs > 15 && obj.timeInHrs <= 19;
    });
    var nightData = dataset.filter(function (obj) {
      return obj.timeInHrs > 19 && obj.timeInHrs <= 24;
    });
    var midnightData = dataset.filter(function (obj) {
      return obj.timeInHrs > 0 && obj.timeInHrs < 5;
    });
    $morningBtn.addEventListener("click", function (event) {
      event.preventDefault();
      grapData(morningData);
    });
    $noonBtn.addEventListener("click", function (event) {
      event.preventDefault();
      grapData(noonData);
    });
    $afternoonBtn.addEventListener("click", function (event) {
      event.preventDefault();
      grapData(afternoonData);
    });
    $nightBtn.addEventListener("click", function (event) {
      event.preventDefault();
      grapData(nightData);
    });
    $midnightBtn.addEventListener("click", function (event) {
      event.preventDefault();
      grapData(midnightData);
    }); // narrow down the data from original data
    // dataset = dataset.filter(delay => delay.minDelay > 0 && delay.minDelay < 20).slice(0, 100);
  });
});