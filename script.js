// ================= RAMAZON BOSHLANISH SANASI =================
const ramadanStart = new Date(2026, 1, 18);

// ================= VAQTLAR =================
const samarqand = [
"06:02 / 18:17","06:01 / 18:18","05:59 / 18:19","05:58 / 18:20","05:57 / 18:21",
"05:56 / 18:22","05:54 / 18:23","05:53 / 18:25","05:51 / 18:26","05:50 / 18:27",
"05:49 / 18:28","05:47 / 18:29","05:46 / 18:30","05:44 / 18:31","05:43 / 18:32",
"05:41 / 18:33","05:40 / 18:34","05:38 / 18:35","05:37 / 18:36","05:35 / 18:37",
"05:33 / 18:38","05:32 / 18:40","05:30 / 18:41","05:29 / 18:42","05:27 / 18:43",
"05:25 / 18:44","05:24 / 18:45","05:22 / 18:46","05:20 / 18:47","05:18 / 18:48"
];

const toshkent = new Array(30).fill("04:20 / 19:00");


// ================= ELEMENTLAR =================
const menu = document.getElementById("menu");
const viloyat = document.getElementById("viloyat");
const duo = document.getElementById("duo");
const contactForm = document.getElementById("contactForm");
const today = document.getElementById("today");
const result = document.getElementById("result");
const searchBox = document.getElementById("searchBox");
const daySearch = document.getElementById("kun");


// ===== UNIVERSAL YOPISH =====
function closeAll(){
    menu.classList.remove("show");
    viloyat.classList.remove("show");
    duo.classList.remove("show");
    contactForm.classList.remove("show");
}


// ===== ASOSIY OYNA BOSHQARUV =====
function showHomeUI(){
    today.style.display="block";
    searchBox.style.display="block";
}

function hideHomeUI(){
    today.style.display="none";
    searchBox.style.display="none";
}


// ================= MENU =================
function toggleMenu(){
    menu.classList.toggle("show");
    viloyat.classList.remove("show");
    duo.classList.remove("show");
}

function toggleViloyat(){
    closeAll();
    hideHomeUI();
    viloyat.classList.add("show");
}

function toggleDuo(){
    closeAll();
    hideHomeUI();
    duo.classList.add("show");
}

function showContact(){
    closeAll();
    hideHomeUI();
    contactForm.classList.add("show");
}

function goHome(){
    closeAll();
    showHomeUI();
    showTodayInfo();
}


// ================= DARK MODE =================
function toggleDarkMode(){
document.body.classList.toggle("dark");
localStorage.setItem("darkMode",document.body.classList.contains("dark"));
}
if(localStorage.getItem("darkMode")==="true"){document.body.classList.add("dark")}


// ================= BUGUNGI KUN =================
function showTodayInfo(){

const todayDate=new Date();
const diffTime=todayDate-ramadanStart;
const day=Math.floor(diffTime/(1000*60*60*24))+1;

if(day<1||day>30){
result.innerHTML="<h2>Ramazon hali boshlanmagan yoki tugagan</h2>";
return;
}

const vaqt=samarqand[day-1];
const sahar=vaqt.split("/")[0].trim();
const iftar=vaqt.split("/")[1].trim();

result.innerHTML=`<h2>🌙 Bugun Ramazon ${day}-kuni</h2>
<p><b>Saharlik:</b> ${sahar}</p>
<p><b>Iftorlik:</b> ${iftar}</p>`;

updateCountdown(iftar);
}


// ================= COUNTDOWN =================
function updateCountdown(iftarTime){

function tick(){
const now=new Date();
const [h,m]=iftarTime.split(":");
const t=new Date();
t.setHours(h,m,0,0);
if(now>t)t.setDate(t.getDate()+1);
const d=t-now;

today.innerHTML=`<h3>Iftorgacha vaqt</h3>
<p style="font-size:24px;font-weight:bold">
${String(Math.floor(d/3600000)).padStart(2,"0")}:
${String(Math.floor(d%3600000/60000)).padStart(2,"0")}:
${String(Math.floor(d%60000/1000)).padStart(2,"0")}
</p>`;
}
tick();
setInterval(tick,1000);
}


// ================= JADVAL =================
function showSamarqand(){
closeAll();
hideHomeUI();

let html="<h2>Samarqand - 30 kunlik jadval</h2>";
samarqand.forEach((v,i)=>html+=`<p>${i+1}-kun: ${v}</p>`);
result.innerHTML=html;
}

function showToshkent(){
closeAll();
hideHomeUI();

let html="<h2>Toshkent - 30 kunlik jadval</h2>";
toshkent.forEach((v,i)=>html+=`<p>${i+1}-kun: ${v}</p>`);
result.innerHTML=html;
}


// ================= QIDIRISH =================
function qidir(){
closeAll();
hideHomeUI();

const day=Number(daySearch.value);
if(!day||day<1||day>30){alert("1 dan 30 gacha kiriting!");return}

result.innerHTML=`<h2>Qidiruv natijasi</h2>
<p>Samarqand ${day}-kun: ${samarqand[day-1]}</p>
<p>Toshkent ${day}-kun: ${toshkent[day-1]}</p>`;
}


// ================= DUOLAR =================
function showSaharDuo(){
closeAll();
hideHomeUI();

result.innerHTML=`<h2>🌙 Saharlik duosi</h2>
<p>NAVAYTU AN ASUVMA SOVMA SHAHRI RAMAZONA MINAL FARJI ILAL MAG'RIBI XOLISAN LILLAHI TA'AALAA ALLOHU AKBAR</p>`;
}

function showIftarDuo(){
closeAll();
hideHomeUI();

result.innerHTML=`<h2>🌙 Iftorlik duosi</h2>
<p>ALLOHUMMA LAKA SUMTU VA BIKA AAMANTU VA A'LAYKA TAVAKKALTU VA A'LAA RIZQIKA AFTARTTU FAG'FIRLIY MA QODDAMTU VA MAA AXXORTU BIROHMATIKA YAA ARHAMAR ROOHIMIYN</p>`;
}


// ================= ALOQA =================
function sendMessage(){
const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const message=document.getElementById("message").value;

if(!name||!email||!message){alert("Maydonlarni to‘ldiring");return}

alert("Rahmat! Xabaringiz qabul qilindi");
document.getElementById("name").value="";
document.getElementById("email").value="";
document.getElementById("message").value="";
}


// ================= SAHIFA OCHILGANDA =================
showHomeUI();
showTodayInfo();
