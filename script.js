let inputMoney = document.querySelector(".sum");
let selectCurrency = document.querySelector(".currency");
let inputProcent = document.querySelector(".pros");
let hardPros = document.querySelector(".addPros");


let outputMoney = document.querySelector(".outSum");
let outputProfit = document.querySelector(".outProfit");

let calc = document.querySelector(".submit");
let optionBtn = document.querySelector(".optionBtn");
let optionText = document.querySelector(".optinonText");

let error = document.createElement("p")
let count = 1;



calc.addEventListener("click", (event) => {
   calcFunc();
})

window.addEventListener("keyup", (event) => {
   if (event.code === "Enter") {
      calcFunc();
   }
})

const calcFunc = () => {
   if (inputMoney.value && inputProcent.value) {
      count--
      error.remove();
      let input = inputMoney.value;
      let percent = inputProcent.value;

      let selectedCur = document.getElementById("currnc");
      let currency = selectedCur.options[selectedCur.selectedIndex].value;

      let selectedTime = document.getElementById("time");
      let time = selectedTime.options[selectedTime.selectedIndex].text;

      let isHardPercent = hardPros.checked;



      let profit = 0;
      let sum = 0;
      let month = 0;

      // without hardPercent
      if (!isHardPercent) {

         if (time === "9" || time === "6" || time === "3") {

            let yearProfit = (input * percent) / 100;
            month = yearProfit / 12;
            profit = +month.toFixed(2) * time;
            console.log(month.toFixed(2), profit)

         } else if (time === "12") {
            profit = (input * percent) / 100;

         } else if (time === "24") {
            profit = ((input * percent) / 100) * 2;

         }

      } else {
         // with hard percent 

         let months = [];
         let monthPercent = (percent / time);
         let monthProf = ((input * monthPercent) / 100);

         months.push(monthProf.toFixed(2));
         let pushingProfit = monthProf;

         for (let i = 1; i < time; i++) {

            let generationPerc = ((monthProf * monthPercent) / 100);
            pushingProfit += generationPerc;
            months.push(pushingProfit.toFixed(2))
         }
         profit = months.reduce((prev, curr) => { return +prev + +curr });
      }

      sum = +input + +profit;
      outputMoney.value = sum.toFixed(2);
      outputProfit.value = profit.toFixed(2);

      if (currency == "Usd") {
         outputMoney.value += " $";
         outputProfit.value += " $";
      } else {
         outputMoney.value += " ₴";
         outputProfit.value += " ₴";
      }

   } else {
      if (count < 2) {
         count++
         error.innerHTML = "заполните все необходимые поля"
         calc.after(error)
      }
   }
}


optionBtn.addEventListener("click", (event) => {
   optionText.classList.toggle("hide")


})





function validate(evt) {
   let theEvent = evt || window.event;
   let key = theEvent.keyCode || theEvent.which;
   key = String.fromCharCode(key);
   let regex = /[0-9]|\./;
   if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
   }
}

