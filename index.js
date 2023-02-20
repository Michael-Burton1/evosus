//API CALLS
async function getUSPopulation(){
  const res = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
  const data = await res.json();
  return data
}
async function getStatePopulation(){
  const res = await fetch('https://datausa.io/api/data?drilldowns=State&measures=Population')
  const data = await res.json();
  return data
}

//create state buttons
function createStateButtons(){
    const statebtns = statesArray.map(state => '<button id="' + state + '-btn" class="btn" value="'+ state + '" onclick="handleClick(this.value)">' + state + '</button>').join('');
    const myBtnContainer = document.querySelector('.btnContainer');
    myBtnContainer.innerHTML = statebtns;
  }

  function removeItemOnce(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  } 
//  function createRows(arr) {
//   arr.forEach(element =>)
//  }

const graphedStates =[]
function handleClick(buttonValue) {
  if (!graphedStates.includes(buttonValue)){
    graphedStates.push(buttonValue);
    drawLineColors();
  } else {

    removeItemOnce(graphedStates, buttonValue);
    drawLineColors();
  }
}

createStateButtons();

//Display charts
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawLineColors);

async function drawLineColors() {

  let res = await getUSPopulation();
  let usPopulationData = res.data;
  let usYearsNeeded = usPopulationData.filter((item => item.Year < 2020 && item.Year > 2012))

  let stateResults = await getStatePopulation();
  let statePopulationData = stateResults.data;
  

  const chosenStatesYearsNeeded = [];
  graphedStates.forEach(stateName => {
    let currentState = statePopulationData.filter((item => item.State === stateName));
    let currentStateYearsNeeded = currentState.filter((item => item.Year < 2020 && item.Year > 2012));
    chosenStatesYearsNeeded.push(currentStateYearsNeeded);
  });

  let statePopulationArray = [];
  
  for (let i = 0; i < chosenStatesYearsNeeded.length; i++) {
    let chosenStateYearsNeeded = chosenStatesYearsNeeded[i];
    for (let j=chosenStateYearsNeeded.length-1; j>=0 ; j--) {
      if (i === 0) {
        let singleYearAndData = [];
        singleYearAndData.push(chosenStateYearsNeeded[j].Year);
        singleYearAndData.push(chosenStateYearsNeeded[j].Population);
        statePopulationArray.push(singleYearAndData)
      } else {
        statePopulationArray[j].push(chosenStateYearsNeeded[j].Population);
      }
    }
  };

  //US chart
  let usPopulationArray = [];
  let usData = new google.visualization.DataTable();

  usData.addColumn('string', 'Year');
  usData.addColumn('number', 'US Pop');
  for(i=usYearsNeeded.length-1; i>=0 ; i--){
    usPopulationArray.push([usYearsNeeded[i].Year, usYearsNeeded[i].Population]);
  }

  usData.addRows(
    usPopulationArray
    ); 
    let usOptions = {
      hAxis: {
        title: 'Year'
      },
      vAxis: {
        title: 'Population'
      },
      colors: ['#a52714'],
      width:700,
      height:400      
    };
    
    let usChart = new google.visualization.LineChart(document.getElementById('usChart_div'));
    usChart.draw(usData, usOptions);
    
    //states chart
    let stateData = new google.visualization.DataTable();
    stateData.addColumn('string', 'Year');
    graphedStates.length > 0
      ? graphedStates.forEach(state => stateData.addColumn('number', state))
      : stateData.addColumn('number', '');
    
    stateData.addRows(
      statePopulationArray
      );

      let options = {
        hAxis: {
          title: 'Year'
        },
        vAxis: {
          title: 'Population'
        },
    colors: ['blue','red','green','orange','lightblue','black','purple','brown','pink'],
    width:370,
    height:200
  };
  
  let stateChart = new google.visualization.LineChart(document.getElementById('stateChart_div'));
  stateChart.draw(stateData, options);

}
  
