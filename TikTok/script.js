var inbox,hfeed,facct,comme,sbars,ucont,rvids = false;
function change() {
	const divs = document.getElementsByTagName("div");
	for(let i=0;i<divs.length;i++){
		switch(divs[i].getAttribute("data-e2e")){
			case "inbox-icon":
				if(inbox){divs[i].style.display = "none";/*console.log(divs[i].style.display)*/}else{divs[i].style.display = "";};
				//console.log(divs[i])
				break;
			case "comment-post":
				if(comme){divs[i].parentElement.parentElement.parentElement.parentElement.style.display = "none"}else{divs[i].parentElement.parentElement.parentElement.parentElement.style.display = ""}
				break;
			case "search-comment-container":
				if(comme){divs[i].style.display = "none"}else{divs[i].style.display = ""};
				break;
			case "user-page":
				//const elm = divs[i].firstChild ? (divs[i].firstChild.children.length > 1 ? divs[i].firstChild.children[1] : null) : null;
				const elm = divs[i]?.firstChild?.children[1];
				if(elm){
					if(ucont){elm.style.display = "none"}else{elm.style.display = ""};
				};
				break;
			
		}
	}
	const navelm = document.getElementsByTagName("nav").length > 0 ? document.getElementsByTagName("nav")[0] : null;
	if(navelm){
	if(hfeed){navelm.style.display = "none"}else{navelm.style.display = ""};
	}
	//if(inbox){document.querySelector('div[data-e2e="inbox-icon"]').style.display = "none"}else{document.querySelector('div[data-e2e="inbox-icon"]').style.display = ""};
	const felm = document.querySelector('h2[data-e2e="following-accounts"]') ? document.querySelector('h2[data-e2e="following-accounts"]').parentElement : null;
	if(felm){if(facct){felm.style.display = "none"}else{felm.style.display = ""};};
	//if(comme){document.querySelector("div[data-e2e='comment-post']").parentElement.parentElement.parentElement.parentElement.style.display = "none"}else{document.querySelector("div[data-e2e='comment-post']").parentElement.parentElement.parentElement.parentElement.style.display = ""};
	/*
	const sbarselm1 = document.querySelector('form[data-e2e="search-box"][action="/search"]');
	const sbarselm2 = document.querySelector("input[placeholder='Find related content'][type='search'][aria-label='Find related content'][data-e2e='search-user-input']");
	if(sbars){
		if(sbarselm1){sbarselm1.style.display = "none"};
		if(sbarselm2){sbarselm2.style.display = "none"};
	}else{
		if(sbarselm1){sbarselm1.style.display = ""};
		if(sbarselm2){sbarselm2.style.display = ""};
	};
	*/
	const sbarselm = document.querySelectorAll('form[data-e2e="search-box"][action="/search"]');
	if(sbars){
		for(let i=0;i<sbarselm.length;i++){
			sbarselm[i].style.display = "none";
		}
	}else{
		for(let i=0;i<sbarselm.length;i++){
			sbarselm[i].style.display = "";
		}
	}
	// AHHHHH const rvidselm = document.getElementById("main-content-video_detail") ? (document.getElementById("main-content-video_detail").firstChild ? (document.getElementById("main-content-video_detail").firstChild.children.length > 1 ? (document.getElementById("main-content-video_detail").firstChild.children[1].firstChild ? (document.getElementById("main-content-video_detail").firstChild.children[1].firstChild.firstChild ? (document.getElementById("main-content-video_detail").firstChild.children[1].firstChild.firstChild.firstChild ? : []) : []) : []): []) : []) : [];
	//const rvidselm = document.getElementById("main-content-video_detail")?.firstChild?.children[1]?.firstChild?.firstChild?.firstChild?.children[6];
	const rvidselm = document.getElementById("main-content-video_detail")?.firstChild?.children[1]?.children[1];
	if(rvidselm){
		if(rvids){rvidselm.style.display = "none"}else{rvidselm.style.display = ""};
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