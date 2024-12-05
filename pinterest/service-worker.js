'use strict';
//Must have chrome 99+
var sdata = {
	version: 1,
	block: {
		set: 0,
		data: ""
	},
	mbutn: false,
	rpins: false,
	hfeed: false,
	srbar: false
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
chrome.runtime.onMessage.addListener((obj, sender, res)=>{
	const {
		type,
		data
	} = obj;
	switch(type){
		case "settingrequest":
			if(sender.tab && !btabs.includes(sender.tab.id)){btabs.push(sender.tab.id);console.log(sender.tab.id);};
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
			break;
		case "flagupdate":
			sdata.mbutn = data.mbutn;
			sdata.rpins = data.rpins;
			sdata.hfeed = data.hfeed;
			sdata.srbar = data.srbar;
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
chrome.storage.local.get(["blind_settings","blind_ex_settings"]).then((d)=>{
	if(d.blind_settings){sdata = d.blind_settings;if(sdata.version < 1){sdata.version = 1;sdata.srbar = false;chrome.storage.local.set({"blind_settings":sdata});}}else{console.log("Empty settings! Creating new...");chrome.storage.local.set({"blind_settings":sdata});};
	if(d.blind_ex_settings){param = d}else{console.log("Empty exsettings! Creating new...");chrome.storage.local.set({"blind_ex_settings":param});};
});
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
	console.debug(info)
	if(sdata.block.set === 3){
		const hosturl = ((tab.url).split("/"))[2];
		console.log(hosturl);
		if(info.url && hosturl === "www.pinterest.com"){
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