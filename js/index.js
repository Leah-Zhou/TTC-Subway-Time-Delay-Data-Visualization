//load months in the options
const months =[`January`,`February`,`March`,`April`,`May`]
 
const $form = document.getElementById(`form-in-months`)
const $monthsOptions = document.getElementById(`months-options`)
const $checkBtn = document.getElementById(`btn-check`)


const loadOptions = (op)=>{
  return  `<option>${op}</option>`
}

const printOptions =()=>{
$monthsOptions.innerHTML =months.map(loadOptions)
}

printOptions();





//grapping data in month
const grapData =(dataset)=>{


  const newData = dataset.filter(arr=>arr.minDelay!==0)
  const quantities = newData.length;
  const height = 1300;
  const width =2500;
  const topBottomPadding = 200;
  const leftRightPadding=60;
  const canvas = d3.select(`#time-line`)
  canvas.selectAll(`line`)
        .remove();
  canvas.selectAll(`g`)
        .remove()

  canvas.selectAll(`line`)
        .data(newData)
        .enter()
        .append(`line`)
        .attr(`x1`,(num,i)=>newData[i].timeInHrs*(width/24)+leftRightPadding)
        .attr(`y1`,height+topBottomPadding)
        .attr(`x2`,(num,i)=>newData[i].timeInHrs*(width/24)+leftRightPadding) // delay time in hour
        .attr(`y2`,(num,i)=>height-newData[i].minDelay*(height/d3.max(newData,obj=>obj.minDelay))+topBottomPadding) //how long it delay in mins
        .attr(`stroke-width`,1.5)
        .attr(`stroke`,(num,i)=>newData[i].color)
  
  //y-axis for the time-line of the delay mins
  
  const maxMins = d3.max(newData,obj=>obj.minDelay)
  const minMins = d3.min(newData,obj=>obj.minDelay)
  const minsRange =d3.extent(newData,obj=>obj.minDelay)
  
  console.log(maxMins)
  
   var yAxis = d3.scaleLinear()
                 .domain(minsRange)
                 .range([height+topBottomPadding,topBottomPadding])
  
   const yScale= d3.axisLeft()
                  .scale(yAxis)
                   .ticks(10)
                  
  
    canvas.append(`g`)
           .attr(`transform`,`translate(60,0)`)
           .attr(`stroke`,`white`)
           .classed(`axis-color`,true)
           .call(yScale)
         
           
  
  //x-axis for the time-line of hours
  /**
   * ?is it any better way to code the hours time line instead of using scaleLinear? how dose the sacleTime() work?
   */

   /**
    * ?any way to adjust the thiness and the color of the ticks?
    */
  const maxHrs = d3.max(newData,obj=>obj.timeInHrs)
  const minHrs = d3.min(newData,obj=>obj.timeInHrs)
  const hrsRange = d3.extent(newData,obj=>obj.timeInHrs)
  
  console.log(hrsRange)
  
  var xAxis =  d3.scaleLinear()
                 .domain([0,24])
                 .range([leftRightPadding,width+leftRightPadding])
                
   const xScale = d3.axisBottom()
                    .scale(xAxis)
                    .ticks(24)
                  
  
  
  canvas.append(`g`)
        .attr(`transform`,`translate(0,1500)`)
        .attr(`stroke`,`white`)
        .classed(`axis-color`,true)
        .call(xScale)
   
  
  
  canvas.append(`text`)
        .attr(`x`,`1250`)
        .attr(`y`,`1580`)
        .text(`Time in Hour`)
        .classed(`axis-color`,true)
     
  canvas.append(`text`)
        .attr(`x`,`80`)
        .attr(`y`,`200`)
        .text(`Minutes`)
        .classed(`axis-color`,true)
}


 $checkBtn.addEventListener(`click`,event=>{
   event.preventDefault();

  const input = $form.options.value;
  console.log(input)
  const url = `data/${input}.json`

 d3.json(url).then(dataset=>{
   
   grapData(dataset)


 // narrow down the data from original data
// dataset = dataset.filter(delay => delay.minDelay > 0 && delay.minDelay < 20).slice(0, 100);

 }) 
 })





