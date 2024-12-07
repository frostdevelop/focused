var serverlist,inbox,clist,mlist,dlist,hpbtn,fsbar = false;
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
			/*
			case "Servers sidebar":
				if(fsbar){divs[i].style.display = "none";}else{divs[i].style.display = "";}
				break;
			case "Members":
				if(mlist){divs[i].style.display = "none";}else{divs[i].style.display = "";}
				break;
			*/
		}
	}
	const dlistelm = document.querySelector('nav[aria-label="Private channels"]');
	const clistelm = document.getElementById("channels");
	const hpbtnelm = document.querySelector('ul[data-list-id="guildsnav"]')?.children[1]?.firstChild?.firstChild;
	const mlistelm = document.querySelector('ul[aria-label="Members"]');
	const fsbarelm = document.querySelector('nav[aria-label="Servers sidebar"]');
	if(dlistelm){if(dlist){dlistelm.style.display = "none";}else{dlistelm.style.display = "";}};
	if(clistelm){if(clist){clistelm.style.display = "none";}else{clistelm.style.display = "";}};
	if(hpbtnelm){if(hpbtn){hpbtnelm.style.display = "none";}else{hpbtnelm.style.display = "";}};
	if(mlistelm){if(mlist){mlistelm.style.display = "none";}else{mlistelm.style.display = "";}};
	if(fsbarelm){if(fsbar){fsbarelm.style.display = "none";}else{fsbarelm.style.display = "";}};
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
	clist = m.clist;
	mlist = m.mlist;
	dlist = m.dlist;
	hpbtn = m.hpbtn;
	fsbar = m.fsbar;
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
			clist = data.clist;
			mlist = data.mlist;
			dlist = data.dlist;
			hpbtn = data.hpbtn;
			fsbar = data.fsbar;
			change();
			break;
	}
})
observer.observe(document.body, {
	childList: true,
	subtree: true
});