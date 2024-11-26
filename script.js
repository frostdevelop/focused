var serverlist,inbox = false;
function change() {
	//idc about queryselector that slow
	const divs = document.getElementsByTagName("div");
	for(let i=0;i<divs.length;i++){
		switch(divs[i].getAttribute("aria-label")){
			case "Servers":
				if(serverlist){divs[i].style.display = "none"}else{divs[i].style.display = ""};
				break;
			case "Inbox":
				if(inbox){divs[i].style.display = "none";}else{divs[i].style.display = ""};
				break;
		}
	}
}
const observer = new MutationObserver(mutations => {change();});
//Get settings
chrome.runtime.sendMessage({type: "settingrequest",data: {}}).then((m)=>{
	switch(m.block.set){
		case 1:
			window.location.href = m.block.data;
			break;
		case 2:
			document.open();
			document.write("<html><head><title>Blocked!</title></head><body>"+m.block.data+"</body></html>");
			document.close();
			break;
	}
	serverlist = m.slist;
	inbox = m.inbox;
	//alert(inbox);
	//alert(serverlist);
})
chrome.runtime.onMessage.addListener((obj, sender, res) => {
	const {
		type,
		data
	} = obj;
	//alert(obj)
	switch(type){
		case "blockupdate":
			switch(data.set){
				case 1:
					window.location.href = data.data;
					break;
				case 2:
					document.open();
					document.write("<html><head><title>Blocked!</title></head><body>"+data.data+"</body></html>");
					document.close();
					break;
			}
			break;
		case "flagupdate":
			//console.log(data);
			serverlist = data.slist;
			inbox = data.inbox;
			change();
			break;
	}
})
observer.observe(document.body, {
	childList: true,
	subtree: true
});