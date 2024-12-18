var inb,nav,rsb,ser,msg = false;
function change() {
	if(rsb){document.getElementById("right-sidebar-container").style.display = "none"}else{document.getElementById("right-sidebar-container").style.display = "";}
	if(nav){document.getElementsByTagName("reddit-sidebar-nav")[0].style.display = "none";}else{document.getElementsByTagName("reddit-sidebar-nav")[0].style.display = "";}
	if(inb){document.querySelector('span[data-part="inbox"]').style.display = "none";}else{document.querySelector('span[data-part="inbox"]').style.display = "";}
	const serelm = document.getElementsByTagName("reddit-search-large")[0];
	const msgelm = document.getElementsByTagName('reddit-chat-header-button')[0];
	if(serelm){if(ser){serelm.style.display = "none";}else{serelm.style.display = "";}}
	if(msgelm){if(msg){msgelm.style.display = "none";}else{msgelm.style.display = "";}}
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
	inb = m.inb;
	nav = m.nav;
	rsb = m.rsb;
	ser = m.ser;
	msg = m.msg;
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
			inb = data.inb;
			nav = data.nav;
			rsb = data.rsb;
			ser = data.ser;
			msg = data.msg;
			change();
			break;
	}
})
observer.observe(document.body, {
	childList: true,
	subtree: true
});