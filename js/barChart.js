google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(aPI);

async function aPI() {
    try {
        const response = await fetch('https://disease.sh/v3/covid-19/countries/');
        const data = await response.json();
        drawChart(data);
    }
    catch (error) {
        error => console.log(error);
    }
}

function drawChart(data) {

    // Set Data
    const tests = [];
    const deaths = [];
    const recovered = [];
    const population = [];
    data.forEach((ele) => {
        const testsVALUE = ele.tests;
        const recoveredVALUE = ele.recovered;
        const deathsVALUE = ele.deaths;
        const populationVALUE = ele.population;

        tests.push(testsVALUE);
        recovered.push(recoveredVALUE);
        deaths.push(deathsVALUE);
        population.push(populationVALUE);
    })
    const totalTests = add(tests);
    const totalDeaths = add(deaths) * 100;
    const totalRecovered = add(recovered);
    const totalPopulation = add(population);

    console.log(typeof totalDeaths)
    const data2 = google.visualization.arrayToDataTable([
        ['Category', 'Value'],
        ['TotalDeaths', totalDeaths],
        ['TotalTests', totalTests],
        ['TotalRecovered', totalRecovered],
        ['TotalPopulation', totalPopulation],
    ]);



    // Set Options
    const options = {
        title: 'Worldwide COVID-19 Data',
        // is3D: true
    };

    // Draw
    const chart = new google.visualization.BarChart(document.getElementById('myChartDoneat'));
    chart.draw(data2, options);

}
// ========== summation all values =============
function add(arr) {
    const summation = arr.reduce((accumulator, ele) => {
        return accumulator + ele;
    })
    return summation;
}