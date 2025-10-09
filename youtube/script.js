let odata = {
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
const podata = Object.assign({},odata);
const logTag = '\033[41m[FocusYouTube]\033[0m ';

let videoObserverIdle = true;
function processFormat(){
	console.log(logTag+'Detected format');
	const content = document.getElementById('microformat')?.firstChild?.firstChild?.innerText;
	if(content && videoObserverIdle){
		const oldMessage = document.getElementById('FocusYouTube-Message');
		console.log(oldMessage);
		oldMessage && oldMessage.parentElement.remove(oldMessage);
		const info = JSON.parse(content);
		if(info.genre != 'Music'){
			console.log(logTag+'Blocking video due to bad tag');
			//let counter = 0;
			videoObserverIdle = false;
			const videoObserver = new MutationObserver(()=>{
				const videoElm = document.getElementsByTagName('video')[0];
				const capCont = document.getElementById('ytp-caption-window-container');
				if(videoElm){
					/*
					if(counter > 1000){
						console.log('Counter Disconnected');
						videoObserver.disconnect();
					}
					*/
					const container = videoElm.parentElement;
					container.removeChild(videoElm);
					//const player = document.getElementById('full-bleed-container'); //document.getElementsByTagName('video')[0]?.parentElement
					//player.innerHTML = trustedTypes.emptyHTML
					//container.parentElement
					//document.write(dummyPolicy.createHTML("<!DOCTYPE html><html><head><title>WEBSITE BLOCKED</title><style>body{display:flex;background:white;align-items:center;justify-items:center;}</style></head><body><</body></html>"));
				}
				if(capCont){
					videoObserverIdle = true;
					videoObserver.disconnect();
					const msgCont = document.createElement('div');
					msgCont.style.display = 'grid';
					msgCont.style.alignItems = 'center';
					msgCont.style.justifyContent = 'center';
					msgCont.style.height = '100%';
					msgCont.style.width = '100%';
					msgCont.style.background = 'url("'+info.thumbnailUrl[0]+'")';
					msgCont.style.position = 'relative';
					msgCont.style.zIndex = '99';
					msgCont.style.pointerEvents = 'all';
					const msgElm = document.createElement('span');
					msgElm.style.padding = '50px';
					msgElm.style.background = 'rgba(0,0,0,0.5)';
					msgElm.style.fontSize = '50px';
					msgElm.style.color = 'white';
					msgElm.innerText = 'This video has been blocked by YouTube Focus';
					msgElm.id = 'FocusYouTube-Message';
					msgCont.appendChild(msgElm);
					capCont.appendChild(msgCont);
				}
			});
			videoObserver.observe(document.getElementsByClassName('style-scope ytd-player')[0],{subtree:true,childList:true});
		}
	}
}
function change() {
	console.log(logTag+'Detected change');
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
//let foundNum = 0;
const InitObserver = new MutationObserver(()=>{
	const formElm = document.getElementById('microformat');
	const navElm = document.getElementsByClassName('style-scope yt-page-navigation-progress')[0];
	if(formElm){
		//foundNum++;
		const FormatObserver = new MutationObserver(processFormat);
		FormatObserver.observe(formElm,{subtree:true,childList:true});
	}
	if(navElm){
		//foundNum++;
		const NavObserver = new MutationObserver(change);
		NavObserver.observe(navElm,{attributes:true});//navElm
	}
	/*
	if(foundNum >= 2){
		InitObserver.disconnect();
	}
	*/
	if(document.getElementsByClassName('ytp-miniplayer-ui')[0]){
		console.log(logTag+'Detected load finish');
		InitObserver.disconnect();
		processFormat();
	}
	change();
});
InitObserver.observe(document.body,{subtree:true,childList:true});
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
	switch(obj.type){
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