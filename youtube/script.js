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
	const notifelm = document.querySelector('button[aria-label="Notifications"]');
	const commeelm = document.querySelector("ytd-comments#comments");
	const revidelm = document.getElementById("related");
	const etileelm = document.querySelector("div.html5-endscreen.ytp-player-content.videowall-endscreen.ytp-show-tiles");
	const homepelm = document.querySelector("ytd-rich-grid-renderer.ytd-two-column-browse-results-renderer");
	const homefelm = document.getElementsByTagName("ytd-feed-filter-chip-bar-renderer")[0];
	const uinfoelm = document.getElementById("upload-info");
	const lsectelm = document.querySelector("div#actions.item.style-scope.ytd-watch-metadata");
	const descrelm = document.getElementById("bottom-row");
	const bshorelm = document.getElementById("shorts-container");
	const lpan = document.getElementById("guide-renderer") ? (document.getElementById("guide-renderer").firstElementChild ? document.getElementById("guide-renderer").firstElementChild.children : []) : [];
	let exploelm = mfyouelm = subscelm = mnavielm = null;
	if(lpan.length > 2){
		exploelm = lpan[2];
		mfyouelm = lpan[3];
		subscelm = lpan[1];
		mnavielm = lpan[0];
	}
	const lchatelm = document.getElementById("chat-container");
	const donshelm = document.getElementById("donation-shelf");
	const playlparelm = document.getElementById("secondary-inner");
	const playlelm = playlparelm ? playlparelm.getElementsByTagName("ytd-playlist-panel-renderer") : [];
	if(notifelm){if(odata.notif){notifelm.style.display = "none";podata.notif=odata.notif}else if(podata.notif){notifelm.style.display = "";podata.notif=odata.notif}};
	if(commeelm){if(odata.comme){commeelm.style.display = "none";podata.comme = odata.comme}else if(podata.comme){commeelm.style.display = "";podata.comme = odata.comme}};
	if(revidelm){if(odata.revid){revidelm.style.display = "none";podata.revid = odata.revid}else if(podata.revid){revidelm.style.display = "";podata.revid = odata.revid}};
	if(etileelm){if(odata.etile){etileelm.style.display = "none";podata.etile = odata.etile}else if(podata.etile){etileelm.style.display = "";podata.revid = odata.revid}};
	if(homepelm){if(odata.homep){homepelm.style.display = "none";podata.etile = odata.etile}else if(podata.etile){homepelm.style.display = "";podata.etile = odata.etile}};
	if(homefelm){if(odata.homef){homefelm.style.display = "none";podata.homef=odata.homef}else if(podata.homef){homefelm.style.display = "";podata.homef=odata.homef}};
	if(odata.short){ const elms = document.querySelectorAll("ytd-rich-shelf-renderer");const elms2 = document.querySelectorAll("ytd-reel-shelf-renderer");for(let i=0;i<elms.length;i++){elms[i].style.display = "none"}for(let i=0;i<elms2.length;i++){elms2[i].style.display = "none"};podata.short = odata.short }else if(podata.short){ const elms = document.querySelectorAll("ytd-rich-shelf-renderer");const elms2 = document.querySelectorAll("ytd-reel-shelf-renderer");for(let i=0;i<elms.length;i++){elms[i].style.display = ""}for(let i=0;i<elms2.length;i++){elms2[i].style.display = ""};podata.short = odata.short};
	if(odata.cpfps){ const elms = document.querySelectorAll("#author-thumbnail");for(let i=0;i<elms.length;i++){elms[i].style.display = "none"};podata.cpfps = odata.cpfps }else if(podata.cpfps){ const elms = document.querySelectorAll("#author-thumbnail");for(let i=0;i<elms.length;i++){elms[i].style.display = ""};podata.cpfps = odata.cpfps };
	if(uinfoelm){if(odata.uinfo){uinfoelm.style.display = "none";podata.uinfo = odata.uinfo }else if(podata.uinfo){uinfoelm.style.display = "";podata.uinfo = odata.uinfo }};
	if(lsectelm){if(odata.lsect){lsectelm.style.display = "none";podata.lsect = odata.lsect }else if(podata.lsect){lsectelm.style.display = "";podata.lsect = odata.lsect }};
	if(odata.cname){ const elms = document.getElementsByTagName("ytd-channel-name");for(let i=0;i<elms.length;i++){elms[i].style.display = "none"};podata.cname = odata.cname }else if(podata.cname){ const elms = document.getElementsByTagName("ytd-channel-name");for(let i=0;i<elms.length;i++){elms[i].style.display = ""};podata.cname = odata.cname };
	if(descrelm){if(odata.descr){ descrelm.style.display = "none";podata.descr = odata.descr }else if(podata.descr){ descrelm.style.display = "";podata.descr = odata.descr }};
	if(odata.scomm){ const elms = document.querySelectorAll('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-comments-section"]');for(let i=0;i<elms.length;i++){elms[i].style.display = "none"};podata.cname = odata.cname }else if(podata.scomm){ const elms = document.querySelectorAll('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-comments-section"]');for(let i=0;i<elms.length;i++){elms[i].style.display = ""};podata.cname = odata.cname };
	if(bshorelm){if(odata.bshor){ bshorelm.style.display = "none";podata.bshor = odata.bshor }else if(podata.bshor){ bshorelm.style.display = "";podata.bshor = odata.bshor }};
	if(exploelm){if(odata.explo){ exploelm.style.display = "none";podata.explo = odata.explo }else if(podata.explo){ exploelm.style.display = "";podata.explo = odata.explo }};
	if(mfyouelm){if(odata.mfyou){ mfyouelm.style.display = "none";podata.mfyou = odata.mfyou }else if(podata.mfyou){ mfyouelm.style.display = "";podata.mfyou = odata.mfyou }};
	if(subscelm){if(odata.subsc){ subscelm.style.display = "none";podata.subsc = odata.subsc }else if(podata.subsc){ subscelm.style.display = "";podata.subsc = odata.subsc }};
	if(mnavielm){if(odata.mnavi){ mnavielm.style.display = "none";podata.mnavi = odata.mnavi }else if(podata.mnavi){ mnavielm.style.display = "";podata.mnavi = odata.mnavi }};
	if(playlelm.length > 0){if(odata.playl){ playlelm[0].style.display = "none";podata.playl = odata.playl }else if(podata.playl){ playlelm[0].style.display = "";podata.playl = odata.playl }};
	//removed try catch cuz expensive }catch(e){console.log("Playlist elm not found")};
	if(lchatelm){if(odata.lchat){ lchatelm.style.display = "none";podata.lchat = odata.lchat }else if(podata.lchat){ lchatelm.style.display = "";podata.lchat = odata.lchat }};
	if(donshelm){if(odata.donsh){ donshelm.style.display = "none";podata.donsh = odata.donsh }else if(podata.donsh){ donshelm.style.display = "";podata.donsh = odata.donsh }};
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