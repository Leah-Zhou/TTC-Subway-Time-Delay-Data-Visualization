d3.json(`data/data.json`).then(dataset=>{
  console.log(dataset)
  //YU Yellow
  //BD Green
  //SHP purple
  //SRT blue

  console.log(dataset[0].Time)
  console.log(dataset[45].minDelay)
  
  const newData = dataset.filter(arr=>arr.minDelay!==0)
  console.log(newData[29])

  setWidth=1600, 
  setHeight= 2000;
  let quantities = newData.length;
  




d3.select(`#time-line`)
.selectAll(`line`)
.data(newData)
.enter()
.append(`line`)
.attr(`x1`,0)
.attr(`y1`,(num,i)=>i*10)
.attr(`x2`,(num,i)=>newData[i].minDelay*10)
.attr(`y2`,(num,i)=>i*10)
.attr(`stroke-width`,0.7)
.attr(`stroke`,(num,i)=>newData[i].color)


  // for(i=0;i<dataset.lenght;i++){
  //   if(dataset[i].Line=='BD'){
  //     d3.select(`svg`)
  //     .append(`line`)
  //     .attr(`color`, green)
  //     .attr(`x1`,)
  //   }
  // }
   
  // setWidth=400, 
  // setHeight= 100;

  // const svg = d3.select(`section`)
  // .append(`svg`)
  // .attr(`width`,setWidth)
  // .attr(`height`,setHeight)
  
   
  // let xscale = d3.scaleLinear()
  //                .domain([0,i=>dataset[i].Time])
  //                .range([0,])
                

})