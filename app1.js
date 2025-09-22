const baseURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

let drop=document.querySelectorAll(".drop select");
let btn=document.querySelectorAll(".btn");
let currFrom=document.querySelector(".from select");
let currTo=document.querySelector(".to select");
let result=document.querySelector(".res p");
const updateFlag = (element)=>{
    let currCode=element.value;
    let counCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${counCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}
for(let select of drop){
    for(currCode in countryList){
        let newEl = document.createElement("option");
        newEl.value=currCode;
        newEl.innerText=currCode;
        if(select.name==="from" && currCode==="USD"){
            newEl.selected=true;
        }
        else if(select.name==="to" && currCode==="INR"){
            newEl.selected=true;
        }
        select.appendChild(newEl);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateRate= async ()=>{
    let amount=document.querySelector(".input input");
    let amt=amount.value;
    if(amt==="" || amt<1){
        amt=1;
        amount.value=1;
    }
    let from=currFrom.value;
    let to=currTo.value;
    let URL=`${baseURL}/${from.toLowerCase()}.json`;

    let res=await fetch(URL);
    let data =await res.json();
    let rate =data[from.toLowerCase()][to.toLowerCase()];
    let finalAmt=amt*rate;
    // console.log(finalAmt)
    result.innerText=`${amt}${from} = ${finalAmt}${to}`;
}

btn,addEventListener("click",(evt)=>{
    evt.preventDefault(evt);
    updateRate();
})

window.addEventListener("load",()=>{
    updateRate();
})

let exchange=document.querySelector(".drop i");
exchange.addEventListener("click", ()=>{
    let t1=currFrom.value;
    let t2=currTo.value;
    currFrom.value=t2;
    updateFlag(currFrom);
    currTo.value=t1;
    updateFlag(currTo);
})

