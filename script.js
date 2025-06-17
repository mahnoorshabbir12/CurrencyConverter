let base_url =
  "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=16a42e2c6dc944a1a0360d93bdc685ab&format=json";
let from_options = document.querySelectorAll("#select-from");
let to_options = document.querySelectorAll("#select-to");
let from_image = document.querySelector("#from-image");
let to_image = document.querySelector("#to-image");
import { countryList } from "./codes.js";
let btn = document.querySelector("#btn");
let output = document.querySelector("#output");

(function addFromOptions() {
  from_options.forEach((select) => {
    for (let country in countryList) {
      let option = document.createElement("option");
      option.value = country;
      option.innerText = country;
      select.appendChild(option);
    //   console.log(option.value);
    }
    select.addEventListener("change", function () {
      let selected = this.value;
      console.log(selected);
      from_image.src = `https://flagcdn.com/w40/${countryList[
        selected
      ].toLowerCase()}.png`;
    });
  });
})();

(function addToOptions() {
  to_options.forEach((select) => {
    for (let country in countryList) {
      let option = document.createElement("option");
      option.value = country;
      option.innerText = country;
      select.appendChild(option);
    //   console.log(option.value);
    }
    select.addEventListener("change", function () {
      let selected = this.value;
      console.log(selected);
      to_image.src = `https://flagcdn.com/w40/${countryList[
        selected
      ].toLowerCase()}.png`;
    });
  });
})();

let from_selected;
let to_selected;
(async function exchange() {
  btn.addEventListener("click", async (event) => {
    event.preventDefault();
    let inputText = document.querySelector("#input");
    let amount = inputText.value;
    // console.log(amount);
    const { to_selected, from_selected } = getSelected(); 

    let url = `${base_url}`;
    let promise = await fetch(url);
    let result = await promise.json();
    let fromRate = parseFloat(result.rates[from_selected]);
    let toRate = parseFloat(result.rates[to_selected]);
    let usdAmount = amount / fromRate;
    let convertedAmount = usdAmount * toRate;
    console.log(usdAmount);
    console.log(`${amount} ${from_selected} = ${convertedAmount} ${to_selected}`);
    output.value = convertedAmount.toFixed(2);
    console.log(convertedAmount);
  });
})();
function getSelected() {
  from_selected = document.querySelector("#select-from").value;
  to_selected = document.querySelector("#select-to").value;
  return { to_selected, from_selected };
}
