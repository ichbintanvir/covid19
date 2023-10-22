google.charts.load('current', {
    'packages': ['geochart'],
});
google.charts.setOnLoadCallback(aPI); // Remove the parentheses here

const url = 'https://disease.sh/v3/covid-19/countries';

async function aPI() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        drawRegionsMap(data);
    } catch (error) {
        console.error(error);
    }
}

function drawRegionsMap(data) {
    const arr = [['Country', 'Death']];
    data.forEach((ele) => {
        const country = ele.country;
        const death = ele.deaths;
        const arr2 = [country, death];
        arr.push(arr2);
    });

    var data2 = google.visualization.arrayToDataTable(arr);
    var options = {
        // colorAxis: { colors: ['green', 'red'] }
        colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
        backgroundColor: '#81d4fa',
        datalessRegionColor: '#f8bbd0',
        defaultColor: '#f5f5f5',
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data2, options);
}

