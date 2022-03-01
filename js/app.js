// error messages hide 
const errors = document.getElementsByClassName('error-message');
const hide = errors => {
    for (const error of errors) {
        error.style.display = 'none';
    }
}
hide(errors);

// error message show
const displayError = error => {
    errors[0].style.display = 'block';
}

// search mobile 
const searchMobile = () => {
    const searchField = document.getElementById('search-field').value;
    const searchText = searchField.toLowerCase();
    // clear previous data
    searchField.value = '';
    hide(errors);
    if (searchText == '') {
        errors[2].style.display = 'block';
    } else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayMobileinfo(data.data))
            .catch(error => displayError(error));
    }
}

// display mobile information
const displayMobileinfo = mobiles => {
    const mobileinfo = document.getElementById('mobile-info');
    mobileinfo.textContent = '';
    const Mobiledetails = document.getElementById('mobile-details');
    Mobiledetails.textContent = '';

    const mobiles20 = mobiles.slice(0, 20);

    if (mobiles.length == 0) {
        errors[1].style.display = 'block';
    }

    mobiles20.forEach(mobile => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 border-0 shadow-lg">
                <img src="${mobile.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${mobile.phone_name}</h5>
                    <p class="card-text"> Brand:${mobile.brand}</p>
                    <button onclick="loadMobiledetails('${mobile.slug}')" type="button" class="btn btn-primary px-3">See More</button>
                </div>
            </div>
            `;
        mobileinfo.appendChild(div);
    })

}

// mobile details 
const loadMobiledetails = mobileID => {
    const url = `https://openapi.programming-hero.com/api/phone/${mobileID}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMobiledetails(data.data));
}

// display mobile details 
const displayMobiledetails = features => {
    const Mobiledetails = document.getElementById('mobile-details');
    Mobiledetails.textContent = '';
    const div = document.createElement('div');
    const para = document.createElement('p');

    if (features.mainFeatures.memory == undefined)
        features.mainFeatures.memory = 'Unknown';

    if (features.mainFeatures.chipSet == undefined)
        features.mainFeatures.chipSet = 'Unknown';

    if (features.mainFeatures.displaySize == undefined)
        features.mainFeatures.displaySize = 'Unknown';

    if (features.releaseDate == undefined || features.releaseDate == '')
        features.releaseDate = 'Release date not found'

    // bonus part 
    if (features.mainFeatures.sensors == undefined)
        features.mainFeatures.sensors = 'Not available';

    if (features.others == undefined)
        features.others = 'Unknown'
    else {
        for (const [key, values] of Object.entries(features.others)) {
            const element = document.createTextNode(` ${key} : ${values} `);
            para.appendChild(element);
        }
    }


    div.classList.add('card', 'border-0', 'rounded', 'shadow-md');
    div.innerHTML = `
        <img src="${features.image}" class="card-img-top w-25 mx-auto" alt="...">
        <div class="card-body">
        <p class="card-text">
        <h4>Features</h4>
        <p>Memory: ${features.mainFeatures.memory}</p>
        <p>Display: ${features.mainFeatures.displaySize}</p>
        <p>Chipset: ${features.mainFeatures.chipSet}</p>
        <p>Sensors: ${features.mainFeatures.sensors}</p>
        <p>${features.releaseDate}</p></p>
    `;
    div.lastChild.appendChild(para);
    Mobiledetails.appendChild(div);
}