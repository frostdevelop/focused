//friends :>
const hidnotifchk = document.getElementById("hidnotif");
const hidcommechk = document.getElementById("hidcomme");
const hidrevidchk = document.getElementById("hidrevid");
const hidetilechk = document.getElementById("hidetile");
const hidhomepchk = document.getElementById("hidhomep");
const hidhomefchk = document.getElementById("hidhomef");
const hidshortchk = document.getElementById("hidshort");
const hidcpfpschk = document.getElementById("hidcpfps");
const hiduinfochk = document.getElementById("hiduinfo");
const hidlsectchk = document.getElementById("hidlsect");
const hidcnamechk = document.getElementById("hidcname");
const hiddescrchk = document.getElementById("hiddescr");
const hidscommchk = document.getElementById("hidscomm");
const blkshortchk = document.getElementById("blkshort");
const hidexplochk = document.getElementById("hidexplo");
const hidmfyouchk = document.getElementById("hidmfyou");
const hidsubscchk = document.getElementById("hidsubsc");
const hidmnavichk = document.getElementById("hidmnavi");
const hidplaylchk = document.getElementById("hidplayl");
const hidlchatchk = document.getElementById("hidlchat");
const hiddonshchk = document.getElementById("hiddonsh");
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
  hidnotifchk.checked = m.notif;
  hidcommechk.checked = m.comme;
  hidrevidchk.checked = m.revid;
  hidetilechk.checked = m.etile;
  hidhomepchk.checked = m.homep;
  hidhomefchk.checked = m.homef;
  hidshortchk.checked = m.short;
  hidcpfpschk.checked = m.cpfps;
  hiduinfochk.checked = m.uinfo;
  hidlsectchk.checked = m.lsect;
  hidcnamechk.checked = m.cname;
  hiddescrchk.checked = m.descr;
  hidscommchk.checked = m.scomm;
  blkshortchk.checked = m.bshor;
  hidexplochk.checked = m.explo;
  hidmfyouchk.checked = m.mfyou;
  hidsubscchk.checked = m.subsc;
  hidmnavichk.checked = m.mnavi;
  hidplaylchk.checked = m.playl;
  hidlchatchk.checked = m.lchat;
  hiddonshchk.checked = m.donsh;
  
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
  chrome.runtime.sendMessage({type:"flagupdate",data:{
    notif: hidnotifchk.checked,
    comme: hidcommechk.checked,
    revid: hidrevidchk.checked,
    etile: hidetilechk.checked,
    homep: hidhomepchk.checked,
    homef: hidhomefchk.checked,
    short: hidshortchk.checked,
    cpfps: hidcpfpschk.checked,
    uinfo: hiduinfochk.checked,
    lsect: hidlsectchk.checked,
    cname: hidcnamechk.checked,
    descr: hiddescrchk.checked,
    scomm: hidscommchk.checked,
    bshor: blkshortchk.checked,
    explo: hidexplochk.checked,
    mfyou: hidmfyouchk.checked,
    subsc: hidsubscchk.checked,
    mnavi: hidmnavichk.checked,
    playl: hidplaylchk.checked,
    lchat: hidlchatchk.checked,
    donsh: hiddonshchk.checked
  }});
}
function updblock(){
  chrome.runtime.sendMessage({type:"blockupdate",data:{set:parseInt(waction.value),data:(waction.value === "1" ? urlaction.value : (waction.value === "2" ? htmlaction.value : "") )}});
}
function updexset(){
  chrome.runtime.sendMessage({type:"prefupdate",data:{sbadge:badgechk.checked,rnotes:rnotechk.checked}});
}
hidnotifchk.addEventListener("change",updflags);
hidcommechk.addEventListener("change",updflags);
hidrevidchk.addEventListener("change",updflags);
hidetilechk.addEventListener("change",updflags);
hidhomepchk.addEventListener("change",updflags);
hidhomefchk.addEventListener("change",updflags);
hidshortchk.addEventListener("change",updflags);
hidcpfpschk.addEventListener("change",updflags);
hiduinfochk.addEventListener("change",updflags);
hidlsectchk.addEventListener("change",updflags);
hidcnamechk.addEventListener("change",updflags);
hiddescrchk.addEventListener("change",updflags);
hidscommchk.addEventListener("change",updflags);
blkshortchk.addEventListener("change",updflags);
hidexplochk.addEventListener("change",updflags);
hidmfyouchk.addEventListener("change",updflags);
hidsubscchk.addEventListener("change",updflags);
hidmnavichk.addEventListener("change",updflags);
hidplaylchk.addEventListener("change",updflags);
hidlchatchk.addEventListener("change",updflags);
hiddonshchk.addEventListener("change",updflags);
waction.addEventListener("change",updblock);
urlaction.addEventListener("change",updblock);
htmlaction.addEventListener("change",updblock);
badgechk.addEventListener("change",updexset);
rnotechk.addEventListener("change",updexset);
invdialog.addEventListener("click",e=>{invdialog.classList.add("hid")});