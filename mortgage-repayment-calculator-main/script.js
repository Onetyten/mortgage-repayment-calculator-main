const mortgageAmountEl = document.getElementById("mortgage-Amount")
const mortgageTermEl = document.getElementById("mortgage-Term")
const interestRateEl = document.getElementById("Interest-rate")
const mortgageTypeRadio = document.getElementsByName("mortgageType")
let mortgageTypeValue = null
const inputBox = document.getElementsByClassName("input-box") 
const inputFlex = document.getElementsByClassName("input-flex") 
const inputContainerClass = document.getElementsByClassName("input-container") 

const input_button = document.getElementById("calculate-el")
const emptyResult = document.getElementById("Empty-results")
const filledResult = document.getElementById("filled-results")
const repaymentBox= document.getElementById("repayment-container")
const interestBox = document.getElementById("interest-container")

let monthlyRepaymentEl = document.getElementById("monthly-payment")
let totalrepaymentEl = document.getElementById("total-payment")
let clearButton = document.getElementById("clr-btn")
let inputContainer = document.getElementById("input-container")



input_button.addEventListener("click",showResult)
mortgageTypeRadio[0].addEventListener("click",updateStyle)
mortgageTypeRadio[1].addEventListener("click",updateStyle)

inputBox[0].addEventListener("mouseover",updateInput1)
inputBox[0].addEventListener("mouseleave",updateInput1)
inputBox[1].addEventListener("mouseover",updateInput2)
inputBox[1].addEventListener("mouseleave",updateInput2)
inputBox[2].addEventListener("mouseover",updateInput3)
inputBox[2].addEventListener("mouseleave",updateInput3)


inputBox[0].addEventListener("click",updateClick1)
inputBox[1].addEventListener("click",updateClick2)
inputBox[2].addEventListener("click",updateClick3)

function updateInput1() {
    inputContainerClass[0].classList.toggle("active-cotainer")
}
function updateInput2() {
    inputContainerClass[1].classList.toggle("active-cotainer")
}

function updateInput3() {
    inputContainerClass[2].classList.toggle("active-cotainer")
}


function updateClick1() {
    for(let i =0 ;inputFlex.length; i++){
        inputFlex[i].classList.remove("error-input")
    }
}
function updateClick2() {
    for(let i =0 ;inputFlex.length; i++){
        inputFlex[i].classList.remove("error-input")
    }
}

function updateClick3() {
    for(let i =0 ;inputFlex.length; i++){
        inputFlex[i].classList.remove("error-input")
    }
}
















function updateStyle () {
    console.log("change")
    if (mortgageTypeRadio[0].checked){
        mortgageTypeValue  = 0
        repaymentBox.classList.add("selected-radio")
        interestBox.classList.remove("selected-radio")
    }
    else if (mortgageTypeRadio[1].checked){
        mortgageTypeValue  = 1
        repaymentBox.classList.remove("selected-radio")
        interestBox.classList.add("selected-radio")

    }
}




function showResult(){
    let mortgageAmount = mortgageAmountEl.value
    let mortgageTerm = mortgageTermEl.value
    let interestRate = interestRateEl.value

    
    updateStyle()
    
    
    if (mortgageTypeRadio[0].checked){
        mortgageTypeValue  = 0
    }
    else if (mortgageTypeRadio[1].checked){
        mortgageTypeValue  = 1
    }
    if (mortgageAmount != null && mortgageTerm != null && interestRate && mortgageTypeValue != null){
        filledResult.classList.remove("hide")
        emptyResult.classList.add("hide")
        calculateMortgage(mortgageAmount,mortgageTerm,interestRate,mortgageTypeValue)

    }
    else{
        filledResult.classList.add("hide")
        emptyResult.classList.remove("hide")
        for(let i =0 ;inputFlex.length; i++){
            inputFlex[i].classList.add("error-input")
        }
        


    }

}



function calculateMortgage(mortgageAmount, mortgageTerm, interestRate, mortgageTypeValue) {
    // Convert the annual interest rate to a monthly interest rate
    let monthlyInterestRate = (interestRate / 100) / 12;
    let numberOfPayments = mortgageTerm * 12;
    if (monthlyInterestRate > 0) {
        let ratio = Math.pow(1 + monthlyInterestRate, numberOfPayments);
        let monthlyRepayment = (mortgageAmount * monthlyInterestRate * ratio) / (ratio - 1);
        let totalRepayment = monthlyRepayment * numberOfPayments;
        let interestOnly = totalRepayment - mortgageAmount;
        let monthlyInterest = interestOnly / numberOfPayments;
        if (mortgageTypeValue == 0) {
            monthlyRepaymentEl.textContent = "£" + (Math.round(monthlyRepayment * 100) / 100).toFixed(2);
            totalrepaymentEl.textContent = "£" + (Math.round(totalRepayment * 100) / 100).toFixed(2);
        }
        else {
            monthlyRepaymentEl.textContent = "£" + (Math.round(monthlyInterest * 100) / 100).toFixed(2);
            totalrepaymentEl.textContent = "£" + (Math.round(interestOnly * 100) / 100).toFixed(2);
        }
    } else {
        let monthlyRepayment = mortgageAmount / numberOfPayments;
        monthlyRepaymentEl.textContent = "£" + (Math.round(monthlyRepayment * 100) / 100).toFixed(2);
        totalrepaymentEl.textContent = "£" + (Math.round(mortgageAmount * 100) / 100).toFixed(2);
    }
}


clearButton.addEventListener("click",clear)

function clear() {
    mortgageAmountEl.value = null
    mortgageTermEl.value = null
    interestRateEl.value = null
    mortgageTypeRadio[0].checked = false
    mortgageTypeRadio[1].checked = false
    mortgageTypeValue = null
    filledResult.classList.add("hide")
    emptyResult.classList.remove("hide")
}