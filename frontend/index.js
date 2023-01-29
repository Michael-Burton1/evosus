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
async function getStatePopulation(){
  const res = await fetch('https://datausa.io/api/data?drilldowns=State&measures=Population&year')
  const data = await res.json();
  return data
}

//display results
async function fetchData(){
  const data = await getPopulation();
  return data;
}

async function fetchStateData(){
  const data = await getStatePopulation();
  console.log('data', data)
  return data;
}

fetchStateData();
// async function displayData(){
//   let res = await fetchData();
//   let populationData = res.data;
//   console.log('responce data', populationData)
//   let years = populationData.filter((item => item.Year < 2020))
//   let yearlyPopulation =years.map(item => {
//     return (`<ul>${item.Population}</ul>`)
//   }).join('')
//   // let individualYears = years.map(item => {
//     //   return (`<li>${item.Years}</li>`)
//     // }).join('')
    
//     list.innerHTML = yearlyPopulation;
//   }
  
  google.charts.load('current', {packages: ['corechart', 'line']});
  google.charts.setOnLoadCallback(drawLineColors);
  
  async function drawLineColors() {
    let res = await fetchData();
    let populationData = res.data;
    let yearsNeeded = populationData.filter((item => item.Year < 2020 && item.Year > 2012))

    let res2 = await fetchStateData();
    let populationData2 = res2.data;
    let oregon = populationData2.filter((item => item.State === 'Oregon'));
    let newYork = populationData2.filter((item => item.State === 'New York'));
    let orYearsNeeded2 = oregon.filter((item => item.Year < 2020 && item.Year > 2012))
    console.log('OR', orYearsNeeded2);
    let nyYearsNeeded2 = oregon.filter((item => item.Year < 2020 && item.Year > 2012))
    console.log('OR', nyYearsNeeded2);

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'year');
      data.addColumn('number', 'US Pop');
      
      let populationArray = [];
      // console.log('before', populationArray);
      
      for(i=yearsNeeded.length-1; i>=0 ; i--){
        populationArray.push([yearsNeeded[i].Year, yearsNeeded[i].Population]);
        console.log('inside step'+i, populationArray);
      }

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
        console.log('chart1', chart);
        chart.draw(data, options);
        
        var data2 = new google.visualization.DataTable();
        data2.addColumn('string', 'year');
        data2.addColumn('number', 'OR pop ','NY pop');
        // data2.addColumn('number', 'NY Pop');
        
        let populationArray2 = [];
        console.log('before', populationArray2);
        
        for(i=orYearsNeeded2.length-1; i>=0 ; i--){
        populationArray2.push([orYearsNeeded2[i].Year, orYearsNeeded2[i].Population, nyYearsNeeded2[i].Population]);
        console.log('inside step'+i, populationArray2);
      }
      console.log('after', populationArray2);

      data2.addRows(
        populationArray2
      );

      var options = {
        hAxis: {
          title: 'Year'
        },
        vAxis: {
          title: 'Population'
        },
        colors: ['#a52714', '#000077'],
        width:700
      };

      var chart2 = new google.visualization.LineChart(document.getElementById('chart_div2'));
      console.log(chart2)
      chart2.draw(data2, options);
    }

