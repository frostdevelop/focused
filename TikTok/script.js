var inbox,hfeed = false;
function change() {
	if(hfeed){document.getElementsByTagName("nav")[0].style.display = "none"}else{document.getElementsByTagName("nav")[0].style.display = ""};
	if(inbox){document.querySelector('div[data-e2e="inbox-icon"]').style.display = "none"}else{document.querySelector('div[data-e2e="inbox-icon"]').style.display = ""};
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
	inbox = m.inbox;
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
			inbox = data.inbox;
			hfeed = data.hfeed;
			change();
			break;
	}
})
observer.observe(document.body, {
	childList: true,
	subtree: true
});