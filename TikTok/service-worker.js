'use strict';
//Must have chrome 99+
var sdata = {
	version: 1,
	block: {
		set: 0,
		data: ""
	},
	inbox: false,
	hfeed: false
}
var btabs = [];
var param = {
	version: 1,
	sbadge: true,
	rnotes: true
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
				res(btabs.includes(atab.id));
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
			sdata.inbox = data.inbox;
			sdata.hfeed = data.hfeed;
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
	if(d.blind_settings){sdata = d.blind_settings;updIco();}else{console.log("Empty settings! Creating new...");chrome.storage.local.set({"blind_settings":sdata});};
	if(d.blind_ex_settings){param = d.blind_ex_settings}else{console.log("Empty exsettings! Creating new...");chrome.storage.local.set({"blind_ex_settings":param});};
	if(d.blind_tabs){btabs = d.blind_tabs};
});
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
	console.debug(info)
	if(sdata.block.set === 3){
		const hosturl = ((tab.url).split("/"))[2];
		if(info.url && hosturl === "www.tiktok.com"){
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