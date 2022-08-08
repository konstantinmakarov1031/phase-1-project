//GET https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD  API Key - cf0cb3636d1863b4bab3e6a1


document.addEventListener('DOMContentLoaded', () => {
    let mainForm = document.querySelector('form')
    mainForm.addEventListener('submit', (e) => {
        e.preventDefault() 
        handleCurrencyConversion(e.target.currencyConversion.value) 
        mainForm.reset() 
    })
})


function handleCurrencyConversion(currencyConversion){
    let historyUl = document.getElementById('historyList') ?? document.createElement('ul')    //Remember this and look into it more. 
    historyUl.id = "historyList"
    document.getElementById('conversionHistory').appendChild(historyUl)
    let historyLi = document.createElement('li')
    historyLi.textContent = conversionResult.innerText
    // historyLi.textContent =  
    historyUl.appendChild(historyLi)
}


// function createHistoryListFlow(historyLi){
//     historyLi.textContent = `${rate} x ${baseRate} = ${conversionResult.innerText}`
// }

// createHistoryListFlow(); 


function clearHistory() {
    document.getElementById('historyList').remove()
}






function addRatesToBox({name, rate}){
    let dropdown = document.getElementById('convertToCurrency')
    let option = document.createElement('option')
    option.id = 'currencyToConvertSelection' 
    option.value = `${rate}`
    option.innerText = `${name}`
    dropdown.appendChild(option)    
}


function populateConversionValues(e){
    e.preventDefault()
    // console.log(e.target.value) 
    const conversionRate = e.target.value
    const dropDown = document.getElementById('convertToCurrency')
    // console.log("selector", dropDown.value)
    // console.log(conversionRate)   
}


function buildConversion(e){
    e.preventDefault() 
    const baseRate = e.target.currencyConversion.value
    // console.log(baseRate) 
    const dropDownMenu = document.getElementById('convertToCurrency')
    // console.log(dropDownMenu)
    const rate = dropDownMenu.value 
    // console.log(rate)
    const conversionResult = document.getElementById('conversionResult')
    conversionResult.innerText = baseRate * rate 
    // conversionResult.innerText.reset()
}


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


function initialize(){
    getAllCurrency()
    // currencyList.forEach(rates => addRatesToBox(rates))
}

initialize();






