const getFruits = async () => {
    try{
        return (await fetch("/api/fruits")).json();
    }catch(error){
        console.log(error);
    }
};

const showFruits = async () => {
    let fruits = await getFruits();
    let fruitsDiv = document.getElementById("fruits-list");
    fruits.forEach((fruit) => {
        const section = document.createElement("section");
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
    fruitsInfo.innerHTML = " ";

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

    const deleteLink = document.createElement("a");
    deleteLink.innerHTML = "&#x2715;";
    deleteLink.id = "delete"; 
    fruitsInfo.appendChild(deleteLink);

    const editLink = document.createElement("a");
    editLink.innerHTML = "&#9998;";
    editLink.id = "edit"; 
    fruitsInfo.appendChild(editLink);

    deleteLink.onclick = (e) => {
        e.preventDefault();
        
    };

    editLink.onclick = (e) => {
        e.preventDefault();
        document.querySelector(".dialog").classList.remove("transparent");
        document.getElementById("title").innerHTML = "Edit Exotic Fruit Info";
    };

    populateEditForm(fruit);
};

const populateEditForm = (fruit) => {

};

const addExoticFruit = async(e) => {
    e.preventDefault();
    const form =  document.getElementById("edit-fruit");
    const formData = new FormData(form);
    const imageInput = form.querySelector("#image");
    if (imageInput && imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
    }

    formData.append("fruit", getExoticFruits());
    formData.append("name", form.name.value);
    formData.append("color", form.color.value);
    formData.append("family", form.family.value);
    formData.append("place", form.place.value);
    formData.append("growth", form.growth.value);
    

    let response;

    if(form._id.value == -1){
        formData.delete("_id");
        formData.delete("img");
        

        console.log(...formData);

        response = await fetch("/api/fruits", {
            method: "POST",
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
    const inputs = document.querySelectorAll("#description input");
    let fruits = [];

    inputs.forEach((input) => {
        fruits.push(input.value);
    });

    return fruits;
};

const resetForm = () => {
    const form = document.getElementById("edit-fruit");
    form.reset();
    form._id = "-1";
    document.getElementById("description").innerHTML = "";
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

    
};
