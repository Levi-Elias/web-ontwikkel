function saveLetter() {
    const name = document.getElementById('name').value;
    const letter = document.getElementById('letter').value;
    
    if (!name || !letter.trim()) {
        alert('Vul zowel de naam als de brief in!');
        return;
    }
    
    alert(`Brief voor ${name} is opgeslagen!`);
}

let preview = $('.preview')

function updateBG(background){ //function to update image with provided background data
let image = document.getElementById("backgroundimage")
image.src = background
}

let currentimage = "https://static.vecteezy.com/ti/gratis-vector/p1/19018344-hart-liefde-achtergrond-valentijn-kader-rood-harten-achtergrond-liefde-achtergrond-ontwerp-illustratie-valentijn-achtergrond-liefde-hart-abstract-rood-achtergrond-rood-hart-spandoek-vector.jpg"
updateBG(currentimage)
