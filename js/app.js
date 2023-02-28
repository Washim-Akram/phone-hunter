const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = ""; // Clear the previous search result.

    const showAll = document.getElementById("show-all");
    if(dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10); // Display only 10 phones.
        showAll.classList.remove("d-none");
    } else{
        showAll.classList.add("d-none");
    }

    // Display Error Message For Not Found Phones.
    const notFoundMessage = document.getElementById("not-found-message");
    if(phones.length === 0) {
        notFoundMessage.classList.remove("d-none");
    } else{
        notFoundMessage.classList.add("d-none");
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
        <div class="card h-100 p-3">
          <img src="${phone.image}" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <h6 class="card-title">${phone.brand}</h6>
          </div>
          <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-info p-2" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Details</button>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })

    toggleSpinner(false); // Stop Spinner
}

const processSearch = (dataLimit) => {
    toggleSpinner(true); // Start Spinner
    const searchInputField = document.getElementById("search-input-field");
    const searchInputFieldValue = searchInputField.value;
    loadPhones(searchInputFieldValue, dataLimit);
}

document.getElementById("btn-search").addEventListener("click", function() {
   processSearch(10);
})

// Show results when enter the keyboard "Enter" button
document.getElementById("search-input-field").addEventListener("keypress", function(event) {
    if(event.key === "Enter"){
        processSearch(10);
    }
})

const toggleSpinner = (isLoading) => {
    const loader = document.getElementById("loader");
    if(isLoading) {
        loader.classList.remove("d-none");
    } else{
        loader.classList.add("d-none");
    }
}

document.getElementById("btn-show-all").addEventListener("click", function() {
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phone) => {
    const modalTitle = document.getElementById("phoneDetailsModalLabel");
    modalTitle.innerText = phone.name;
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
    <h2 class="lead">Brand: ${phone.brand}</h2>
    <img src="${phone.image}" class="img-fluid" alt="" />
    <h6 class="mt-3">Release Date: ${phone.releaseDate ? phone.releaseDate: "Sorry! Not Mentioned."}</h6>
    <h6>Storage: ${phone.mainFeatures.storage}</h6>
    <h6>Main Features: </h6>
    <p>Chip Set: ${phone.mainFeatures.chipSet}</p>
    <p>Display Size: ${phone.mainFeatures.displaySize}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    `;
}

// loadPhones();