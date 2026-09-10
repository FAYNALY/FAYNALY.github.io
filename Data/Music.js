const
	mainMenu = document.getElementById("Menu"),
	mainSecc = document.getElementById("Musi"),
	player = document.getElementById("player"),
	playerAudio = document.getElementById("playerAudio"),
	playerName = document.getElementById("playerName"),
	playerMidi = document.getElementById("Midi"),
	midCtrlSet = document.getElementById("midCtrlSet"),
	MusBtn = document.getElementsByClassName("MusBtn");
var last, PthLists=[], Mainsecths = Object.keys( Main );
function Lvs(inst1, inst2) {
	for (let PthLv of Object.keys( inst1 )) {
		let PthSc=inst1[PthLv], MLName_1 = PthLv, cosPrev = "";
		if (!inst2||inst2=="") { cosPrev=""; } else { cosPrev=inst2+'/'; } 
		if (Object(PthSc) === PthSc) { Lvs(PthSc,cosPrev+PthLv); } else if (PthSc.length>1) { PthLists.push(cosPrev+PthSc); } else { break; }
	}
}
Lvs(Main);
function selection(inst1,inst2) {
	if (mid) {
		if (last!=inst2){
			last = inst2;
			playerAudio.stop();
			playerAudio.src = `${inst1}`;
			playerName.innerHTML = '♪-'+inst1.split('/').pop();
			for (let i = 0; i<MusBtn.length; i++) {MusBtn[i].innerHTML=" ▶"}
			playerAudio.start();
			player.style.animationName ="player"
			player.style.bottom="0"
			last.innerHTML="■"
		} else if (!playerAudio.playing) {
			playerAudio.start();
			player.style.animationName ="player"
			player.style.bottom="0"
			last.innerHTML="♪"
		} else {
			tiempoPausado = playerAudio.currentTime; 
			playerAudio.stop();
			playerAudio.currentTime = tiempoPausado; 
			player.style.animationName ="subPlayer"
			player.style.bottom="-100"
			last.innerHTML="■"
		}
	} 
	else {
		if (last!=inst2){
			last = inst2;
			playerAudio.pause();
			playerAudio.currentTime.value=0;
			playerAudio.firstChild.src = `${inst1}`;
			playerAudio.load();
			playerName.innerHTML = '♪-'+inst1.split('/').pop();
			for (let i = 0; i<MusBtn.length; i++) {MusBtn[i].innerHTML=" ▶"}
			playerAudio.play();
			player.style.animationName ="player"
			player.style.bottom="0"
			last.innerHTML="♪"
		} else if (playerAudio.paused) {
			playerAudio.play();
			player.style.animationName ="player"
			player.style.bottom="0"
			last.innerHTML="♪"
		} else {
			playerAudio.pause();
			player.style.animationName ="subPlayer"
			player.style.bottom="-100"
			last.innerHTML="■"
		}
	}
}
for (let i=0; Mainsecths.length>i; i++) {
	let gefBtn = document.createElement('button');
	gefBtn.setAttribute("onclick", `BtnSH('audioSection', 'hidshow_${Mainsecths[i]}'); BtnSH('audioList','');`);
	gefBtn.id="Btn"+Mainsecths[i];
	gefBtn.innerHTML=`<h3>${Mainsecths[i]}</h3> `;
	mainMenu.append(gefBtn);
	let gefMus = document.createElement('div');
	gefMus.style="display:none;"
	if (i==0) {gefMus.style="display:flex;"}
	gefMus.classList="audioSection";
	gefMus.id="hidshow_"+Mainsecths[i];
	gefMus.innerHTML=`<h3>${Mainsecths[i]}</h3><div id="sub_${Mainsecths[i]}" class="audioParts"></div>`;
	mainSecc.append(gefMus);
}
for (let i=0; PthLists.length>i; i++) {
	let pthSec = PthLists[i].split("/"), pthnde = document.getElementById("sub_"+PthLists[i].split("/")[0]);
	for (let j=0,loe=pthSec.length; loe>j; j++) { let pinch;
		if (pthSec[j]==pthSec[loe-1]) {
			pinch = document.createElement('div');
			pinch.classList="audioSample"
			if (mid){/*MIDI*/
				pinch.innerHTML=`
<a href="./MIDI/${PthLists[i]}.mid" download><img src="./Data/IMG/Ico/MD.png"></a>
<lable onclick="selection('./MIDI/${PthLists[i].replaceAll("'", "\\'").replaceAll('"', '\\"')}.mid',this.nextElementSibling)">${pthSec[j]}</lable>
<button class="MusBtn" onclick="selection('./MIDI/${PthLists[i].replaceAll("'", "\\'").replaceAll('"', '\\"')}.mid',this)"> ▶</button>
`				;
			}else{/*MP3*/
				pinch.innerHTML=`
<a href="./MP3/${PthLists[i]}.mp3" download><img src="./Data/IMG/Ico/MD.png"></a>
<lable onclick="selection('./MP3/${PthLists[i].replaceAll("'", "\\'").replaceAll('"', '\\"')}.mp3',this.nextElementSibling)">${pthSec[j]}</lable>
<button class="MusBtn" onclick="selection('./MP3/${PthLists[i].replaceAll("'", "\\'").replaceAll('"', '\\"')}.mp3',this)"> ▶</button>
`				;
			}
			pthnde.lastChild.lastChild.append(pinch);
		}
		else if (pthSec[j]==pthSec[loe-2]) {
			pinch = document.createElement('div');
			pinch.classList="audioCluster";
			pinch.id="cluster_"+pthSec[j];
			pinch.innerHTML=`<button onclick="BtnSH('audioList','list_${pthSec[j]}')">${pthSec[j]}</button><div class="audioList" id="list_${pthSec[j]}" style="display:none;"></div>`;
			if (!pthnde.innerHTML.includes("id=\"cluster_"+pthSec[j]+"\"")) {pthnde.appendChild(pinch);}
		}
	}
}
function BtnSH(inst1, inst2) {
	let btn1 = document.getElementsByClassName(inst1);
	if (inst2==""){
		for (let i=0; btn1.length>i; i++) { btn1[i].style.display = "none"; }
	}
	else {
		let btn2 = document.getElementById(inst2);
		if (btn2.style.display != "flex") {
			for (let i=0; btn1.length>i; i++) { btn1[i].style.display = "none"; }
			btn2.style.display = "flex";
		} else { btn2.style.display = "none"; }
	}
}
playerAudio.addEventListener('stop', () => {
	last.innerHTML="■"
});
if (mid) {
	playerAudio.addEventListener('start', () => {
		player.style.animationName ="player"
		player.style.bottom="0"
		last.innerHTML="♪"
	});
	playerAudio.addEventListener('load', () => {
		player.style.animationName ="player"
		player.style.bottom="0"
		last.innerHTML="■"
		playerMidi.src = playerAudio.src;
	});
	playerMidi.addEventListener('load', () => {
		playerAudio.start();
	});
	midCtrlSet.addEventListener('change', (event) => {
		playerMidi.setAttribute('type', event.target.value);
		if (event.target.value=="staff"){
			playerMidi.firstChild.style.backgroundColor="#ffffff"
		} else {
			playerMidi.firstChild.style.backgroundColor=""
		}
	});
} else {
	playerAudio.addEventListener('play', () => {
		player.style.animationName ="player"
		player.style.bottom="0"
		last.innerHTML="♪"
	});
}