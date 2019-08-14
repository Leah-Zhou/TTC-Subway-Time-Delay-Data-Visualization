d3.json(`data/maydata.json`).then(dataset=>{
  // narrow down the data from original data
  // dataset = dataset.filter(delay => delay.minDelay > 0 && delay.minDelay < 20).slice(0, 100);
  console.log(dataset)
  
  //yu Yellow
  //bd Green
  //SHP purple
  //SRT blue

  console.log(dataset[0].Time)
  console.log(dataset[45].minDelay)
  
  const newData = dataset.filter(arr=>arr.minDelay!==0)
   console.log(newData)
   console.log(newData[12].timeInHrs)


  let quantities = newData.length;

const height = 1300
const width =2500
   


  d3.select(`#time-line`)
  .selectAll(`line`)
  .data(newData)
  .enter()
  .append(`line`)
  .attr(`x1`,(num,i)=>newData[i].timeInHrs*(width/24)+40)
  .attr(`y1`,height)
  .attr(`x2`,(num,i)=>newData[i].timeInHrs*(width/24)+40) // delay time in hour
  .attr(`y2`,(num,i)=>height-newData[i].minDelay*(height/d3.max(newData,obj=>obj.minDelay))) //how long it delay in mins
  .attr(`stroke-width`,1.5)
  .attr(`stroke`,(num,i)=>newData[i].color)







/**
 * ? how to draw the axis base on data?
 */



const maxMins = d3.max(newData,obj=>obj.minDelay)
const minMins = d3.min(newData,obj=>obj.minDelay)
const minsRange =d3.extent(newData,obj=>obj.minDelay)

console.log(maxMins)

 var yAxis = d3.scaleLinear()
               .domain(minsRange)
               .range([height,0])
 const yScale= d3.axisLeft()
                .scale(yAxis)
                 .ticks(10)

 d3.select(`#time-line`)
  .append(`g`)
  .attr(`transform`,`translate(60,0)`)
  .attr(`stroke`,`white`)
  .classed(`axis-color`,true)
  // .attr(`stroke-width`,1)

   .call(yScale)















    // var svg = d3.select("body")
//             .append("svg")
//             .attr("width", width)
//             .attr("height", height);

// var scale = d3.scaleLinear()
//               .domain([d3.min(data), d3.max(data)])
//               .range([height/2, 0]);

// var y_axis = d3.axisLeft()
//               .scale(scale);

// svg.append("g")
//    .attr("transform", "translate(50, 10)")
//    .call(y_axis);
 


    
 // drawing data in circles
    // d3.select(`#time-line`)
    // .selectAll(`circle`)
    // .data(newData)
    // .enter()
    // .append(`circle`)
    // .attr(`cx`,(num,i)=>newData[i].timeInHrs*(width/24))
    // .attr(`cy`,(num,i)=>height-newData[i].minDelay*(height/d3.max(newData,obj=>obj.minDelay))/2)
    // .attr(`r`,(num,i)=>newData[i].minDelay*5)
    // .attr(`fill`,(num,i)=>newData[i].color)
    // .attr(`stroke`,`black`)


})


