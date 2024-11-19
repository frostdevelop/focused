var serverlist,inbox = false;
function change() {
	//idc about queryselector that slow
	if(serverlist || inbox){
		const divs = document.getElementsByTagName("div");
		for(let i=0;i<divs.length;i++){
			switch(divs[i].getAttribute("aria-label")){
				case "Servers":
					if(serverlist) divs[i].style.display = "none";
				case "Inbox":
					if(inbox) divs[i].style.display = "none";
			}
		}
	}
}
const observer = new MutationObserver(mutations => {change();});

//Get settings
chrome.runtime.sendMessage({type: "settingrequest",data: {}},(m)=>{
	switch(m.block.set){
		case 1:
			window.location.href = m.block.data;
			break;
		case 2:
			document.write(m.block.data);
			break;
	}
	serverlist = m.slist;
	inbox = m.inbox;
	window.onbeforeunload = ()=>{chrome.runtime.sendMessage({type: "tabremove",data: {}})}
})
chrome.runtime.onMessage.addListener((obj, sender, res) => {
	const {
		type,
		data
	} = obj;
	switch(type){
		/*
		case "settingresponse":
			switch(data.block.set){
				case 1:
					window.location.href = data.block.data;
					break;
				case 2:
					document.write(data.block.data);
					break;
			}
			serverlist = data.slist;
			inbox = data.inbox;
			window.onbeforeunload = ()=>{
				chrome.runtime.sendMessage({type: "tabremove",data: {}})
			}
			break;
		*/
		case "blockupdate":
			switch(data.set){
				case 1:
					window.location.href = data.data;
					break;
				case 2:
					document.write(data.data);
					break;
			}
			break;
		case "flagupdate":
			serverlist = data.slist;
			inbox = data.inbox;
			break;
	}
}
observer.observe(document.body, {
	childList: true,
	subtree: true
});