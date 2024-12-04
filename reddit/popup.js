//friends :>
const hidinbchk = document.getElementById("hidinb");
const hidnavchk = document.getElementById("hidnav");
const hidrsbchk = document.getElementById("hidrsb");
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
  hidinbchk.checked = m.inb;
  hidnavchk.checked = m.nav;
  hidrsbchk.checked = m.rsb;
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
  //alert("hi");
  chrome.runtime.sendMessage({type:"flagupdate",data:{inb:hidinbchk.checked,nav:hidnavchk.checked,rsb:hidrsbchk.checked}});
  //console.dir({slist:hidlistchk.checked,inbox:hidinbchk.checked})
}
function updblock(){
  chrome.runtime.sendMessage({type:"blockupdate",data:{set:parseInt(waction.value),data:(waction.value === "1" ? urlaction.value : (waction.value === "2" ? htmlaction.value : "") )}});
  //console.dir({set:parseInt(waction.value),data:(waction.value === "1" ? urlaction.value : (waction.value === "2" ? htmlaction.value : "") )});
}
function updexset(){
  chrome.runtime.sendMessage({type:"prefupdate",data:{sbadge:badgechk.checked,rnotes:rnotechk.checked}});
}
hidinbchk.addEventListener("change",updflags);
hidnavchk.addEventListener("change",updflags);
hidrsbchk.addEventListener("change",updflags);
waction.addEventListener("change",updblock);
urlaction.addEventListener("change",updblock);
htmlaction.addEventListener("change",updblock);
badgechk.addEventListener("change",updexset);
rnotechk.addEventListener("change",updexset);
invdialog.addEventListener("click",e=>{invdialog.classList.add("hid")});