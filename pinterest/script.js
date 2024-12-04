var mbutn,rpins,hfeed = false;
function change() {
	const divs = document.getElementsByTagName("div");
	for(let i=0;i<divs.length;i++){
		switch(divs[i].getAttribute("data-test-id")){
			case "homefeed-feed":
				if(hfeed){divs[i].style.display = "none"}else{divs[i].style.display = ""};
				break;
			case "relatedPins":
				if(rpins){divs[i].style.display = "none";}else{divs[i].style.display = ""};
				break;
			case "button-container":
				if(mbutn){divs[i].style.display = "none";}else{divs[i].style.display = ""};
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
	mbutn = m.mbutn;
	rpins = m.rpins;
	hfeed = m.hfeed;
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
			mbutn = data.mbutn;
			rpins = data.rpins;
			hfeed = data.hfeed;
			change();
			break;
	}
})
observer.observe(document.body, {
	childList: true,
	subtree: true
});