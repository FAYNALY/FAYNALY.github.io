const mainMenu = document.getElementById("Menu"), mainSecc = document.getElementById("Musi");
var PthLists=[], Mainsecths = Object.keys( Main );
function BtnSH(inst1, inst2) {
	let btn1 = document.getElementsByClassName(inst1);
	if (inst2==""){
		for (let i=0; btn1.length>i; i++) {
			btn1[i].style.display = "none";
		}
	}
	else {
		let btn2 = document.getElementById(inst2);
		if (btn2.style.display != "flex") {
			for (let i=0; btn1.length>i; i++) { 
				btn1[i].style.display = "none";
			}
			btn2.style.display = "flex";
		} else { 
			btn2.style.display = "none"; 
		}
	}
	audios.forEach(aEl => { aEl.pause(); });
}
function Lvs(inst1, inst2) {
	for (let PthLv of Object.keys( inst1 )) {
		let PthSc=inst1[PthLv], MLName_1 = PthLv, cosPrev = "";
		if (!inst2||inst2=="") { cosPrev=""; } else { cosPrev=inst2+'/'; } 
		if (Object(PthSc) === PthSc) { Lvs(PthSc,cosPrev+PthLv); } else if (PthSc.length>1) { PthLists.push(cosPrev+PthSc); } else { break; }
	}
}Lvs(Main);
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
			pinch.innerHTML=`
<a href="./MP3/${PthLists[i]}.mp3" download><img src="./Data/IMG/Ico/MD.png"></a>
<lable>${pthSec[j]}</lable>
<audio controls>
	<source src="./MP3/${PthLists[i]}.mp3" type="audio/mpeg">
	Your browser does not support the audio element.
</audio>
`			;
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
const audios = document.querySelectorAll("audio");
audios.forEach(aEl => { 
	aEl.addEventListener("play", function () { 
		audios.forEach(el => {
			if (el !== this) { el.pause(); }
		});
	});
});