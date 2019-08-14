d3.json(`data/trandata.json`).then(dataset=>{
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

  setWidth=1600, 
  setHeight= 2000;
  let quantities = newData.length;


   


 d3.select(`#time-line`)
 .selectAll(`line`)
 .data(newData)
 .enter()
 .append(`line`)
 .attr(`x1`,(num,i)=>newData[i].timeInHrs*100)
 .attr(`y1`,800)
 .attr(`x2`,(num,i)=>newData[i].timeInHrs*100) // delay time in hour
 .attr(`y2`,(num,i)=>800-newData[i].minDelay*5) //how long it delay in mins
 .attr(`stroke-width`,1.5)
 .attr(`stroke`,(num,i)=>newData[i].color)







/**
 * ? how to draw the axis base on data?
 */

// var width = 400, height = 100;

// var data = [10, 15, 20, 25, 30];
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
  //  d3.select(`#time-line`)
  //  .selectAll(`circle`)
  //  .data(newData)
  //  .enter()
  //  .append(`circle`)
  //  .attr(`cx`,(num,i)=>newData[i].timeInHrs*1000)
  //  .attr(`cy`,900)
  //  .attr(`r`,(num,i)=>newData[i].minDelay*10)
  //  .attr(`fill`,(num,i)=>newData[i].color)
  //  .attr(`stroke`,`black`)
})