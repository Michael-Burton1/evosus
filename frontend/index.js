const main = document.querySelector('#main')
const list = document.querySelector('#list')
const nation = document.querySelector('#nation')
const year = document.querySelector('#year')
const population = document.querySelector('#population')
const lineChartdisplay = document.querySelector("#line-chart")

//API CALL
async function getPopulation(){
  const res = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
  const data = await res.json();
  return data
}

//display results
async function fetchData(){
  const data = await getPopulation();
  return data;
}

async function displayData(){
  let res = await fetchData();
  let populationData = res.data;
  console.log('responce data', populationData)
  let years = populationData.filter((item => item.Year < 2020))
  let yearlyPopulation =years.map(item => {
    return (`<ul>${item.Population}</ul>`)
  }).join('')
  // let individualYears = years.map(item => {
    //   return (`<li>${item.Years}</li>`)
    // }).join('')
    
    list.innerHTML = yearlyPopulation;
  }
  
  google.charts.load('current', {packages: ['corechart', 'line']});
  google.charts.setOnLoadCallback(drawLineColors);
  
  async function drawLineColors() {
    let res = await fetchData();
    let populationData = res.data;
    let yearsNeeded = populationData.filter((item => item.Year < 2020 && item.Year > 2012))
    // let yearlyPopulation = yearsNeeded.map(item => {
    //   return (`${item.Population}`)
    // })
      var data = new google.visualization.DataTable();
      // data.addColumn('number', 'X');
      data.addColumn('string', 'year');
      data.addColumn('number', 'Population in the US');

      let populationArray = [];
      console.log('before', populationArray);
      
      for(i=yearsNeeded.length-1; i>=0 ; i--){
        // populationArray.push([yearsNeeded[i]['ID Year'], yearsNeeded[i].Population]);
        populationArray.push([yearsNeeded[i].Year, yearsNeeded[i].Population]);
        console.log('inside step'+i, populationArray);
      }
      console.log('after', populationArray);


      data.addRows(
        populationArray
      );

      var options = {
        hAxis: {
          title: 'Year'
        },
        vAxis: {
          title: 'Population'
        },
        colors: ['#a52714'],
        width:700
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }


// displayData();
