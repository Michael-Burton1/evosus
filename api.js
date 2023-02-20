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