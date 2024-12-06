var odata = {
  notif: false,
  comme: false,
  revid: false,
  etile: false,
  homep: false,
  homef: false,
  short: false,
  cpfps: false,
  uinfo: false,
  lsect: false,
  cname: false,
  descr: false,
  scomm: false,
  bshor: false,
  explo: false,
  mfyou: false,
  subsc: false,
  mnavi: false,
  playl: false,
  lchat: false,
  donsh: false
}
var podata = Object.assign({},odata);

function change() {
	if(odata.notif){document.querySelector('button[aria-label="Notifications"]').style.display = "none";podata.notif=odata.notif}else if(podata.notif){document.querySelector('button[aria-label="Notifications"]').style.display = "";podata.notif=odata.notif};
	if(odata.comme){document.querySelector("ytd-comments#comments").style.display = "none";podata.comme = odata.comme}else if(podata.comme){document.querySelector("ytd-comments#comments").style.display = "";podata.comme = odata.comme};
	if(odata.revid){document.getElementById("related").style.display = "none";podata.revid = odata.revid}else if(podata.revid){document.getElementById("related").style.display = "";podata.revid = odata.revid};
	if(odata.etile){document.querySelector("div.html5-endscreen.ytp-player-content.videowall-endscreen.ytp-show-tiles").style.display = "none";podata.etile = odata.etile}else if(podata.etile){document.querySelector("div.html5-endscreen.ytp-player-content.videowall-endscreen.ytp-show-tiles").style.display = "";podata.revid = odata.revid};
	if(odata.homep){document.querySelector("ytd-rich-grid-renderer.ytd-two-column-browse-results-renderer").style.display = "none";podata.etile = odata.etile}else if(podata.etile){document.querySelector("ytd-rich-grid-renderer.ytd-two-column-browse-results-renderer").style.display = "";podata.etile = odata.etile};
	if(odata.homef){document.getElementsByTagName("ytd-feed-filter-chip-bar-renderer")[0].style.display = "none";podata.homef=odata.homef}else if(podata.homef){document.getElementsByTagName("ytd-feed-filter-chip-bar-renderer")[0].style.display = "";podata.homef=odata.homef};
	if(odata.short){ const elms = document.querySelectorAll("ytd-rich-shelf-renderer");for(let i=0;i<elms.length;i++){elms[i].style.display = "none"};podata.short = odata.short }else if(podata.short){ const elms = document.querySelectorAll("ytd-rich-shelf-renderer");for(let i=0;i<elms.length;i++){elms[i].style.display = ""};podata.short = odata.short};
	if(odata.cpfps){ const elms = document.querySelectorAll("#author-thumbnail");for(let i=0;i<elms.length;i++){elms[i].style.display = "none"};podata.cpfps = odata.cpfps }else if(podata.cpfps){ const elms = document.querySelectorAll("#author-thumbnail");for(let i=0;i<elms.length;i++){elms[i].style.display = ""};podata.cpfps = odata.cpfps };
	if(odata.uinfo){document.getElementById("upload-info").style.display = "none";podata.uinfo = odata.uinfo }else if(podata.uinfo){document.getElementById("upload-info").style.display = "";podata.uinfo = odata.uinfo };
	if(odata.lsect){document.querySelector("div#actions.item.style-scope.ytd-watch-metadata").style.display = "none";podata.lsect = odata.lsect }else if(podata.lsect){document.querySelector("div#actions.item.style-scope.ytd-watch-metadata").style.display = "";podata.lsect = odata.lsect };
	if(odata.cname){ const elms = document.getElementsByTagName("ytd-channel-name");for(let i=0;i<elms.length;i++){elms[i].style.display = "none"};podata.cname = odata.cname }else if(podata.cname){ const elms = document.getElementsByTagName("ytd-channel-name");for(let i=0;i<elms.length;i++){elms[i].style.display = ""};podata.cname = odata.cname };
	if(odata.descr){ document.getElementById("bottom-row").style.display = "none";podata.descr = odata.descr }else if(podata.descr){ document.getElementById("bottom-row").style.display = "";podata.descr = odata.descr };
	if(odata.scomm){ document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-comments-section"]').style.display = "none";podata.scomm = odata.scomm }else if(podata.scomm){ document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-comments-section"]').style.display = "";podata.scomm = odata.scomm };
	if(odata.bshor){ document.getElementById("shorts-container").style.display = "none";podata.bshor = odata.bshor }else if(podata.bshor){ document.getElementById("shorts-container").style.display = "";podata.bshor = odata.bshor };
	if(odata.explo){ document.getElementById("guide-renderer").firstElementChild.children[2].style.display = "none";podata.explo = odata.explo }else if(podata.explo){ document.getElementById("guide-renderer").firstElementChild.children[2].style.display = "";podata.explo = odata.explo };
	if(odata.mfyou){ document.getElementById("guide-renderer").firstElementChild.children[3] .style.display = "none";podata.mfyou = odata.mfyou }else if(podata.mfyou){ document.getElementById("guide-renderer").firstElementChild.children[3] .style.display = "";podata.mfyou = odata.mfyou };
	if(odata.subsc){ document.getElementById("guide-renderer").firstElementChild.children[1] .style.display = "none";podata.subsc = odata.subsc }else if(podata.subsc){ document.getElementById("guide-renderer").firstElementChild.children[1] .style.display = "";podata.subsc = odata.subsc };
	if(odata.mnavi){ document.getElementById("guide-renderer").firstElementChild.children[0].style.display = "none";podata.mnavi = odata.mnavi }else if(podata.mnavi){ document.getElementById("guide-renderer").firstElementChild.children[0].style.display = "";podata.mnavi = odata.mnavi };
	if(odata.playl){ document.getElementById("secondary-inner").getElementsByTagName("ytd-playlist-panel-renderer")[0].style.display = "none";podata.playl = odata.playl }else if(podata.playl){ document.getElementById("secondary-inner").getElementsByTagName("ytd-playlist-panel-renderer")[0].style.display = "";podata.playl = odata.playl };
	if(odata.lchat){ document.getElementById("chat-container").style.display = "none";podata.lchat = odata.lchat }else if(podata.lchat){ document.getElementById("chat-container").style.display = "";podata.lchat = odata.lchat };
	if(odata.donsh){ document.getElementById("donation-shelf").style.display = "none";podata.donsh = odata.donsh }else if(podata.donsh){ document.getElementById("donation-shelf").style.display = "";podata.donsh = odata.donsh };
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
	delete m.version;
	delete m.block;
	odata = m;
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
			odata = data;
			change();
			break;
	}
})
observer.observe(document.body, {
	childList: true,
	subtree: true
});