function saveLetter() {
  // Create an overlay for saving image
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.classList.add("overlay-container");

  // Clone the preview
  const previewSelect = document.querySelector(".previewselect");
  const clone = previewSelect.cloneNode(true);

  document.body.appendChild(overlay);

  // Get computed styles
  const computedStyles = window.getComputedStyle(previewSelect);
  clone.style.width = computedStyles.width;
  clone.style.height = computedStyles.height;
  clone.style.transform = computedStyles.transform;

  // Create centered container
  const overlayContainer = document.createElement("div");
  overlayContainer.classList.add("overlay-wrapper");
  overlayContainer.appendChild(clone);
  overlay.appendChild(overlayContainer);

  // Adjust text position
  const textElement = clone.querySelector(".gedichtText");
  if (textElement) {
    const originalText = document.querySelector(".gedichtText");
    const textStyles = window.getComputedStyle(originalText);

    textElement.classList.add("overlay-content");
    textElement.style.fontSize = textStyles.fontSize;
    textElement.style.color = textStyles.color;
    textElement.style.fontFamily = textStyles.fontFamily;
  }

  // Wait for styles to apply then capture image
  setTimeout(() => {
    html2canvas(overlayContainer, {
      backgroundColor: null,
      scale: 2,
      width: overlayContainer.offsetWidth,
      height: overlayContainer.offsetHeight,
    })
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "liefdesbrief.png";
        link.click();

        // Clean up overlay
        document.body.removeChild(overlay);
      })
      .catch((error) => {
        console.error("Fout bij opslaan van de afbeelding:", error);
        document.body.removeChild(overlay);
      });
  }, 500);
}

//function for saving uploaded images and adding to background list
let inputIMG = document.querySelector("#input-file");
inputIMG.addEventListener("change", () => {
  const files = inputIMG.files;

  if (files.length > 0) {
    const file = files[0];
    const newImage = document.createElement("img");
    newImage.classList.add("fit");
    newImage.src = URL.createObjectURL(file);

    const newPreview = document.createElement("div");
    newPreview.classList.add("preview");
    newPreview.appendChild(newImage);

    const backgroundPreviewContainer =
      document.querySelector(".backgroundPreview");
    backgroundPreviewContainer.insertBefore(
      newPreview,
      document.querySelector(".UploadImage")
    );

    newImage.addEventListener("click", function () {
      updateBG(newImage.src);
    });
  }
});

function updateBG(background) {
  let image = document.getElementById("backgroundimage");
  image.src = background;
}

document
  .querySelectorAll(".backgroundPreview .preview img")
  .forEach(function (img) {
    img.addEventListener("click", function () {
      const newBackground = img.src;
      updateBG(newBackground);
    });
  });

//function to update preview font
function updateFont(font) {
  const fontPreview = document.querySelector(".fontpreview");
  const gedichtText = document.querySelector(".gedichtText");

  if (fontPreview) {
    fontPreview.style.fontFamily = font;
  }

  if (gedichtText) {
    gedichtText.style.fontFamily = font;
  }
}

document.querySelectorAll(".fontOption").forEach((option) => {
  option.addEventListener("click", function () {
    const selectedFont = this.getAttribute("data-font");
    updateFont(selectedFont);
  });
});

//function for random generating poems
document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const poemButton = document.getElementById("generatePoemBtn");
  const textElement = document.querySelector(".gedichtText");
  const letterTextarea = document.getElementById("letter");
  let name = nameInput.value || "liefste";

  function generatePoem() {
    const poems = [
      `Jij bent de zon die voor mij schijnt,\nMijn hart is voor jou altijd geveinsd.\n\nWil je mijn Valentijn zijn?`,
      `Elke dag met jou is puur geluk,\nJij bent mijn liefde, mijn mooiste stuk.\n\nWil je mijn Valentijn zijn?`,
      `${name}, jij bent mijn droom,\nMijn liefde voor jou is als een stroom.\n\nWil je mijn Valentijn zijn?`,
      `In jouw ogen zie ik mijn leven,\nJij bent degene aan wie ik alles wil geven.\n\nWil je mijn Valentijn zijn?`,
      `Liefde is een lied, en jij bent de melodie,\nMet jou voel ik me vrij, zo blij en harmonie.\n\nWil je mijn Valentijn zijn?`,
      `Mijn hart slaat sneller als ik jou zie,\n${name}, jij bent mijn symfonie.\n\nWil je mijn Valentijn zijn?`,
      `Jouw liefde voelt als warme zon,\n${name}, jij bent mijn nummer één, gewoon.\nIk fluister zachtjes in jouw oor:\n"Mijn hart is van jou, voor altijd en voort."\n\nWil je mijn Valentijn zijn?`,
      `Elke ster die aan de hemel staat,\nFluistert jouw naam, heel mooi en zacht.\n${name}, jij bent mijn mooiste droom,\nMet jou voelt elke dag als een zoete stroom.\n\nWil je mijn Valentijn zijn?`,
      `Als een roos die bloeit in mei,\nMaakt jouw liefde mij zo blij.\n${name}, jij bent mijn grootste wens,\nMijn liefde voor jou is oneindig intens.\n\nWil je mijn Valentijn zijn?`,
      `Mijn hart slaat sneller als jij lacht,\n${name}, jij bent de liefde die op mij wacht.\nJouw warmte vult mijn hele bestaan,\nMet jou wil ik hand in hand gaan.\n\nWil je mijn Valentijn zijn?`,
      `Liefde is een sprookje, en jij bent de prins(es),\nMet jou voel ik mij altijd op mijn best.\n${name}, jij bent mijn mooiste lied,\nVoor altijd samen, vergeet dat niet. \n\nWil je mijn Valentijn zijn?`,
    ];

    const randomPoem = poems[Math.floor(Math.random() * poems.length)];
    console.log("Generated Poem:", randomPoem);

    if (randomPoem !== textElement.textContent) {
      textElement.textContent = randomPoem;
      letterTextarea.value = randomPoem;
    } else {
      generatePoem();
    }
  }

  poemButton.addEventListener("click", () => {
    generatePoem();
  });

  // Sync text live
  letterTextarea.addEventListener("input", () => {
    textElement.textContent = letterTextarea.value;
  });

  // Update name dynamically
  nameInput.addEventListener("input", () => {
    name = nameInput.value || "liefste";
  });
});

//preview text controls
document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector(".gedichtText");
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
