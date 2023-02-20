//create state buttons
function createStatesButtons(){
    const statebtns = statesArray.map(state => '<button id="' + state.name + '-btn" class="btn" value="'+ state.name + '" onclick="handleClick(this.value)">' + state.name + '</button>').join('');
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
  function toggleActive(btn) {
    btn.classList.toggle('active');
  }

const graphedStates =[]
function handleClick(buttonValue) {
  let clickedBtn = document.getElementById(`${buttonValue}-btn`);
  toggleActive(clickedBtn);
  if (!graphedStates.includes(buttonValue)){
    graphedStates.push(buttonValue);
    drawLineColors();
  } else {

    removeItemOnce(graphedStates, buttonValue);
    drawLineColors();
  }
}

//Display charts
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawLineColors);

async function createUSCharts(){
  let res = await getUSPopulation();
  let usPopulationData = res.data;
  let usYearsNeeded = usPopulationData.filter((item => item.Year < 2020 && item.Year > 2012))
  let usData = new google.visualization.DataTable();
  let usChart = new google.visualization.LineChart(document.getElementById('usChart_div'));
  let usPopulationArray = [];
  
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
    usChart.draw(usData, usOptions);
  }
  
  async function createStateCharts(){
    let stateResults = await getStatePopulation();
    let statePopulationData = stateResults.data;
    let stateData = new google.visualization.DataTable();
    let chosenStatesYearsNeeded = [];

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
          statePopulationArray[j].push(chosenStateYearsNeeded[chosenStateYearsNeeded.length-1-j].Population);
        }
      }
    };
    stateData.addColumn('string', 'Year');
    if (graphedStates.length > 0) {
      for (let l=0; l<=graphedStates.length-1; l++){
        let stateIndex;
        for (let m=0; m<=statesArray.length-1; m++){
          if (graphedStates[l] !== statesArray[m].name){           
            continue;
          } else {
            stateIndex = m;
            break;            
          }  
        }
        stateData.addColumn('number', statesArray[stateIndex].abbreviation
        )
      } 
    } else {
      stateData.addColumn('number', '');
    }
    
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
    
    async function drawLineColors() {
      createUSCharts();
      createStateCharts();
    }
    
    
    createStatesButtons();