var inbox,hfeed,facct,comme,sbars,ucont,rvids = false;
function change() {
	const divs = document.getElementsByTagName("div");
	for(let i=0;i<divs.length;i++){
		swtich(divs[i].getAttribute("data-e2e")){
			case "inbox-icon":
				if(inbox){div[i].display.style = "none !important"}else{div[i].display.style = ""};
				break;
			case "comment-post":
				if(comme){div[i].parentElement.parentElement.parentElement.parentElement.display.style = "none !important"}else{div[i].parentElement.parentElement.parentElement.parentElement.display.style = ""}
				break;
			case "search-comment-container":
				if(comme){div[i].display.style = "none !important"}else{div[i].display.style = ""};
				break;
			case "user-page":
				if(ucont){div[i].firstChild.children[1].display.style = "none !important"}else{div[i].firstChild.children[1].display.style = ""};
				break;
			
		}
	}
	if(hfeed){document.getElementsByTagName("nav")[0].style.display = "none"}else{document.getElementsByTagName("nav")[0].style.display = ""};
	//if(inbox){document.querySelector('div[data-e2e="inbox-icon"]').style.display = "none"}else{document.querySelector('div[data-e2e="inbox-icon"]').style.display = ""};
	if(facct){document.querySelector('h2[data-e2e="following-accounts"]').parentElement.display.style = "none !important"}else{document.querySelector('h2[data-e2e="following-accounts"]').parentElement.display.style = ""};
	//if(comme){document.querySelector("div[data-e2e='comment-post']").parentElement.parentElement.parentElement.parentElement.display.style = "none !important"}else{document.querySelector("div[data-e2e='comment-post']").parentElement.parentElement.parentElement.parentElement.display.style = ""};
	if(sbars){document.querySelector('form[data-e2e="search-box"][action="/search"]').display.style = "none !important";document.querySelector("input[placeholder='Find related content'][type='search'][aria-label='Find related content'][data-e2e='search-user-input']").display.style = "none !important";}else{document.querySelector('form[data-e2e="search-box"][action="/search"]').display.style = "";document.querySelector("input[placeholder='Find related content'][type='search'][aria-label='Find related content'][data-e2e='search-user-input']").display.style = "";};
	if(rvids){document.getElementById("main-content-video_detail").firstChild.children[1].firstChild.firstChild.firstChild.children[6].display.style = "none !important"}else{document.getElementById("main-content-video_detail").firstChild.children[1].firstChild.firstChild.firstChild.children[6].display.style = ""};
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
	facct = m.facct;
	comme = m.comme;
	sbars = m.sbars;
	ucont = m.ucont;
	rvids = m.rvids;
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
			facct = data.facct;
			comme = data.comme;
			sbars = data.sbars;
			ucont = data.ucont;
			rvids = data.rvids;
			change();
			break;
	}
})
observer.observe(document.body, {
	childList: true,
	subtree: true
});