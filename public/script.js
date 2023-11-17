const getFruits = async() => {
    try{
        return (await fetch("/api/fruits")).json();
    }catch(error){
        console.log(error);
    }
};

const showFruits = async() => {
    let fruits = await getFruits();
    let fruitsDiv = document.getElementById("fruits-list");
    fruitsDiv.innerHTML = "";
    fruits.forEach((fruit) => {
        const section = document.createElement("section");
        section.classList.add("fruit");
        fruitsDiv.append(section);

        const a = document.createElement("a");
        a.href = "#"
        section.append(a);

        h3 = document.createElement("h3");
        h3.innerHTML = fruit.name;
        a.append(h3);

        a.onclick = (e) => {
            e.preventDefault();
            displayFruits(fruit);
        };
    });
};

const displayFruits = (fruit) => {
    const fruitsInfo = document.getElementById("fruits-info");
    fruitsInfo.innerHTML = "";

    const dLink = document.createElement("a");
    dLink.innerHTML = "	&#x2715;";
    fruitsInfo.append(dLink);
    dLink.id = "delete-link";

    const eLink = document.createElement("a");
    eLink.innerHTML = "&#9998;";
    fruitsInfo.append(eLink);
    eLink.id = "edit-link";

    const name = document.createElement("h3");
    name.innerHTML = `<strong>Name: </strong> ${fruit.name}`;
    fruitsInfo.append(name);

    const color = document.createElement("p");
    color.innerHTML = `<strong>Color: </strong> ${fruit.color}`;
    fruitsInfo.append(color);

    const family = document.createElement("p");
    family.innerHTML = `<strong>Family: </strong> ${fruit.family}`;
    fruitsInfo.append(family);

    const place = document.createElement("p");
    place.innerHTML = `<strong>Place: </strong> ${fruit.place}`;
    fruitsInfo.append(place);

    const growth = document.createElement("p");
    growth.innerHTML = `<strong>Growth: </strong> ${fruit.growth}`;
    fruitsInfo.append(growth);

    const image = document.createElement("img");
    image.src = fruit.image;
    fruitsInfo.append(image);

    const d = document.createElement("ul");
    fruitsInfo.appendChild(d); 
    fruit.forEach((item) => { 
        const li = document.createElement("li");
        d.appendChild(li);
        li.innerHTML = item;
    });

    dLink.onclick = (e) => {
        e.preventDefault();
        
    };

    eLink.onclick = (e) => {
        e.preventDefault();
        document.querySelector(".dialog").classList.remove("transparent");
        document.getElementById("title").innerHTML = "Edit Exotic Fruit Info";
    };

    populateEditForm(fruit);
};

const populateEditForm = (fruit) => {
    const form = document.getElementById("edit-fruit");
    form._id.value = fruit._id;
    form.name.value = fruit.name;
    form.color.value = fruit.color;
    form.family.value = fruit.family;
    populatePlaces(fruit.places);
    form.growth.value = fruit.growth;
    form.image.value = fruit.image;
};

const populatePlaces = (places) => {
    const section = document.getElementById("place-boxes");
    places.forEach((place) => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = place;
        section.append(input);
    });
};

const addExoticFruit = async(e) => {
    e.preventDefault();
    const form =  document.getElementById("edit-fruit");
    const formData = new FormData(form);
   
    let response;
    formData.append("place", getExoticFruits());
    if(form._id.value == -1){
        formData.delete("_id");
        formData.delete("img");
       

        console.log(...formData);

        response = await fetch("/api/fruits", {
            method: "POST",
            body: formData
        });

    }

    else{
        formData.delete("img");
        console.log(...formData);

        response = await fetch("/api/fruits/", {
            method: "PUT",
            body: formData
        });
    }

    if(response.status != 200){
        console.log("Posting Error");
        return;
    }

    
    resetForm();
    document.querySelector(".dialog").classList.add("transparent");
    showFruits();
};

const getExoticFruits = () => {
    const inputs = document.querySelectorAll("#place-boxes input");
    let place = [];

    inputs.forEach((input) => {
        place.push(input.value);
    });

    return place;
};

const addPlace = (e) => {
    e.preventDefault();
    const section = document.getElementById("place-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
}

const resetForm = () => {
    const form = document.getElementById("edit-fruit");
    form.reset();
    form._id = "-1";
    document.getElementById("place-boxes").innerHTML="";
    
};

const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("title").innerHTML = "Add Exotic Fruit";
    resetForm();
};




window.onload = () => {
    showFruits();
    document.getElementById("edit-fruit").onsubmit = addExoticFruit;
    document.getElementById("add").onclick = showHideAdd;

    document.querySelector(".close").onclick = () => {
        document.querySelector(".dialog").classList.add("transparent");
    };

    document.getElementById("add-place").onclick= addPlace;
};
