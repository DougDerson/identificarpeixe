const $ = id => document.getElementById(id);

const defaultFish = [
  {
    id:"tilapia",
    name:"Tilápia",
    scientific:"Oreochromis niloticus",
    description:"Peixe de água doce muito comum na piscicultura. Possui corpo relativamente alto e coloração geralmente prateada.",
    facts:["Água doce","Piscicultura","Ciclídeo"],
    image:""
  },
  {
    id:"pacu",
    name:"Pacu",
    scientific:"Piaractus mesopotamicus",
    description:"Peixe de água doce encontrado em rios da América do Sul, com corpo robusto e dentes adaptados a uma dieta variada.",
    facts:["Água doce","Pantanal","Characiforme"],
    image:""
  },
  {
    id:"dourado",
    name:"Dourado",
    scientific:"Salminus brasiliensis",
    description:"Peixe predador de água doce, conhecido pela coloração dourada e pela forte capacidade de natação.",
    facts:["Predador","Água doce","Pantanal"],
    image:""
  },
  {
    id:"pintado",
    name:"Pintado",
    scientific:"Pseudoplatystoma corruscans",
    description:"Grande peixe de água doce, caracterizado pelas manchas e pelo corpo alongado.",
    facts:["Água doce","Bagre","Pantanal"],
    image:""
  }
];

let fishDb = JSON.parse(localStorage.getItem("fishDb") || "null") || defaultFish;
let selectedFile = null;

function saveDb(){ localStorage.setItem("fishDb", JSON.stringify(fishDb)); }

function renderFish(){
  $("fishGrid").innerHTML = "";
  fishDb.forEach(f => {
    const el = document.createElement("div");
    el.className = "fish";
    const img = f.image || "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#e9f4f0"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="70">🐟</text></svg>`
    );
    el.innerHTML = `<img src="${img}" alt="${escapeHtml(f.name)}"><div><strong>${escapeHtml(f.name)}</strong><small>${escapeHtml(f.scientific)}</small></div>`;
    $("fishGrid").appendChild(el);
  });
}
function escapeHtml(s){return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

function loadImage(file){
  if(!file) return;
  selectedFile = file;
  const url = URL.createObjectURL(file);
  $("previewImage").src = url;
  $("previewImage").style.display = "block";
  $("placeholder").style.display = "none";
  $("identifyBtn").disabled = false;
  $("status").textContent = "Foto pronta";
  $("status").style.background = "#e7f7f0";
}

$("cameraInput").addEventListener("change", e => loadImage(e.target.files[0]));
$("galleryInput").addEventListener("change", e => loadImage(e.target.files[0]));

$("identifyBtn").addEventListener("click", async ()=>{
  if(!selectedFile) return;
  $("status").textContent = "Analisando...";
  $("identifyBtn").disabled = true;
  await new Promise(r=>setTimeout(r,900));

  // DEMONSTRAÇÃO:
  // Aqui será conectado o modelo de IA na próxima etapa.
  // Atualmente selecionamos uma espécie de forma simulada.
  const fish = fishDb[Math.floor(Math.random() * fishDb.length)] || defaultFish[0];
  const confidence = Math.floor(82 + Math.random()*15);

  $("resultEmpty").style.display = "none";
  $("resultContent").style.display = "flex";
  $("resultSubtitle").textContent = "Resultado do modo demonstração";

  const imgUrl = URL.createObjectURL(selectedFile);
  $("resultImage").src = imgUrl;
  $("resultName").textContent = fish.name;
  $("resultScientific").textContent = fish.scientific || "";
  $("resultDescription").textContent = fish.description || "Sem descrição cadastrada.";
  $("confidenceValue").textContent = confidence + "%";
  $("confidenceBar").style.width = confidence + "%";
  $("resultFacts").innerHTML = (fish.facts || []).map(x=>`<span class="fact">${escapeHtml(x)}</span>`).join("");

  $("status").textContent = "Concluído";
  $("identifyBtn").disabled = false;
  $("resultCard").scrollIntoView({behavior:"smooth",block:"start"});
});

$("addFishBtn").onclick = ()=> $("fishModal").classList.remove("hidden");
$("closeModal").onclick = ()=> $("fishModal").classList.add("hidden");

$("saveFishBtn").onclick = async ()=>{
  const name = $("fishName").value.trim();
  const scientific = $("fishScientific").value.trim();
  const description = $("fishDescription").value.trim();
  const file = $("fishPhoto").files[0];

  if(!name){ alert("Informe o nome do peixe."); return; }

  let image = "";
  if(file){
    image = await fileToDataUrl(file);
  }

  fishDb.push({
    id: Date.now().toString(),
    name,
    scientific,
    description,
    facts:["Cadastrado pelo usuário"],
    image
  });

  saveDb();
  renderFish();

  $("fishName").value="";
  $("fishScientific").value="";
  $("fishDescription").value="";
  $("fishPhoto").value="";
  $("fishModal").classList.add("hidden");
};

function fileToDataUrl(file){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=()=>resolve(reader.result);
    reader.onerror=reject;
    reader.readAsDataURL(file);
  });
}

renderFish();
