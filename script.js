const currentTime = document.querySelector('h1')
const selectMenu = document.querySelectorAll('select'),
content = document.querySelector('.content'),
setAlaramBtn = document.querySelector('button');

let alaramTime, isAlaramSet= false,
ringing =new Audio("ringtone.mp3") ;

for(let i =12;i>0;i--){
    i = i < 10 ? "0"+ i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}


for(let i = 59;i>0;i--){
    i = i < 10 ? "0"+ i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i =2;i>0;i--){
    let  ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() =>{
    // getting hours, minutes,second..
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if(h>=12){
        h = h-12;
        ampm ="PM";
    }
    // if hour value is zero,set this value is to 12.
    h = h == 0 ? h = 12 : h;

    // adding 0 before hr, min, sec if this value is less than 10.
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if(alaramTime == `${h}:${m} ${ampm}`){
        ringing.play(); 
        ringing.loop = true;
    }
}, 1000);

function setAlaram(){
    if(isAlaramSet){
        alaramTime = "";
        ringing.pause();
        content.classList.remove("disable");
        setAlaramBtn.innerText ="Set Alaram";
        return isAlaramSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Please Enter a valid time to set alaram");
    }
    isAlaramSet =true;
    alaramTime = time;
    content.classList.add('disable');
    setAlaramBtn.innerText = "Clear Alaram"
    
}

setAlaramBtn.addEventListener("click", setAlaram);