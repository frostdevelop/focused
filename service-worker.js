'use strict';
//Must have chrome 99+
var sdata = {
	block: {
		set: 0,
		data: ""
	},
	inbox: false,
	slist: false
}
var btabs = [];
var param = {
	sbadge: true
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
	chrome.browserAction.setBadgeText({text: btabs.length.toString()});
}
chrome.runtime.onMessage.addListener(async (obj, sender, res)=>{
	const {
		type,
		data
	} = obj;
	switch(type){
		case "settingrequest":
			if(sender.tab){btabs.push(sender.tab.id)};
			updBdg();
			res(sdata);
			break;
		case "prefrequest":
			res(param);
			break;
		case "validtabrequest":
			const [atab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
			//if(btabs.contains(atab.id)){res(true)}else{res(false)}
			res(btabs.contains(atab.id));
			break;
		case "tabremove":
			if(sender.tab){btabs.splice(btabs.indexOf(sender.tab.id),1);updBdg()}else{console.error("tabremove msg from non-tab sender")};
			break;
		case "blockupdate":
			sdata.block.set = data.set;
			sdata.block.data = data.data;
			chrome.storage.local.set({"blind_settings":sdata});
			break;
		case "flagupdate":
			sdata.slist = data.slist;
			sdata.inbox = data.inbox;
			chrome.storage.local.set({"blind_settings":sdata});
			break;
		case "prefupdate":
			param = data;
			chrome.storage.local.set({"blind_ex_settings":param});
			break;
	}
});
//Request storage for sdata
chrome.storage.local.get(["blind_settings","blind_ex_settings"]).then((d)=>{
	if(d.blind_settings){sdata = d.blind_settings}else{console.log("Empty settings! Creating new...");chrome.storage.local.set({"blind_settings":sdata});};
	if(d.blind_ex_settings){param = d}else{console.log("Empty exsettings! Creating new...");chrome.storage.local.set({"blind_ex_settings":param});};
});
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
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
chrome.runtime.onInstalled.addListener((det)=>{
	switch(det.reason){
		case "install":
			//chrome.storage.local.set({"blind_settings":sdata});
			break;
		case "update":
			chrome.tabs.create({url: "https://github.com/frostdevelop/focused/releases"})
			break;
	}
});
//chrome.runtime.setUninstallURL()
chrome.browserAction.setBadgeBackgroundColor({color:"#165c7a"});