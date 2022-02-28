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

// display mobile details
const displayMobileinfo = mobiles => {
    const mobileinfo = document.getElementById('mobile-info');
    mobileinfo.textContent = '';
    if (mobiles.length == 0) {
        errors[1].style.display = 'block';
    }
    mobiles.forEach(mobile => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-0 shadow-lg">
            <img src="${mobile.image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${mobile.phone_name}</h5>
                <p class="card-text"> Brand:${mobile.brand}</p>
            </div>
        </div>
        `;
        mobileinfo.appendChild(div);
    })
}