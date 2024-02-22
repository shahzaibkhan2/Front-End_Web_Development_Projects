const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const selectDropdown = document.querySelectorAll('.dropdowns select');

const btn = document.querySelector('form button');

const fromCurrency = document.querySelector('.from select');
const toCurrency = document.querySelector('.to select');
const alert1 = document.querySelector('.alert');

for (let select of selectDropdown) {
    for (let currCod in countriesList) {
        let anotherOpt = document.createElement('option');
        anotherOpt.innerText = currCod;
        anotherOpt.value = currCod;
        if (select.name === 'from' && currCod === 'USD'){
            anotherOpt.selected = 'selected';
        }else if (select.name === 'to' && currCod === 'PKR') {
            anotherOpt.selected = 'selected';
        }
        select.append(anotherOpt);
        select.addEventListener('change',(event) => {
            changeFlag(event.target);
        });
    }
}

const getExchangeRate = async () => {
    let amount = document.querySelector('.input input');
    let amountValue = amount.value;
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;

    let resp = await fetch(URL);
    let data = await resp.json();
    let newRate = data[toCurrency.value.toLowerCase()];

    let finalRate = Math.round(amountValue * newRate);
    alert1.innerText = `${amountValue} ${fromCurrency.value} = ${finalRate} ${toCurrency.value}`;

}

const changeFlag = (elem) => {
    let currencyCode = elem.value;
    let countryCode = countriesList[currencyCode];
    let newImgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let newImg = elem.parentElement.querySelector('img');
    newImg.src = newImgSrc;

    
}

btn.addEventListener('click',async (event) => {
    event.preventDefault();
    getExchangeRate();
    // let amount = document.querySelector('.input input');
    // let amountValue = amount.value;
    // if (amountValue === "" || amountValue < 1) {
    //     amountValue = 1;
    //     amount.value = "1";
    // }
    // const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;

    // let resp = await fetch(URL);
    // let data = await resp.json();
    // let newRate = data[toCurrency.value.toLowerCase()];

    // let finalRate = Math.round(amountValue * newRate);
    // alert1.innerText = `${amountValue} ${fromCurrency.value} = ${finalRate} ${toCurrency.value}`;
});

window.addEventListener('load', () => {
    getExchangeRate();
})