//This is our fetch function, where we grab all of the information from the API. Furthermore, in this function, we also map over the key value pair of name and rate using Object, 
//and are thus able to use them separately as opposed to as a pair. 
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



//This function takes a key value pair as an argument, and takes the dropdown "Convert To" and adds the names of the currencies and stores their rates. Like the handleCurrencyConversion 
//function, the select is left empty in the HTML file on purpose, to build this inside of the DOM. 
function addRatesToBox({name, rate}){
    let dropdown = document.getElementById('convertToCurrency')
    let option = document.createElement('option')
    option.id = 'currencyToConvertSelection' 
    option.value = `${rate}`
    option.innerText = `${name}`
    dropdown.appendChild(option)    
}



//This function takes the event of the dropdown box being selected, and sets the value of each currency. 
function populateConversionValues(e){
    e.preventDefault() 
    const conversionRate = e.target.value
    const dropDown = document.getElementById('convertToCurrency')

}



//This function builds the conversion itself. Going back to the onsubmit in the HTML file, once the submit button is clicked, it takes the value of the selected currency, and multiplies it 
//by the value of the base rate. 
function buildConversion(e){
    e.preventDefault() 
    const baseRate = e.target.currencyConversion.value 
    const dropDownMenu = document.getElementById('convertToCurrency')
    const rate = dropDownMenu.value 
    const conversionResult = document.getElementById('conversionResult')
    conversionResult.innerText = baseRate * rate
}



//This is where we set getAllCurrency as our callback function. 
function initialize(){
    getAllCurrency()
    // currencyList.forEach(rates => addRatesToBox(rates))
}



//This initializes the whole process. 
initialize();



//This is one of our addEventListener functions. This function takes the currency input form, waits for a submit event to happen on it (which is the submit button being clicked), 
//and uses another event listener built inside of the HTML file (the onsubmit) to call the buildConversion function. 
document.addEventListener('DOMContentLoaded', () => {
    let mainForm = document.querySelector('form')
    mainForm.addEventListener('submit', (e) => {  
    e.preventDefault() 
    handleCurrencyConversion(e.target.currencyConversion.value) 
    mainForm.reset() 
    })
})



//This function takes our conversionHistory div, and creates an ul inside of a li inside of the div. This div
//is left empty in the HTML file for this purpose. This in turn makes an easy to iterate over conversion history. We could have left 
//all of the added elements in this div as p, but that would have made creating a clear button more difficult. 
function handleCurrencyConversion(currencyConversion){
    let historyUl = document.getElementById('historyList') ?? document.createElement('ul')  
    historyUl.id = "historyList"
    document.getElementById('conversionHistory').appendChild(historyUl)
    let historyLi = document.createElement('li')
    historyLi.textContent = conversionResult.innerText
    historyUl.appendChild(historyLi)
}



//This function simply clears our historyList, and in effect clears the conversion history. 
function clearHistory() {
    document.getElementById('historyList').remove()
}

const clearHistoryButton = document.getElementById('clearHistoryButton')
clearHistoryButton.addEventListener('click', clearHistory)


