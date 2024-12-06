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
			case "Servers sidebar":
				if(fsbar){divs[i].style.display = "none !important";}else{divs[i].style.display = "";}
				break;
			case "Members":
				if(mlist){divs[i].style.display = "none !important";}else{divs[i].style.display = "";}
				break;
		}
	}
	if(dlist){document.querySelector('nav[aria-label="Private channels"]').style.display = "none !important";}else{document.querySelector('nav[aria-label="Private channels"]').style.display = "";};
	if(clist){document.getElementById("channels").style.display = "none !important";}else{document.getElementById("channels").style.display = "";};
	if(hpbtn){document.querySelector('ul[data-list-id="guildsnav"]').children[1].firstChild.firstChild.style.display = "none !important";}else{document.querySelector('ul[data-list-id="guildsnav"]').children[1].firstChild.firstChild.style.display = "";};
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