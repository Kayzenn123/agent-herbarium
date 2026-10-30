/* HERBARIUM — kebun raya kartu spesimen. Vanilla JS, nol dependensi. */
(function(){
"use strict";
var WORLD_W=1440, WORLD_H=1500;

/* ---------------- data: 18 tanaman (fakta perawatan umum, bukan angka presisi) ---------------- */
var PLANTS=[
 // Bedeng Teduh
 {slug:"monstera",nama:"Monstera",latin:"Monstera deliciosa",zona:"teduh",cahaya:"teduh",air:"sedang",level:"gampang",fakta:"Daunnya berlubang alami; makin tua tanamannya, belahannya makin banyak.",x:90,y:340,r:-4,icon:"i-leaf"},
 {slug:"sri-rejeki",nama:"Sri Rejeki",latin:"Aglaonema commutatum",zona:"teduh",cahaya:"teduh",air:"sedang",level:"gampang",fakta:"Betah di ruangan minim cahaya; motif daunnya cantik tanpa perlu dipoles.",x:310,y:332,r:3,icon:"i-leaf"},
 {slug:"keladi-hias",nama:"Keladi Hias",latin:"Caladium bicolor",zona:"teduh",cahaya:"teduh",air:"sering",level:"sedang",fakta:"Suka tanah yang lembap; umbinya bisa dorman lalu tumbuh lagi.",x:520,y:340,r:-2,icon:"i-leaf"},
 {slug:"spatifilum",nama:"Spatifilum",latin:"Spathiphyllum wallisii",zona:"teduh",cahaya:"teduh",air:"sedang",level:"gampang",fakta:"Berbunga putih di tempat teduh; daun terkulai artinya minta minum.",x:130,y:580,r:2,icon:"i-leaf"},
 {slug:"zamia",nama:"Zamia Dolar",latin:"Zamioculcas zamiifolia",zona:"teduh",cahaya:"teduh",air:"jarang",level:"gampang",fakta:"Punya umbi penyimpan air; kuat meski kadang lupa disiram.",x:350,y:575,r:-4,icon:"i-leaf"},
 {slug:"daun-bahagia",nama:"Daun Bahagia",latin:"Dieffenbachia seguine",zona:"teduh",cahaya:"teduh",air:"sedang",level:"sedang",fakta:"Getahnya bisa bikin gatal; jauhkan dari jangkauan anak dan hewan.",x:520,y:580,r:5,icon:"i-leaf"},
 // Rumah Kaca
 {slug:"anggrek-bulan",nama:"Anggrek Bulan",latin:"Phalaenopsis amabilis",zona:"kaca",cahaya:"sedang",air:"sedang",level:"susah",fakta:"Bunga nasional Indonesia; sekali mekar bisa tahan berbulan-bulan.",x:800,y:360,r:2,icon:"i-dome"},
 {slug:"anthurium",nama:"Anthurium",latin:"Anthurium andraeanum",zona:"kaca",cahaya:"sedang",air:"sedang",level:"sedang",fakta:"Seludang bunganya seperti lilin dan awet; suka udara lembap.",x:1195,y:360,r:-4,icon:"i-dome"},
 {slug:"kantong-semar",nama:"Kantong Semar",latin:"Nepenthes mirabilis",zona:"kaca",cahaya:"sedang",air:"sering",level:"sedang",fakta:"Kantongnya perangkap serangga alami; jangan diisi air manual.",x:800,y:600,r:-3,icon:"i-dome"},
 {slug:"suplir",nama:"Suplir",latin:"Adiantum raddianum",zona:"kaca",cahaya:"teduh",air:"sering",level:"susah",fakta:"Daunnya halus berlapis-lapis; paling rewel soal kelembapan.",x:1030,y:600,r:4,icon:"i-dome"},
 // Kolam & Rambat
 {slug:"sirih-gading",nama:"Sirih Gading",latin:"Epipremnum aureum",zona:"kolam",cahaya:"sedang",air:"sedang",level:"gampang",fakta:"Merambat ke mana-mana; potong ruas batangnya untuk stek baru.",x:90,y:950,r:-3,icon:"i-pond"},
 {slug:"lili-paris",nama:"Lili Paris",latin:"Chlorophytum comosum",zona:"kolam",cahaya:"sedang",air:"sedang",level:"gampang",fakta:"Anakannya menggantung seperti laba-laba; cocok ditanam gantung.",x:300,y:945,r:4,icon:"i-pond"},
 {slug:"melati",nama:"Melati",latin:"Jasminum sambac",zona:"kolam",cahaya:"terang",air:"sedang",level:"sedang",fakta:"Bunga bangsa Indonesia; mekar dan wangi di malam hari.",x:510,y:950,r:-2,icon:"i-pond"},
 // Teras Terang
 {slug:"lidah-mertua",nama:"Lidah Mertua",latin:"Sansevieria trifasciata",zona:"terang",cahaya:"terang",air:"jarang",level:"gampang",fakta:"Legenda tanaman anti-mati; makin terang tempatnya makin cepat beranak.",x:790,y:950,r:-2,icon:"i-sun"},
 {slug:"lidah-buaya",nama:"Lidah Buaya",latin:"Aloe vera",zona:"terang",cahaya:"terang",air:"jarang",level:"gampang",fakta:"Gelnya adem untuk kulit; akarnya busuk kalau kebanyakan air.",x:1000,y:945,r:3,icon:"i-sun"},
 {slug:"kamboja-jepang",nama:"Kamboja Jepang",latin:"Adenium obesum",zona:"terang",cahaya:"terang",air:"jarang",level:"sedang",fakta:"Bonggol batangnya menyimpan air; rajin berbunga di tempat panas.",x:1195,y:950,r:-4,icon:"i-sun"},
 {slug:"bougenville",nama:"Bougenville",latin:"Bougainvillea spectabilis",zona:"terang",cahaya:"terang",air:"sedang",level:"gampang",fakta:"Yang berwarna-warni itu kelopaknya, bukan bunga aslinya.",x:880,y:1210,r:2,icon:"i-sun"},
 {slug:"kamboja",nama:"Kamboja",latin:"Plumeria rubra",zona:"terang",cahaya:"terang",air:"jarang",level:"gampang",fakta:"Wanginya khas; menggugurkan daun di musim kemarau itu normal.",x:1090,y:1215,r:-3,icon:"i-sun"}
];
var ZONA_LABEL={teduh:"Bedeng Teduh",kaca:"Rumah Kaca",kolam:"Kolam & Rambat",terang:"Teras Terang"};
var CAHAYA={teduh:"Teduh",sedang:"Sedang",terang:"Terang"};
var AIR={jarang:"Jarang",sedang:"Sedang",sering:"Sering"};
var LEVEL={gampang:"Gampang",sedang:"Sedang",susah:"Susah"};

/* ---------------- helpers ---------------- */
function $(s,r){return (r||document).querySelector(s)}
function $all(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
function icon(name,cls){return '<svg class="'+(cls||"ic")+'" aria-hidden="true"><use href="#'+name+'"/></svg>'}
var toastTimer=null;
function toast(msg){var t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(function(){t.classList.remove("show")},2600)}
function reduced(){return document.documentElement.classList.contains("reduced")||window.matchMedia("(prefers-reduced-motion: reduce)").matches}

/* ---------------- storage ---------------- */
var store={favs:[]};
try{
  var raw=localStorage.getItem("herbarium-v1");
  if(raw){var d=JSON.parse(raw);if(d&&Array.isArray(d.favs)){store.favs=d.favs.filter(function(s){return typeof s==="string"});}}
}catch(e){toast("Pak Kebun: laci favoritnya rusak, mulai dari kosong ya.");try{localStorage.removeItem("herbarium-v1")}catch(_){}}
function save(){try{localStorage.setItem("herbarium-v1",JSON.stringify({favs:store.favs}))}catch(e){}}

/* ---------------- ribbons ---------------- */
(function(){
  var items=["BEDENG TEDUH","RUMAH KACA","KOLAM & RAMBAT","TERAS TERANG","18 TANAMAN","SIRAM PAGI · SIRAM SORE","TEDUH BUKAN BERARTI GELAP"];
  var html="";for(var k=0;k<2;k++){items.forEach(function(t){html+="<span>"+t+" ◆</span>"})}
  $("#ribbon1").innerHTML=html;$("#ribbon2").innerHTML=html;
})();

/* ---------------- cards ---------------- */
var cardBySlug={};
function buildCards(){
  PLANTS.forEach(function(p,i){
    var host=$('.cards[data-cards="'+p.zona+'"]');
    var slot=el("div","slot");slot.style.left=p.x+"px";slot.style.top=p.y+"px";
    slot.setAttribute("role","button");slot.setAttribute("tabindex","0");
    slot.setAttribute("aria-label","Kartu "+p.nama+" ("+p.latin+"). Tekan Enter untuk membuka.");
    slot.dataset.slug=p.slug;
    var tilt=el("div","tilt");tilt.style.transform="rotate("+p.r+"deg)";
    var flip=el("div","flip");
    var no=String(i+1).padStart(2,"0");
    var front=el("div","face front");
    front.innerHTML=
      '<span class="corner tl">'+no+icon(p.icon)+'</span>'+
      '<span class="corner br">'+no+icon(p.icon)+'</span>'+
      '<div class="suit">'+icon(p.icon,"ic")+'</div>'+
      "<h3>"+p.nama+"</h3>"+
      '<p class="latin">'+p.latin+'</p>'+
      '<p class="zone-tag">'+ZONA_LABEL[p.zona].toUpperCase()+'</p>'+
      '<p class="hint">ketuk untuk membuka</p>';
    var back=el("div","face back");
    var h=el("h3",null,p.nama);
    back.appendChild(el("p","no","LABEL HERBARIUM · No "+no));
    back.appendChild(h);
    [["i-sun","Cahaya",CAHAYA[p.cahaya]],["i-drop","Air",AIR[p.air]],["i-trowel","Rawat",LEVEL[p.level]]].forEach(function(r){
      var kv=el("div","kv");kv.innerHTML=icon(r[0])+"<span>"+r[1]+": <b>"+r[2]+"</b></span>";back.appendChild(kv);
    });
    back.appendChild(el("p","fact",p.fakta));
    var row=el("div","row");
    var fav=el("button",null,"");fav.innerHTML=icon("i-heart")+"<span>Simpan</span>";fav.setAttribute("aria-label","Simpan "+p.nama+" ke laci favorit");
    fav.addEventListener("click",function(ev){ev.stopPropagation();toggleFav(p.slug)});
    var cp=el("button",null,"");cp.innerHTML=icon("i-card")+"<span>Salin</span>";cp.setAttribute("aria-label","Salin info "+p.nama);
    cp.addEventListener("click",function(ev){ev.stopPropagation();copyPlant(p)});
    row.appendChild(fav);row.appendChild(cp);back.appendChild(row);
    flip.appendChild(front);flip.appendChild(back);tilt.appendChild(flip);slot.appendChild(tilt);
    slot.dataset.favBtn="1";
    slot.addEventListener("click",function(ev){if(ev.target.closest("button"))return;toggleOpen(slot,p)});
    slot.addEventListener("keydown",function(ev){if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();toggleOpen(slot,p)}});
    host.appendChild(slot);
    cardBySlug[p.slug]={slot:slot,p:p,favBtn:fav,no:no};
  });
}
function toggleOpen(slot,p){
  var willOpen=!slot.classList.contains("open");
  $all(".slot.open").forEach(function(s){s.classList.remove("open")});
  if(willOpen){slot.classList.add("open");slot.classList.remove("pop");void slot.offsetWidth;slot.classList.add("pop");
    announce("Kartu "+p.nama+" dibuka. "+p.fakta);}
}
function announce(msg){toast("Pak Kebun: "+msg)}

/* ---------------- camera ---------------- */
var cam={x:0,y:0,s:1}, world=$("#world"), viewport=$("#viewport"), animId=null;
function minS(){return Math.min(viewport.clientWidth/WORLD_W,viewport.clientHeight/WORLD_H)*0.92}
function maxS(){return 2.4}
function apply(){world.style.transform="translate("+cam.x+"px,"+cam.y+"px) scale("+cam.s+")"}
function clampCam(){
  cam.s=Math.max(minS(),Math.min(maxS(),cam.s));
  var vw=viewport.clientWidth,vh=viewport.clientHeight;
  cam.x=Math.min(0,Math.max(vw-WORLD_W*cam.s,cam.x));
  cam.y=Math.min(0,Math.max(vh-WORLD_H*cam.s,cam.y));
}
function stopAnim(){if(animId){cancelAnimationFrame(animId);animId=null}}
function flyTo(wx,wy,s,dur){
  stopAnim();
  if(reduced()){cam.s=s;cam.x=viewport.clientWidth/2-wx*s;cam.y=viewport.clientHeight/2-wy*s;clampCam();apply();return}
  var x0=cam.x,y0=cam.y,s0=cam.s;
  var x1=viewport.clientWidth/2-wx*s,y1=viewport.clientHeight/2-wy*s;
  var t0=performance.now(),D=dur||900;
  (function step(t){
    var p=Math.min(1,(t-t0)/D),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
    cam.x=x0+(x1-x0)*e;cam.y=y0+(y1-y0)*e;cam.s=s0+(s-s0)*e;clampCam();apply();
    if(p<1)animId=requestAnimationFrame(step);else animId=null;
  })(t0);
}
function zoomAt(cx,cy,f){
  var r=viewport.getBoundingClientRect();
  var wx=(cx-r.left-cam.x)/cam.s, wy=(cy-r.top-cam.y)/cam.s;
  stopAnim();cam.s=cam.s*f;
  cam.x=cx-r.left-wx*cam.s;cam.y=cy-r.top-wy*cam.s;clampCam();apply();
}
function resetView(dur){
  var s=Math.min(Math.max(viewport.clientWidth/760,0.55),1.15);
  flyTo(380,580,s,dur||800);
}
/* pointer: drag pan + pinch zoom */
var pointers=new Map(),pinchD0=0,pinchS0=1,downPos=null,moved=false;
viewport.addEventListener("pointerdown",function(e){
  if(e.target.closest("button,input,a,.slot,aside,.zoomctl"))return;
  viewport.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pointers.size===1){downPos={x:e.clientX,y:e.clientY,cx:cam.x,cy:cam.y};moved=false;viewport.classList.add("dragging")}
  if(pointers.size===2){var p=Array.from(pointers.values());pinchD0=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);pinchS0=cam.s;stopAnim()}
});
viewport.addEventListener("pointermove",function(e){
  if(!pointers.has(e.pointerId))return;
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pointers.size===2){
    var p=Array.from(pointers.values());
    var d=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);
    if(pinchD0>0){var r=viewport.getBoundingClientRect();
      var mx=(p[0].x+p[1].x)/2-r.left,my=(p[0].y+p[1].y)/2-r.top;
      var wx=(mx-cam.x)/cam.s,wy=(my-cam.y)/cam.s;
      cam.s=pinchS0*d/pinchD0;cam.x=mx-wx*cam.s;cam.y=my-wy*cam.s;clampCam();apply();}
    return;
  }
  if(downPos){stopAnim();
    var dx=e.clientX-downPos.x,dy=e.clientY-downPos.y;
    if(Math.abs(dx)+Math.abs(dy)>6)moved=true;
    cam.x=downPos.cx+dx;cam.y=downPos.cy+dy;clampCam();apply();}
});
function endPointer(e){pointers.delete(e.pointerId);if(pointers.size<2)pinchD0=0;
  if(pointers.size===0){downPos=null;viewport.classList.remove("dragging")}}
viewport.addEventListener("pointerup",endPointer);
viewport.addEventListener("pointercancel",endPointer);
viewport.addEventListener("wheel",function(e){e.preventDefault();zoomAt(e.clientX,e.clientY,Math.exp(-e.deltaY*0.0016))},{passive:false});
viewport.tabIndex=0;
viewport.addEventListener("keydown",function(e){
  var step=70;
  if(e.key==="ArrowLeft"){cam.x+=step}else if(e.key==="ArrowRight"){cam.x-=step}
  else if(e.key==="ArrowUp"){cam.y+=step}else if(e.key==="ArrowDown"){cam.y-=step}
  else if(e.key==="+"||e.key==="="){zoomAt(viewport.clientWidth/2,viewport.clientHeight/2,1.2);e.preventDefault();return}
  else if(e.key==="-"||e.key==="_"){zoomAt(viewport.clientWidth/2,viewport.clientHeight/2,1/1.2);e.preventDefault();return}
  else if(e.key==="Home"){resetView();e.preventDefault();return}
  else return;
  stopAnim();e.preventDefault();clampCam();apply();
});
$("#zin").addEventListener("click",function(){zoomAt(viewport.clientWidth/2,viewport.clientHeight/2,1.35)});
$("#zout").addEventListener("click",function(){zoomAt(viewport.clientWidth/2,viewport.clientHeight/2,1/1.35)});
$("#zreset").addEventListener("click",function(){resetView(800)});
window.addEventListener("resize",function(){clampCam();apply()});

/* ---------------- tilt (D) ---------------- */
var finePointer=window.matchMedia("(pointer: fine)").matches;
var lite=(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4)||
         (navigator.deviceMemory&&navigator.deviceMemory<=4)||
         (navigator.connection&&navigator.connection.saveData);
if(lite)document.documentElement.classList.add("lite");
document.addEventListener("pointermove",function(e){
  if(!finePointer||reduced()||lite)return;
  var slot=e.target.closest?e.target.closest(".slot"):null;
  $all(".slot.tilting").forEach(function(s){if(s!==slot){s.classList.remove("tilting");s.querySelector(".tilt").style.transform=""}});
  if(!slot||slot.classList.contains("open"))return;
  var r=slot.getBoundingClientRect();
  var px=(e.clientX-r.left)/r.width-0.5, py=(e.clientY-r.top)/r.height-0.5;
  slot.classList.add("tilting");
  slot.querySelector(".tilt").style.transform="rotateX("+(-py*14)+"deg) rotateY("+(px*14)+"deg)";
});

/* ---------------- search & filter ---------------- */
var curFilter="semua";
function applyFilter(){
  var q=$("#q").value.trim().toLowerCase(),n=0;
  PLANTS.forEach(function(p){
    var c=cardBySlug[p.slug].slot;
    var okF=curFilter==="semua"||p.cahaya===curFilter;
    var okQ=!q||p.nama.toLowerCase().indexOf(q)>-1||p.latin.toLowerCase().indexOf(q)>-1;
    c.classList.toggle("dim",!(okF&&okQ));
    if(okF&&okQ)n++;
  });
  return n;
}
$("#q").addEventListener("input",function(){
  var n=applyFilter();
  if(!$("#q").value.trim())return;
  if(n===0)toast("Aduh, bedengnya kosong — tidak ada tanaman bernama itu, Nak.");
});
$("#q").addEventListener("keydown",function(e){
  if(e.key!=="Enter")return;
  var q=$("#q").value.trim().toLowerCase();if(!q)return;
  var hit=PLANTS.find(function(p){return p.nama.toLowerCase().indexOf(q)>-1||p.latin.toLowerCase().indexOf(q)>-1});
  if(hit){var c=cardBySlug[hit.slug];flyTo(hit.x+95,hit.y+135,1.25,800);toggleOpen(c.slot,hit)}
});
$all(".chip").forEach(function(ch){
  ch.addEventListener("click",function(){
    $all(".chip").forEach(function(c){c.classList.remove("on");c.setAttribute("aria-pressed","false")});
    ch.classList.add("on");ch.setAttribute("aria-pressed","true");
    curFilter=ch.dataset.f;
    var n=applyFilter();
    announce(n+" tanaman cocok dengan cahaya "+ch.textContent.trim()+".");
  });
});

/* ---------------- favorites ---------------- */
function isFav(slug){return store.favs.indexOf(slug)>-1}
function toggleFav(slug){
  var i=store.favs.indexOf(slug),p=cardBySlug[slug].p;
  if(i>-1){store.favs.splice(i,1);announce(p.nama+" dikeluarkan dari laci.")}
  else{store.favs.push(slug);announce(p.nama+" masuk laci favorit.")}
  save();refreshFavs();
}
function refreshFavs(){
  $("#favCount").textContent=store.favs.length;
  PLANTS.forEach(function(p){
    var b=cardBySlug[p.slug].favBtn,f=isFav(p.slug);
    b.classList.toggle("faved",f);
    b.querySelector("span").textContent=f?"Tersimpan":"Simpan";
  });
  var ul=$("#favList");ul.innerHTML="";
  $("#favEmpty").style.display=store.favs.length?"none":"block";
  store.favs.forEach(function(slug){
    var c=cardBySlug[slug];if(!c)return;
    var li=el("li"),nm=el("span","nm");
    nm.appendChild(el("b",null,c.p.nama));
    nm.appendChild(el("small",null,c.p.latin));
    var go=el("button",null,"Buka");go.setAttribute("aria-label","Terbang ke "+c.p.nama);
    go.addEventListener("click",function(){$("#laci").hidden=true;flyTo(c.p.x+95,c.p.y+135,1.25,800);toggleOpen(c.slot,c.p)});
    var del=el("button",null,"×");del.setAttribute("aria-label","Hapus "+c.p.nama+" dari laci");
    del.addEventListener("click",function(){toggleFav(slug)});
    li.appendChild(nm);li.appendChild(go);li.appendChild(del);ul.appendChild(li);
  });
}
$("#laciBtn").addEventListener("click",function(){$("#laci").hidden=false;$("#laciClose").focus()});
$("#laciClose").addEventListener("click",function(){$("#laci").hidden=true;$("#laciBtn").focus()});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!$("#laci").hidden){$("#laci").hidden=true}});
$("#expJson").addEventListener("click",function(){
  var data=store.favs.map(function(s){var p=cardBySlug[s].p;return{nama:p.nama,latin:p.latin,cahaya:CAHAYA[p.cahaya],air:AIR[p.air]}});
  var blob=new Blob([JSON.stringify({kebun:"Herbarium",favorit:data},null,2)],{type:"application/json"});
  var a=el("a");a.href=URL.createObjectURL(blob);a.download="herbarium-favorit.json";document.body.appendChild(a);a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},400);
  announce("Daftar favorit diunduh.");
});
function copyText(t,okMsg){
  function done(){announce(okMsg)}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,function(){fallback()})}
  else fallback();
  function fallback(){var ta=el("textarea");ta.value=t;document.body.appendChild(ta);ta.select();
    try{document.execCommand("copy");done()}catch(e){toast("Pak Kebun: gagal menyalin, catat manual ya.");}ta.remove()}
}
$("#copyFav").addEventListener("click",function(){
  if(!store.favs.length){toast("Pak Kebun: lacinya masih kosong.");return}
  var t=store.favs.map(function(s){var p=cardBySlug[s].p;return"- "+p.nama+" ("+p.latin+")"}).join("\n");
  copyText("Favorit Herbarium:\n"+t,"Daftar favorit tersalin.");
});
function copyPlant(p){
  copyText(p.nama+" ("+p.latin+") — Cahaya: "+CAHAYA[p.cahaya]+", Air: "+AIR[p.air]+", Rawat: "+LEVEL[p.level]+". "+p.fakta,"Info "+p.nama+" tersalin.");
}

/* ---------------- deep link ---------------- */
function deepLink(){
  var m=/[?&]tanaman=([a-z-]+)/.exec(location.search);
  if(!m||!cardBySlug[m[1]])return false;
  var c=cardBySlug[m[1]];
  setTimeout(function(){flyTo(c.p.x+95,c.p.y+135,1.3,900);toggleOpen(c.slot,c.p)},600);
  return true;
}

/* ---------------- paths draw-on (E) ---------------- */
function initPaths(){
  var map={teduh:"#p1",kaca:"#p2",terang:"#p3"};
  if(!("IntersectionObserver" in window)){Object.keys(map).forEach(function(z){$(map[z]).classList.add("drawn")});return}
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(en.isIntersecting){var p=$(map[en.target.dataset.zone]);if(p)p.classList.add("drawn");io.unobserve(en.target)}
    });
  },{root:null,threshold:0.15});
  $all(".zone").forEach(function(z){if(map[z.dataset.zone])io.observe(z)});
}

/* ---------------- easter egg: gate x5 ---------------- */
var taps=0,tapTimer=null;
$("#gate").addEventListener("click",function(){
  taps++;clearTimeout(tapTimer);tapTimer=setTimeout(function(){taps=0},3000);
  if(taps>=5){taps=0;leafFall();announce("Wah, rajin mengetuk gerbang! Daun-daun ikut senang.")}
  else if(taps>1)toast("Pak Kebun: ketuk "+(5-taps)+" kali lagi…");
});
function leafFall(){
  if(reduced())return;
  for(var i=0;i<26;i++){
    (function(i){
      var s=el("span","leaf-fall");s.innerHTML=icon("i-leaf");
      s.style.left=(Math.random()*100)+"vw";s.style.top="-40px";
      s.style.fontSize=(14+Math.random()*22)+"px";
      s.style.animationDelay=(Math.random()*0.9)+"s";
      s.firstChild.style.width="1em";s.firstChild.style.height="1em";
      document.body.appendChild(s);
      setTimeout(function(){s.remove()},4200);
    })(i);
  }
}

/* ---------------- motion toggle ---------------- */
$("#gerakBtn").addEventListener("click",function(){
  var h=document.documentElement,off=h.classList.toggle("reduced");
  this.setAttribute("aria-pressed",String(!off));
  this.textContent=off?"Gerak: Mati":"Gerak: Nyala";
  announce(off?"Gerak dimatikan. Kebun jadi tenang.":"Gerak dinyalakan kembali.");
});

/* ---------------- boot ---------------- */
buildCards();
refreshFavs();
initPaths();
applyFilter();
function bootCam(){
  if(window.__booted)return;window.__booted=true;
  cam.s=minS();cam.x=viewport.clientWidth/2-(WORLD_W/2)*cam.s;cam.y=viewport.clientHeight/2-(WORLD_H/2)*cam.s;
  clampCam();apply();
  if(deepLink())return;
  if(reduced())resetView(1);
  else setTimeout(function(){resetView(1600)},900);
}
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(bootCam);else bootCam();
setTimeout(bootCam,2500);
})();
