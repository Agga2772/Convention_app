function loadData(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
} //end of loadData()

function populateList(cons)
{
	const consList=document.querySelector("#consList");
	cons.forEach(function(con){
		const newDiv=document.createElement("Div");
		newDiv.setAttribute("class","result");

		const linkDiv=document.createElement("div");
		const newLink=document.createElement("a");
		linkDiv.appendChild(newLink)

		const spanDiv=document.createElement("div");
		const newSpan=document.createElement("span");
		spanDiv.appendChild(newSpan)

		newLink.textContent=con.name;
		newLink.setAttribute("href","details.html?id="+con.id);

		newSpan.textContent=` Organized by ${con.org}`;

		const newImg = document.createElement("Img");
		newImg.setAttribute("src", con.image);
		newImg.setAttribute("alt", con.name);


		newDiv.appendChild(newImg);
		newDiv.appendChild(linkDiv);
		newDiv.appendChild(spanDiv);

		consList.appendChild(newDiv);
	})
} //end of populateList, do not remove this line

function init(){
	loadData("data/cons.json",populateList);
}


init();
