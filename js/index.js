//load months in the options
const months =[`January`,`February`,`March`,`April`,`May`]

 
//get dom 
const $form = document.getElementById(`form-option`)
const $monthsOptions = document.getElementById(`months-options`)
const $checkBtn = document.getElementById(`btn-check`)
const $morningBtn =document.getElementById(`morning-btn`)
const $noonBtn =document.getElementById(`noon-btn`)
const $afternoonBtn =document.getElementById(`afternoon-btn`)
const $nightBtn =document.getElementById(`night-btn`)
const $midnightBtn =document.getElementById(`midnight-btn`)

//load each option
const loadOptions = (op)=>{
  return  `<option>${op}</option>`
}

//print all options
const printOptions =()=>{
$monthsOptions.innerHTML =months.map(loadOptions)
}


//call the funcitons
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
                 .domain([0,maxMins])
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
                 .domain(hrsRange)
                 .range([leftRightPadding,width+leftRightPadding])
                
   const xScale = d3.axisBottom()
                    .scale(xAxis)
                    .ticks(maxHrs)
                  
  
  
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

    $morningBtn.classList.remove(`color`)
    $noonBtn.classList.remove(`color`)
    $afternoonBtn.classList.remove(`color`)
    $nightBtn.classList.remove(`color`)
    $midnightBtn.classList.remove(`color`)


  const input = $form.options.value;
  console.log(input)
  const url = `data/${input}.json`

 d3.json(url).then(dataset=>{
   
   grapData(dataset)

   const morningData = dataset.filter(obj=>obj.timeInHrs<=11 && obj.timeInHrs>=5);
    const noonData =dataset.filter(obj=>obj.timeInHrs>11 && obj.timeInHrs<=15);
    const afternoonData =dataset.filter(obj=>obj.timeInHrs>15 && obj.timeInHrs<=19);
    const nightData =dataset.filter(obj=>obj.timeInHrs>19 && obj.timeInHrs<=24);
    const midnightData =dataset.filter(obj=>obj.timeInHrs>0 && obj.timeInHrs<5);
    


   $morningBtn.addEventListener(`click`,event=>{
     event.preventDefault(); 
     grapData(morningData)
     $morningBtn.classList.add(`color`)
     $noonBtn.classList.remove(`color`)
     $afternoonBtn.classList.remove(`color`)
     $nightBtn.classList.remove(`color`)
     $midnightBtn.classList.remove(`color`)
    })

    $noonBtn.addEventListener(`click`,event=>{
      event.preventDefault();
      grapData(noonData)
      $noonBtn.classList.add(`color`)
      $morningBtn.classList.remove(`color`)
      $afternoonBtn.classList.remove(`color`)
      $nightBtn.classList.remove(`color`)
      $midnightBtn.classList.remove(`color`)
     })

     $afternoonBtn.addEventListener(`click`,event=>{
      event.preventDefault();
      grapData(afternoonData)
      $afternoonBtn.classList.add(`color`)
      $morningBtn.classList.remove(`color`)
      $noonBtn.classList.remove(`color`)
      $nightBtn.classList.remove(`color`)
      $midnightBtn.classList.remove(`color`)
     })   
     
     $nightBtn.addEventListener(`click`,event=>{
      event.preventDefault();
      grapData(nightData)
      $nightBtn.classList.add(`color`)
      $noonBtn.classList.remove(`color`)
      $afternoonBtn.classList.remove(`color`)
      $morningBtn.classList.remove(`color`)
      $midnightBtn.classList.remove(`color`)
     })  

     $midnightBtn.addEventListener(`click`,event=>{
      event.preventDefault();
      grapData(midnightData)
      $midnightBtn.classList.add(`color`)
      $noonBtn.classList.remove(`color`)
      $afternoonBtn.classList.remove(`color`)
      $nightBtn.classList.remove(`color`)
      $morningBtn.classList.remove(`color`)
     })  

 // narrow down the data from original data
// dataset = dataset.filter(delay => delay.minDelay > 0 && delay.minDelay < 20).slice(0, 100);

 }) 
 })



