
function getAllCurrency(){
    fetch('https://v6.exchangerate-api.com/v6/cf0cb3636d1863b4bab3e6a1/latest/USD')
    .then(res => {
        return res.json()
    })

    .then(currencyList => {
        const {conversion_rates: conversionRates} = currencyList
        const parsedConversionRates = Object.entries(conversionRates)
        const currencyData = parsedConversionRates.map(([name, rate]) => ({name, rate})) 
        return currencyData.forEach(rateNamePair => addRatesToBox(rateNamePair))
        
    })  
}



function addRatesToBox({name, rate}){
    let dropdown = document.getElementById('convertToCurrency')
    let option = document.createElement('option')
    option.id = 'currencyToConvertSelection' 
    option.value = rate + " " + name  
    option.innerText = `${name}`
    dropdown.appendChild(option)    
}


 
function populateConversionValues(e){
    e.preventDefault() 
    const conversionRate = e.target.value
    const dropDown = document.getElementById('convertToCurrency')

}



function buildConversion(e){
    e.preventDefault() 
    const baseRate = e.target.currencyConversion.value 
    const dropDownMenu = document.getElementById('convertToCurrency')
    const rate = dropDownMenu.value 
    const currencyRateAndName = rate.split(" ")
    const currencyRate = currencyRateAndName[0]
    const currencyName = currencyRateAndName[1] 
    console.log(currencyRate)
    console.log(currencyName)
    const conversionResult = document.getElementById('conversionResult')
    conversionResult.innerText = baseRate * currencyRate + ` ${currencyName}`  
}



 
function initialize(){
    getAllCurrency()

}

initialize();



document.addEventListener('DOMContentLoaded', doStuff) 

function doStuff() {
    let mainForm = document.querySelector('form')
    mainForm.addEventListener('submit', (e) => {  
    e.preventDefault() 
    handleCurrencyConversion(e.target.currencyConversion.value) 
    mainForm.reset() 
    })
}


function handleCurrencyConversion(currencyConversion){
    let historyUl = document.getElementById('historyList') ?? document.createElement('ul')  
    historyUl.id = "historyList"
    document.getElementById('conversionHistory').appendChild(historyUl)
    let historyLi = document.createElement('li')
    historyLi.textContent = conversionResult.innerText
    historyUl.appendChild(historyLi)
}




function clearHistory() {
    document.getElementById('historyList').remove()
}

const clearHistoryButton = document.getElementById('clearHistoryButton')
clearHistoryButton.addEventListener('click', clearHistory)


