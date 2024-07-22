function loadData(url, callback) {
	fetch(url)
	  .then(function (response) {
		return response.json();
	  })
	  .then(function (json) {
		callback(json);
	  });
  }
  
  function populateContent(con) {
	const nameEl = document.querySelector("#name");
	const imageEl = document.querySelector("#image");
	const locationEl = document.querySelector("#location");
	const dateEl = document.querySelector("#date");
	const typeEl = document.querySelector("#type");
	const descriptionEl = document.querySelector("#description");
	const orginfoEl = document.querySelector("#orginfo");
    const otherList = document.querySelector("#other-list");
	const centerEl = document.querySelector("#center");
	const zoomEl = document.querySelector("#zoom");
	const saveButton = document.querySelector("#saveButton");
  
	nameEl.textContent = con.name;
	imageEl.setAttribute("src", con.filename);
	imageEl.setAttribute("alt", con.name);
	locationEl.textContent = `Hosted in:${con.location}`;
	dateEl.textContent = con.date;
	typeEl.textContent = con.type;
	descriptionEl.textContent = con.description;
	centerEl.textContent = `Center: [${con.center.join(', ')}]`;
	zoomEl.textContent = `Zoom: ${con.zoom}`;
	orginfoEl.textContent = `${con.orginfo.name}`;
	otherList.innerHTML = "";
    con.orginfo.other.forEach(function (other) {
        const newLi = document.createElement("li");
        newLi.textContent = other;
        otherList.appendChild(newLi);
    });

  
  
	const save = JSON.parse(localStorage.getItem("save")) || [];
	const saved = save.some((fav) => fav.id === con.id);
  
	if (saveButton && !saved) {
	  saveButton.style.display = "block";
	  saveButton.addEventListener("click", function (event) {
		event.preventDefault();
  
		save.push(con);
		localStorage.setItem("save", JSON.stringify(save));
  
		saveButton.style.display = "none";
	  });
	} else if (saveButton && saved) {
	  saveButton.style.display = "none"; 
	}
  }
  
  function initMap(con) {
	var map = L.map("map").setView(con.center, con.zoom);
  
	var tilelayer = L.tileLayer(
	  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
	  {
		attribution:
		  'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
	  }
	).addTo(map);
  
	var marker = L.marker(con.center).addTo(map);
	marker.bindPopup(`<b>${con.name}</b><br>${con.location}`).openPopup();
  
	populateContent(con);
  }
  
  function init() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");
	loadData("data/con" + id + ".json", initMap);
  }
  
  init();
  
