//friends :>
const hidinbchk = document.getElementById("hidinbox");
const hidlistchk = document.getElementById("hidslist");
const hidfsbarchk = document.getElementById("hidfsbar");
const hidclistchk = document.getElementById("hidclist");
const hidmlistchk = document.getElementById("hidmlist");
const hiddlistchk = document.getElementById("hiddlist");
const hidhpbtnchk = document.getElementById("hidhpbtn");
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
  hidinbchk.checked = m.inbox;
  hidlistchk.checked = m.slist;
  hidfsbarchk.checked = m.fsbar;
  hidhpbtnchk.checked = m.hpbtn;
  hiddlistchk.checked = m.dlist;
  hidmlistchk.checked = m.mlist;
  hidclistchk.checked = m.clist;
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
  chrome.runtime.sendMessage({type:"flagupdate",data:{slist:hidlistchk.checked,inbox:hidinbchk.checked,mlist: hidmlistchk.checked,fsbar: hidfsbarchk.checked,hpbtn: hidhpbtnchk.checked,dlist: hiddlistchk.checked,clist: hidclistchk.checked}});
  //console.dir({slist:hidlistchk.checked,inbox:hidinbchk.checked})
}
function updblock(){
  chrome.runtime.sendMessage({type:"blockupdate",data:{set:parseInt(waction.value),data:(waction.value === "1" ? urlaction.value : (waction.value === "2" ? htmlaction.value : "") )}});
  //console.dir({set:parseInt(waction.value),data:(waction.value === "1" ? urlaction.value : (waction.value === "2" ? htmlaction.value : "") )});
}
function updexset(){
  chrome.runtime.sendMessage({type:"prefupdate",data:{sbadge:badgechk.checked,rnotes:rnotechk.checked}});
}
hidlistchk.addEventListener("change",updflags);
hidinbchk.addEventListener("change",updflags);
hidfsbarchk.addEventListener("change",updflags);
hidhpbtnchk.addEventListener("change",updflags);
hiddlistchk.addEventListener("change",updflags);
hidmlistchk.addEventListener("change",updflags);
hidclistchk.addEventListener("change",updflags);
waction.addEventListener("change",updblock);
urlaction.addEventListener("change",updblock);
htmlaction.addEventListener("change",updblock);
badgechk.addEventListener("change",updexset);
rnotechk.addEventListener("change",updexset);
/*
htmlaction.addEventListener("click",()=>{
invdialog.classList.toggle("hid")
})
*/
invdialog.addEventListener("click",e=>{invdialog.classList.add("hid")});