
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


//Display charts
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawLineColors);

async function drawLineColors() {
  let res = await getUSPopulation();
  let usPopulationData = res.data;
  let usYearsNeeded = usPopulationData.filter((item => item.Year < 2020 && item.Year > 2012))

  let stateResults = await getStatePopulation();
  let statePopulationData = stateResults.data;
  let oregon = statePopulationData.filter((item => item.State === 'Oregon'));
  let washington = statePopulationData.filter((item => item.State === 'Washington'));
  let california = statePopulationData.filter((item => item.State === 'California'));
  let idaho = statePopulationData.filter((item => item.State === 'Idaho'));
  let alaska = statePopulationData.filter((item => item.State === 'Alaska'));
  let newYork = statePopulationData.filter((item => item.State === 'New York'));
  let maryland = statePopulationData.filter((item => item.State === 'Maryland'));
  let orYearsNeeded = oregon.filter((item => item.Year < 2020 && item.Year > 2012));
  let mdYearsNeeded = maryland.filter((item => item.Year < 2020 && item.Year > 2012));
  let waYearsNeeded = washington.filter((item => item.Year < 2020 && item.Year > 2012));
  let caYearsNeeded = california.filter((item => item.Year < 2020 && item.Year > 2012));
  let idYearsNeeded = idaho.filter((item => item.Year < 2020 && item.Year > 2012));
  let akYearsNeeded = alaska.filter((item => item.Year < 2020 && item.Year > 2012));
  let nyYearsNeeded = newYork.filter((item => item.Year < 2020 && item.Year > 2012));

  let usPopulationArray = [];
  let usData = new google.visualization.DataTable();
  usData.addColumn('string', 'Year');
  usData.addColumn('number', 'US Pop');
  
  2
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
      colors: ['#a52714'],
      width:700,
      height:400
      
    };
    
    var usChart = new google.visualization.LineChart(document.getElementById('usChart_div'));
    usChart.draw(usData, usOptions);
    
    //maryland chart
    var mdData = new google.visualization.DataTable();
    mdData.addColumn('string', 'Year');
    mdData.addColumn('number', 'OR Pop');
    mdData.addColumn('number', 'MD Pop');
    
    let mdPopulationArray = [];
    
    for(i=orYearsNeeded.length-1; i>=0 ; i--){
      mdPopulationArray.push([orYearsNeeded[i].Year, orYearsNeeded[i].Population, mdYearsNeeded[i].Population]);
    }
    
    mdData.addRows(
      mdPopulationArray
      );

      var options = {
        hAxis: {
          title: 'Year'
        },
        vAxis: {
          title: 'Population'
        },
    colors: ['#a52714', '#000077'],
    width:370,
    height:200
  };
  
  var mdChart = new google.visualization.LineChart(document.getElementById('marylandChart_div'));
  mdChart.draw(mdData, options);

  //washington chart
  var waData = new google.visualization.DataTable();
  waData.addColumn('string', 'Year');
  waData.addColumn('number', 'OR Pop');
  waData.addColumn('number', 'WA Pop');
  
  let waPopulationArray = [];
  
  for(i=orYearsNeeded.length-1; i>=0 ; i--){
    waPopulationArray.push([orYearsNeeded[i].Year, orYearsNeeded[i].Population, waYearsNeeded[i].Population]);
  }
    
    waData.addRows(
      waPopulationArray
      );
  
  var waChart = new google.visualization.LineChart(document.getElementById('washingtonChart_div'));
  waChart.draw(waData, options);

  //california chart
  var caData = new google.visualization.DataTable();
  caData.addColumn('string', 'Year');
  caData.addColumn('number', 'OR Pop');
  caData.addColumn('number', 'CA Pop');
  
  let caPopulationArray = [];
  
  for(i=orYearsNeeded.length-1; i>=0 ; i--){
    caPopulationArray.push([orYearsNeeded[i].Year, orYearsNeeded[i].Population, caYearsNeeded[i].Population]);
  }
    
    caData.addRows(
      caPopulationArray
      );
  
  var caChart = new google.visualization.LineChart(document.getElementById('californiaChart_div'));
  caChart.draw(caData, options);

  //idaho chart
  var idData = new google.visualization.DataTable();
  idData.addColumn('string', 'Year');
  idData.addColumn('number', 'OR Pop');
  idData.addColumn('number', 'ID Pop');
  
  let idPopulationArray = [];
  
  for(i=orYearsNeeded.length-1; i>=0 ; i--){
    idPopulationArray.push([orYearsNeeded[i].Year, orYearsNeeded[i].Population, idYearsNeeded[i].Population]);
  }
    
    idData.addRows(
      idPopulationArray
      );
  
  var idChart = new google.visualization.LineChart(document.getElementById('idahoChart_div'));
  idChart.draw(idData, options);

  //alaska chart
  var akData = new google.visualization.DataTable();
  akData.addColumn('string', 'Year');
  akData.addColumn('number', 'OR Pop');
  akData.addColumn('number', 'AK Pop');
  
  let akPopulationArray = [];
  
  for(i=orYearsNeeded.length-1; i>=0 ; i--){
    akPopulationArray.push([orYearsNeeded[i].Year, orYearsNeeded[i].Population, akYearsNeeded[i].Population]);
  }
    
    akData.addRows(
      akPopulationArray
      );
  
  var akChart = new google.visualization.LineChart(document.getElementById('alaskaChart_div'));
  akChart.draw(akData, options);

  //new york chart
  var nyData = new google.visualization.DataTable();
  nyData.addColumn('string', 'Year');
  nyData.addColumn('number', 'OR Pop');
  nyData.addColumn('number', 'NY Pop');
  
  let nyPopulationArray = [];
  
  for(i=orYearsNeeded.length-1; i>=0 ; i--){
    nyPopulationArray.push([orYearsNeeded[i].Year, orYearsNeeded[i].Population, nyYearsNeeded[i].Population]);
  }
    
    nyData.addRows(
      nyPopulationArray
      );
  
  var nyChart = new google.visualization.LineChart(document.getElementById('newYorkChart_div'));
  nyChart.draw(nyData, options);


}
  
