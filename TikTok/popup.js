//friends :>
const hidhfeedchk = document.getElementById("hidhfeed");
const hidinboxchk = document.getElementById("hidinbox");
const hidfacctchk = document.getElementById("hidfacct");
const hidcommechk = document.getElementById("hidcomme");
const hidsbarschk = document.getElementById("hidsbars");
const hiducontchk = document.getElementById("hiducont");
const hidrvidschk = document.getElementById("hidrvids");
const waction = document.getElementById("act-sel");
const urlaction = document.getElementById("act-url");
const htmlaction = document.getElementById("act-html");
const invdialog = document.getElementById("dia-inv");
const badgechk = document.getElementById("exset-badge");
const rnotechk = document.getElementById("exset-rn");

chrome.runtime.sendMessage({type:"validtabrequest",data:{}}).then((b)=>{
  if(!b){invdialog.classList.remove("hid")};
});
chrome.runtime.sendMessage({type:"settingrequest",data:{}}).then((m)=>{
  //console.log(m)
  hidhfeedchk.checked = m.hfeed;
  hidinboxchk.checked = m.inbox;
  hidfacctchk.checked = m.facct;
  hidcommechk.checked = m.comme;
  hidsbarschk.checked = m.sbars;
  hiducontchk.checked = m.ucont;
  hidrvidschk.checked = m.rvids;
  waction.value = m.block.set.toString();
  switch(m.block.set){
    case 1:
      urlaction.value = m.block.data;
      break;
    case 2:
      htmlaction.innerText = m.block.data;
      break;
  }
});
chrome.runtime.sendMessage({type:"prefrequest",data:{}}).then((m)=>{
  //console.log(m)
  badgechk.checked = m.sbadge;
  rnotechk.checked = m.rnotes;
});


function updflags(){
  chrome.runtime.sendMessage({type:"flagupdate",data:{inbox:hidinboxchk.checked,hfeed:hidhfeedchk.checked,facct:hidfacctchk.checked,comme:hidcommechk.checked,sbars:hidsbarschk.checked,ucont:hiducontchk.checked,rvids:hidrvidschk.checked}});
}
function updblock(){
  chrome.runtime.sendMessage({type:"blockupdate",data:{set:parseInt(waction.value),data:(waction.value === "1" ? urlaction.value : (waction.value === "2" ? htmlaction.value : "") )}});
}
function updexset(){
  chrome.runtime.sendMessage({type:"prefupdate",data:{sbadge:badgechk.checked,rnotes:rnotechk.checked}});
}
hidinboxchk.addEventListener("change",updflags);
hidhfeedchk.addEventListener("change",updflags);
hidfacctchk.addEventListener("change",updflags);
hidcommechk.addEventListener("change",updflags);
hidsbarschk.addEventListener("change",updflags);
hiducontchk.addEventListener("change",updflags);
hidrvidschk.addEventListener("change",updflags);
waction.addEventListener("change",updblock);
urlaction.addEventListener("change",updblock);
htmlaction.addEventListener("change",updblock);
badgechk.addEventListener("change",updexset);
rnotechk.addEventListener("change",updexset);
invdialog.addEventListener("click",e=>{invdialog.classList.add("hid")});