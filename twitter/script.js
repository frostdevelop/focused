var timel,notif,trend,whofl,right,count = false;
function change() {
	//idc about queryselector that slow
	const divs = document.getElementsByTagName("div");
	for(let i=0;i<divs.length;i++){
		switch(divs[i].getAttribute("aria-label")){
			case "Timeline: Your Home Timeline":
				if(timel){divs[i].style = "opacity: 0% !important;pointer-events: none !important;"}else{divs[i].style = ""};
				break;
			case "Timeline: Notifications":
				if(notif){divs[i].style = "opacity: 0% !important;pointer-events: none !important;"}else{divs[i].style = ""};
				break;
			case "Trending":
				if(right){divs[i].style = "opacity: 0% !important;pointer-events: none !important;"}else{divs[i].style = ""};
				break;
			case "Timeline: Trending now":
				if(trend){divs[i].style = "opacity: 0% !important;pointer-events: none !important;"}else{divs[i].style = ""};
				break;
		}
		//if(right && divs[i].getAttribute("data-testid") === "sidebarColumn"){divs[i].classList.add("undistract_hidden");}else{divs[i].classList.remove("undistract_hidden");} Exactly the same as aria-label: trending
	}
	const wtfelm = document.querySelector('aside[aria-label="Who to follow"]');
	if(wtfelm){
		if(whofl){wtfelm.classList.add("undistract_hidden")}else{wtfelm.classList.remove("undistract_hidden");}
	}
	const countelms = document.querySelector("nav[aria-label='Primary']").querySelectorAll("div[aria-live='polite']");
	for(let i=0;i<countelms.length;i++){if(count){countelms[i].classList.add("undistract_hidden")}else{countelms[i].classList.remove("undistract_hidden")}}
	console.log("hi")
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
	console.dir(m);
	timel = m.timel;
	notif = m.notif;
	trend = m.trend;
	whofl = m.whofl;
	right = m.right;
	count = m.count;
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
			count = data.count;
			change();
			break;
	}
})
observer.observe(document, {
	childList: true,
	subtree: true
});