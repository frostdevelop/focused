'use strict';
//Must have chrome 99+
var sdata = {
	version: 2,
	block: {
		set: 0,
		data: ""
	},
	inbox: false,
	slist: false,
	fsbar: false,
	hpbtn: false,
	dlist: false,
	mlist: false,
	clist: false
}
var btabs = [];
var param = {
	version: 1, 
	sbadge: true,
	rnotes: false
}
/*
async function sendMessageToActiveTab(message) {
	const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
	const response = await chrome.tabs.sendMessage(tab.id, message);
	// do something with response here, not outside the function
	return response;
}
*/
function updBdg(){
	if(param.sbadge){
		chrome.action.setBadgeText({text: btabs.length.toString()});
	}else{
		chrome.action.setBadgeText({text: ""});
	}
}
async function vBtabs(){
	for(let i=btabs.length-1;i>=0;i--){
		chrome.tabs.get(btabs[i],()=>{if(chrome.runtime.lastError){btabs.splice(i,1);console.log(btabs)}})
	}
}
function updIco(){
	switch(sdata.block.set){
		case 0:
			chrome.action.setIcon({
				path: {
					16: "icon-16.png",   // Path to the 16x16 icon
					48: "icon-48.png",   // Path to the 48x48 icon
					128: "icon-128.png"  // Path to the 128x128 icon
				}
			}, () => {
				if (chrome.runtime.lastError) {
					console.error(chrome.runtime.lastError);
				} else {
					console.log("Icon successfully updated!");
				}
			});
			break;
		default:
			chrome.action.setIcon({
				path: {
					16: "ocon-16.png",   // Path to the 16x16 icon
					48: "ocon-48.png",   // Path to the 48x48 icon
					128: "ocon-128.png"  // Path to the 128x128 icon
				}
			}, () => {
				if (chrome.runtime.lastError) {
					console.error(chrome.runtime.lastError);
				} else {
					console.log("Icon successfully updated!");
				}
			});
			break;
	}
}
chrome.runtime.onMessage.addListener((obj, sender, res)=>{
	const {
		type,
		data
	} = obj;
	switch(type){
		case "settingrequest":
			if(sender.tab && !btabs.includes(sender.tab.id)){btabs.push(sender.tab.id);chrome.storage.local.set({"blind_tabs":btabs});console.log(sender.tab.id);};
			updBdg();
			res(sdata);
			break;
		case "prefrequest":
			res(param);
			break;
		case "validtabrequest":
			//if(btabs.contains(atab.id)){res(true)}else{res(false)}
			(async()=>{
				const [atab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
				//console.log(atab)
				//console.log(btabs)
				//console.log(atab.id)
				//console.log(btabs.includes(atab.id))
				res(btabs.includes(atab.id));
				/*
				res(new Promise(async resol => {
					
				}));
				*/
			})();
			return true;
			break;
		case "blockupdate":
			sdata.block.set = data.set;
			sdata.block.data = data.data;
			chrome.storage.local.set({"blind_settings":sdata});
			for(let i=0;i<btabs.length;i++){
				chrome.tabs.sendMessage(btabs[i],obj);
			};
			updIco();
			break;
		case "flagupdate":
			sdata.slist = data.slist;
			sdata.inbox = data.inbox;
			sdata.clist = data.clist;
			sdata.mlist = data.mlist;
			sdata.dlist = data.dlist;
			sdata.hpbtn = data.hpbtn;
			sdata.fsbar = data.fsbar;
			//console.log(sdata);
			chrome.storage.local.set({"blind_settings":sdata});
			for(let i=0;i<btabs.length;i++){
				chrome.tabs.sendMessage(btabs[i],obj);
			};
			break;
		case "prefupdate":
			param = data;
			updBdg();
			chrome.storage.local.set({"blind_ex_settings":param});
			break;
	}
});
//Request storage for sdata
chrome.storage.local.get(["blind_settings","blind_ex_settings","blind_tabs"]).then((d)=>{
	if(d.blind_settings){sdata = d.blind_settings;if(sdata.version < 2){sdata.clist = sdata.mlist = sdata.dlist = sdata.hpbtn = sdata.fsbar = false;sdata.version = 2;chrome.storage.local.set({"blind_settings":sdata});};updIco();}else{console.log("Empty settings! Creating new...");chrome.storage.local.set({"blind_settings":sdata});};
	if(d.blind_ex_settings){param.sbadge = d.blind_ex_settings.sbadge || true;param.version = d.blind_ex_settings.version || 1;param.rnotes = d.blind_ex_settings.rnotes || false;}else{console.log("Empty exsettings! Creating new...");chrome.storage.local.set({"blind_ex_settings":param});};
	if(d.blind_tabs){btabs = d.blind_tabs;vBtabs();};
	updIco();
});
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
	console.debug(info)
	if(sdata.block.set === 3){
		const hosturl = ((tab.url).split("/"))[2];
		if(info.url && (hosturl === "discord.com" || hosturl === "discord.gg")){
			try{
				await chrome.tabs.remove(tabId);
			} catch(e) {
				console.error("Tab removing error:", e)
			}
		}
	}
});
chrome.tabs.onRemoved.addListener((tabId,info)=>{
	const indexbtab = btabs.indexOf(tabId);
	if(indexbtab>=0){
		btabs.splice(indexbtab,1);
		chrome.storage.local.set({"blind_tabs":btabs});
		updBdg();
	}
});

chrome.runtime.onInstalled.addListener((det)=>{
	switch(det.reason){
		case "install":
			//chrome.storage.local.set({"blind_settings":sdata});
			break;
		case "update":
			if(param.rnotes) chrome.tabs.create({url: "https://github.com/frostdevelop/focused/releases"});
			break;
	}
});
//chrome.runtime.setUninstallURL()
chrome.action.setBadgeBackgroundColor({color:"#165c7a"});
//chrome.runtime.connect().onDisconnect.addListener()