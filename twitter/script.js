var timel,notif,trend,whofl,right = false;
function change() {
	//idc about queryselector that slow
	const divs = document.getElementsByTagName("div");
	for(let i=0;i<divs.length;i++){
		switch(divs[i].getAttribute("aria-label")){
			case "Timeline: Your Home Timeline":
				if(timel){divs[i].style.display = "none"}else{divs[i].style.display = ""};
				break;
			case "Timeline: Notifications":
				if(notif){divs[i].style.display = "none";}else{divs[i].style.display = ""};
				break;
			case "Trending":
				if(trend){divs[i].style.display = "none";}else{divs[i].style.display = ""};
				break;
		}
		if(right && divs[i].getAttribute("data-testid") === "sidebarColumn"){divs[i].style.display = "none";}else{divs[i].style.display = "";}
	}
	if(whofl){document.querySelector('asiade[aria-label="Who to follow"]').style.display = "none";}else{document.querySelector('asiade[aria-label="Who to follow"]').style.display = "";}
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
	timel = m.timel;
	notif = m.notif;
	trend = m.trend;
	whofl = m.whofl;
	right = m.right;
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
			timel = data.timel;
			notif = data.notif;
			trend = data.trend;
			whofl = data.whofl;
			right = data.right;
			change();
			break;
	}
})
observer.observe(document.body, {
	childList: true,
	subtree: true
});