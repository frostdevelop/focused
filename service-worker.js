'use strict';
//Must have chrome 99+
var sdata = {
	block: {
		set: 0,
		data: "",
	}
	inbox: false,
	slist: false
}
var btabs = [];
async function sendMessageToActiveTab(message) {
	const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
	const response = await chrome.tabs.sendMessage(tab.id, message);
	// do something with response here, not outside the function
	return response;
}
chrome.runtime.onMessage.addListener(async (obj, sender, res)=>{
	const {
		type,
		data
	} = obj;
	switch(type){
		case "settingrequest":
			if(sender.tab){btabs.push(sender.tab.id)};
			res(sdata);
			break;
		case "validtabrequest":
			const [atab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
			if(btabs.contains(atab.id)){res(true)}else{res(false)}
			break;
		case "tabremove":
			if(sender.tab){btabs.splice(btabs.indexOf(sender.tab.id),1)}else{console.error("tabremove msg from non-tab sender")}
			break;
		case "blockupdate":
			
			break;
		case "flagupdate":
			btabs.slist = data.slist;
			btabs.inbox = data.inbox;
			chrome.storage.local.set({"blind-settings":sdata})
			break;
	}
	if(type === "stopimport"){
		let activeimports = await chrome.storage.local.get(["imports"]);
		activeimports = activeimports.imports;
		console.log(activeimports);
		if(activeimports != undefined){
			for(let i=0; i<activeimports.length; i++){
				try{
					await chrome.tabs.remove(activeimports[i]);
				} catch(e) {
					console.error("Tab removing error:", e)
				}
			}
			await chrome.storage.local.set({"imports": []});
		}
	}
});
//Request storage for sdata
chrome.storage.local.get(["blind-settings"]).then((d)=>{
	if(d != undefined){sdata = d}else{console.log("")}
});
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
	
	try{
		await chrome.tabs.remove(activeimports[i]);
	} catch(e) {
		console.error("Tab removing error:", e)
	}
})