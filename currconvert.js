let BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll (".dropdown select"); 
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".form select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg ");

for(let select of dropdowns){
        for(Currcode in countryList){
             let newOption = document.createElement("option");
             newOption.innerText = Currcode;
             newOption.value = Currcode;
             if (select.name === "from" && Currcode === "USD") {
                 newOption.selected ="selected";
             }
             else if (select.name === "to" && Currcode === "INR") {
                newOption.selected ="selected";
            }
             select.append(newOption);
        }


    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}


    window.addEventListener ("load" ,(evt) => {
        updateExchangeRate();
    })
    const updateExchangeRate  = async (element) => {
        let amount = document.querySelector(".amount input");

         let amtval=amount.value;
         if (amtval === "" || amtval < 1){
             amtval=1;
             amount.value="1";
         }
         const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
         let response = await fetch(URL);
         let data =await response.json();
         let rate = data[tocurr.value.toLowerCase()];
         let finalAmount = amtval * rate;
         msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`
        

    }


    const updateFlag  = (element) => {
        let Currcode =element.value;
        let countryCode = countryList[Currcode]; //IN ,USD
        let newsrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
         let img = element.parentElement.querySelector("img");
         img.src=newsrc;
    };

 btn.addEventListener("click",   (evt) => {
        evt.preventDefault();
        updateExchangeRate();
         

    });