class Craft {
    constructor(name, imageName, description, supplies) {
        this.name = name;
        this.imageName = imageName;
        this.description = description;
        this.supplies = supplies;
    }

    get image() {
        return `crafts/${this.imageName}`;
    }

    get imageDisplay() {
        return `<img src="${this.image}" alt="${this.name}">`;
    }

    get supplyDisplay() {
        const supplyList = document.createElement('ul');
        this.supplies.forEach(supply => {
            const supplyItem = document.createElement('li');
            supplyItem.textContent = supply;
            supplyList.appendChild(supplyItem);
        });
        return supplyList;
    }


    get modalDisplay() {
        return `
            <div class="modal-content columns">
                <div class="one">${this.imageDisplay}</div>
                <div class="ten">
                    <span class="close">&times;</span>
                    <h2>${this.name}</h2>
                    <p>${this.description}</p>
                    <h3>Supplies:</h3>
                    ${this.supplyDisplay.outerHTML}
                </div>
            </div>
        `;
    }

}

const numColumns = 4;

const getQuarterOfArray = (array, input) => {
    const quarterSize = Math.floor(array.length / numColumns);
    const startIndex = input * quarterSize;
    const endIndex = startIndex + quarterSize;
    const quarter = array.slice(startIndex, endIndex);

    const remainder = array.length % numColumns;
    if (input < numColumns - 1 && remainder !== 0) {
        const remainderArray = array.slice(array.length - remainder);
        if (remainderArray.length > input) {
            quarter.push(remainderArray[input]);
        }
    }
    return quarter;
}

const buildColumns = (crafts) => {
    for (let i = 0; i < numColumns; i++) {
        const section = document.createElement('section');
        section.classList.add('quarter');
        const quarterCrafts = getQuarterOfArray(crafts, i);
        buildColumn(quarterCrafts, section);
        document.getElementById("crafts").appendChild(section);
    }
}

const buildColumn = (quarterCrafts, section) => {
    quarterCrafts.forEach(craft => {
        const article = document.createElement('article');
        article.innerHTML = craft.imageDisplay;
        article.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.classList.add('modal');

            modal.innerHTML = craft.modalDisplay;
            const close = modal.querySelector('.close');
            close.addEventListener('click', () => {
                modal.remove();
            });
            document.body.appendChild(modal);
        });

        section.appendChild(article);
    });
}

fetch('/api/crafts')
    .then(response => response.json())
    .then(data => {
        const crafts = [];
        data.forEach(craftJson => {
            const newCraft = new Craft(craftJson.name, craftJson.image, craftJson.description, craftJson.supplies);
            crafts.push(newCraft);
        });
        buildColumns(crafts);
    })
    .catch(error => {
        console.error('Error:', error);
    });