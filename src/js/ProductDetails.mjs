export default class ProductDetails {
    constructor(common_names, dataSource) {
        this.common_names = common_names;
        this.dataSource = dataSource;
        this.plant = {};
    }

    async init() {
        this.plant = await this.dataSource.findPlantByCommonNames(this.common_names);
        if (this.plant) {
            this.renderPlantDetails("main");
            document.getElementById('addToWish')
                .addEventListener('click', this.addToWish.bind(this));
        } else {
            console.error(`No plants were found with the common names: ${this.common_names}`);
        }
    }


    addToWish() {
        let wishList = getLocalStorage("plant-wish") || [];
        const existingItemIndex = wishList.findIndex(item => item.id === this.plant.id);

        if (existingItemIndex > -1) {
            alert(`${this.plant["Common name (fr.)"]} It's already on your wish list.`);
        } else {
            wishList.push(this.plant);
            setLocalStorage("plant-wish", wishList);
            alert(`${this.plant["Common name (fr.)"]} Has been added to your wish list.`);
        }
    }


    renderPlantDetails(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            console.error(`Element with selector not found "${selector}".`);
            return;
        }


        element.insertAdjacentHTML("afterbegin", this.plantDetailsTemplate(this.plant));
    }

    plantDetailsTemplate(plant) {
        const commonNames = plant["Common name"].join(', ');
        const insects = plant.Insects ? plant.Insects.join(', ') : 'Ninguno';
        const uses = plant.Use ? plant.Use.join(', ') : 'No especificado';
        const temperatureRange = `${plant["Temperature min"].C}°C - ${plant["Temperature max"].C}°C`;

        return `
    <div class="plant-details">
        <h2>${plant["Common name (fr.)"] || 'Nombre desconocido'}</h2>
        <p><strong>Nombre en latín:</strong> ${plant["Latin name"] || 'Desconocido'}</p>
        <p><strong>Familia:</strong> ${plant.Family || 'Desconocido'}</p>
        
        <!-- Carousel de imágenes -->
        <div class="image-carousel">
            ${(plant.images || [plant.img]).map((img, index) => `
                <div class="carousel-item${index === 0 ? ' active' : ''}">
                    <img src="${img}" alt="${plant["Common name (fr.)"] || 'Imagen de planta'}">
                </div>
            `).join('')}
            <button class="carousel-control prev">❮</button>
            <button class="carousel-control next">❯</button>
        </div>
        
        <p><strong>Nombres comunes:</strong> ${commonNames || 'Desconocido'}</p>
        <p><strong>Usos:</strong> ${uses}</p>
        <p><strong>Insectos comunes:</strong> ${insects}</p>
        <p><strong>Rango de temperatura:</strong> ${temperatureRange}</p>
        <p><strong>Altura al comprar:</strong> ${plant["Height at purchase"].cm} cm</p>
        <p><strong>Ancho al comprar:</strong> ${plant["Width at purchase"].cm} cm</p>
        <p><strong>Riego:</strong> ${plant.Watering}</p>
        
        <button id="addToWish">Añadir a la Lista de Deseos</button>
    </div>`;
    }

}
document.querySelectorAll('.image-carousel').forEach(carousel => {
    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    const showItem = (index) => {
        items[currentIndex].classList.remove('active');
        currentIndex = (index + items.length) % items.length;
        items[currentIndex].classList.add('active');
    };

    carousel.querySelector('.prev').addEventListener('click', () => showItem(currentIndex - 1));
    carousel.querySelector('.next').addEventListener('click', () => showItem(currentIndex + 1));
});


function getLocalStorage(key) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
}


function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
