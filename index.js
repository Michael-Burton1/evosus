
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
  let statesArray = [
    "Alaska", 
    "Alabama", 
    "Arkansas", 
    "Arizona", 
    "California", 
    "Colorado", 
    "Connecticut", 
    "District of Columbia", 
    "Delaware", 
    "Florida", 
    "Georgia", 
    "Hawaii", 
    "Iowa", 
    "Idaho", 
    "Illinois", 
    "Indiana", 
    "Kansas", 
    "Kentucky", 
    "Louisiana", 
    "Massachusetts", 
    "Maryland", 
    "Maine", 
    "Michigan", 
    "Minnesota", 
    "Missouri", 
    "Mississippi", 
    "Montana", 
    "North Carolina", 
    "North Dakota", 
    "Nebraska", 
    "New Hampshire", 
    "New Jersey", 
    "New Mexico", 
    "Nevada", 
    "New York", 
    "Ohio", 
    "Oklahoma", 
    "Oregon", 
    "Pennsylvania", 
    "Puerto Rico", 
    "Rhode Island", 
    "South Carolina", 
    "South Dakota", 
    "Tennessee", 
    "Texas", 
    "Utah", 
    "Virginia", 
    "Vermont", 
    "Washington", 
    "Wisconsin", 
    "West Virginia", 
    "Wyoming",
  '']
    const statebtns = statesArray.map(state => '<button id="' + state + '-btn" value="'+ state + '" onclick="handleClick(this.value)">' + state + '</button>').join('');
    const myBtnContainer = document.querySelector('.btnContainer');
    myBtnContainer.innerHTML = statebtns;
  }

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  } 

const graphedStates =[]
function handleClick(buttonValue) {
  if (!graphedStates.includes(buttonValue)){
    console.log(graphedStates);
    drawLineColors(buttonValue);
    graphedStates.push(buttonValue);
  } else {
    drawLineColors("");
    removeItemOnce(graphedStates, buttonValue);
    
  }
}
  createStateButtons();

//Display charts
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawLineColors);

async function drawLineColors(value) {
  //if value is not already drawn then value === state name
  //if value is already drawn then use clear state for value
    //how do we know if its drawn already????
    // can I compare this outside of drawlines? I think i should

  let res = await getUSPopulation();
  let usPopulationData = res.data;
  let usYearsNeeded = usPopulationData.filter((item => item.Year < 2020 && item.Year > 2012))

  let stateResults = await getStatePopulation();
  let statePopulationData = stateResults.data;
  let chosenState = statePopulationData.filter((item => item.State === value));
  let chosenStateYearsNeeded = chosenState.filter((item => item.Year < 2020 && item.Year > 2012));

  let usPopulationArray = [];
  let usData = new google.visualization.DataTable();
  usData.addColumn('string', 'Year');
  usData.addColumn('number', 'US Pop');
  
  for(i=usYearsNeeded.length-1; i>=0 ; i--){
    usPopulationArray.push([usYearsNeeded[i].Year, usYearsNeeded[i].Population]);
  }

  //US chart
  usData.addRows(
    usPopulationArray
    );
    
    var usOptions = {
      hAxis: {
        title: 'Year'
      },
      vAxis: {
        title: 'Population'
      },
      colors: ['red'],
      // colors: ['#a52714'],
      width:700,
      height:400
      
    };
    
    var usChart = new google.visualization.LineChart(document.getElementById('usChart_div'));
    usChart.draw(usData, usOptions);
    
    //maryland chart
    var stateData = new google.visualization.DataTable();
    stateData.addColumn('string', 'Year');
    stateData.addColumn('number', value);
    
    let statePopulationArray = [];
    
    for(i=chosenStateYearsNeeded.length-1; i>=0 ; i--){
      statePopulationArray.push([chosenStateYearsNeeded[i].Year, chosenStateYearsNeeded[i].Population]);
    }
    
    stateData.addRows(
      statePopulationArray
      );

      var options = {
        hAxis: {
          title: 'Year'
        },
        vAxis: {
          title: 'Population'
        },
    colors: ['blue'],
    width:370,
    height:200
  };
  
  var stateChart = new google.visualization.LineChart(document.getElementById('marylandChart_div'));
  stateChart.draw(stateData, options);

}
  
