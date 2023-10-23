// all country
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://disease.sh/v3/covid-19/countries/')
        .then(response => response.json())
        .then(data => getData(data))
    // .catch(error => console.error('Error:', error));
});
const userInput = document.getElementById('user-input')
userInput.addEventListener('keyup', () => {
    const mainURL = 'https://disease.sh/v3/covid-19/countries/';
    const userText = userInput.value;
    const specificURL = `${mainURL}${userText}`;
    const length = userText.length;
    console.log(specificURL);
    if (length > 0) {
        return aPI2(specificURL);
    }
    else {
        return aPI(mainURL);
    }

})
const aPI = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        getData(data);
    }
    catch (error) {
        error => console.log(error);
    }
}
const aPI2 = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // const arr = [];
        // arr.push(data);
        // getData(arr);
        getData([data]);
        // console.log(data);
    }
    catch (error) {
        error => console.log(error);
    }
}
// const getData = (data) => {
//     const card = document.getElementById('card');
//     data.forEach((ele) => {
//         const div = document.createElement('div');
//         div.style.width = '18rem';
//         div.classList.add('col-4', 'col-md-6', 'border', 'border-primary', 'gx-2');
//         div.innerHTML = `
//         <img src="${ele.countryInfo.flag}" class="card-img-top img-fluid" alt="...">
//         <div class="card-body">
//             <p class="card-text">${ele.country}</p>
//         </div>
//         `;
//         card.appendChild(div);
//     })
// }
const getData = (data) => {
    const card = document.getElementById('card');
    card.innerHTML = '';
    card.classList.add('row', 'g-2'); // Add Bootstrap spacing classes
    data.forEach((ele) => {
        const div = document.createElement('div');
        div.style.width = '18rem';
        div.classList.add('card', 'col-4', 'col-md-6', 'col-sm-12', 'border', 'border-success', 'rounded', 'custom-card', 'p-3', 'bg-secondary-subtle');
        div.innerHTML = `
        <img src="${ele.countryInfo.flag}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
        <h1>${ele.country}</h1>
        <hr>
        <p>Total Cases : ${ele.cases}</p>
        <p>Today Cases : ${ele.todayCases}</p>
        <p>Critical : ${ele.critical}</p>
        <p>Today Recovered : ${ele.todayRecovered}</p>
        <p>Today Deaths : ${ele.todayDeaths}</p>
        <p>Test Per Million : ${ele.casesPerOneMillion}</p>
        <p>Death Per Million : ${ele.deathsPerOneMillion}</p>
        <p>Total Population : ${ele.population}</p>
        </div>
        `;
        card.appendChild(div);
    });
}

aPI();