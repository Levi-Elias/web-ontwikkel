function saveLetter() {
    const name = document.getElementById('name').value;
    const letter = document.getElementById('letter').value;
    
    if (!name || !letter.trim()) {
        alert('Vul zowel de naam als de brief in!');
        return;
    }
    
    alert(`Brief voor ${name} is opgeslagen!`);
}


let inputIMG = document.querySelector('#input-file');
inputIMG.addEventListener("change", () => {
    const files = inputIMG.files;

    if (files.length > 0) {
        const file = files[0];
        const newImage = document.createElement('img');
        newImage.classList.add('fit');
        newImage.src = URL.createObjectURL(file);

        const newPreview = document.createElement('div');
        newPreview.classList.add('preview');
        newPreview.appendChild(newImage);

        const backgroundPreviewContainer = document.querySelector('.backgroundPreview');
        backgroundPreviewContainer.insertBefore(newPreview, document.querySelector('.UploadImage'));
        
        newImage.addEventListener('click', function() {
            updateBG(newImage.src); 
        });
    }
});


function updateBG(background){ 
let image = document.getElementById("backgroundimage")
image.src = background
}

document.querySelectorAll('.backgroundPreview .preview img').forEach(function(img) {
    img.addEventListener('click', function() {
        const newBackground = img.src;
        updateBG(newBackground); 
    });
});


function updateFont(font) {
    const fontPreview = document.querySelector('.fontpreview');
    const gedichtText = document.querySelector('.gedichtText'); 

    if (fontPreview) {
        fontPreview.style.fontFamily = font;
    }

    if (gedichtText) {
        gedichtText.style.fontFamily = font;
    }
}

document.querySelectorAll('.fontOption').forEach(option => {
    option.addEventListener('click', function () {
        const selectedFont = this.getAttribute('data-font');
        updateFont(selectedFont);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById('name');
    const poemButton = document.getElementById("generatePoemBtn");
    let name = nameInput.value || "liefste"; 

    function generatePoem() {
        
        
        const poems = [
            `Jij bent de zon die voor mij schijnt,\nMijn hart is voor jou altijd geveinsd. \n \n Wil je mijn valentijn zijn?`,
            `Elke dag met jou is puur geluk,\nJij bent mijn liefde, mijn mooiste stuk.`,
            `Liefste ${name}, jij bent mijn droom,\nMijn liefde voor jou is als een stroom.`,
            `In jouw ogen zie ik mijn leven,\nJij bent degene aan wie ik alles wil geven.`,
            `Liefde is een lied, en jij bent de melodie,\nMet jou voel ik me vrij, zo blij en harmonie.`,
            `Mijn hart slaat sneller als ik jou zie,\nLiefste ${name}, jij bent mijn symfonie.`
        ];


        const randomPoem = poems[Math.floor(Math.random() * poems.length)];
        let prevText = ""
        console.log("Generated Poem:", randomPoem);

        const textElement = document.querySelector('.gedichtText');
        

        if (randomPoem != textElement.textContent){
            textElement.textContent = randomPoem;
            prevText = randomPoem
        } else{
        generatePoem();
        }
       

    
    }

    nameInput.addEventListener('input', () => {
        name = nameInput.value || "liefste";
    });

    poemButton.addEventListener("click", () => {
        generatePoem();
    });
});

document.addEventListener("DOMContentLoaded", () => {
        const textElement = document.querySelector('.gedichtText');
        const textColorPicker = document.getElementById("textColor");
        const fontSizeSlider = document.getElementById("fontSize");
        const moveUpBtn = document.getElementById("moveUp");
        const moveDownBtn = document.getElementById("moveDown");
        const moveLeftBtn = document.getElementById("moveLeft");
        const moveRightBtn = document.getElementById("moveRight");
    
        let positionX = textElement.offsetLeft;
        let positionY = textElement.offsetTop;
    
        console.log("Initial Position:", positionX, positionY); 
    
        textColorPicker.addEventListener("input", (e) => {
            textElement.style.color = e.target.value;
        });
    
        fontSizeSlider.addEventListener("input", (e) => {
            textElement.style.fontSize = e.target.value + "px";
        });
    
        moveUpBtn.addEventListener("click", () => {
            positionY = textElement.offsetTop;
            positionY -= 5;
            updateTextPosition();
        });
    
        moveDownBtn.addEventListener("click", () => {
            positionY = textElement.offsetTop;
            positionY += 5;
            updateTextPosition();
        });
    
        moveLeftBtn.addEventListener("click", () => {
            positionX = textElement.offsetLeft;
            positionX -= 5;
            updateTextPosition();
        });
    
        moveRightBtn.addEventListener("click", () => {
            positionX = textElement.offsetLeft;
            positionX += 5;
            updateTextPosition();
        });
    
        function updateTextPosition() {
            textElement.style.position = "absolute"; 
            textElement.style.left = positionX + "px";
            textElement.style.top = positionY + "px";
        }
    });

    