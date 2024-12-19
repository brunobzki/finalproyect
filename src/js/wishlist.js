let savedPlants = []; 

export function displayWishlist() {
    const wishlistContainer = document.getElementById('wishlist');
    if (!wishlistContainer) {
        console.warn('Wishlist container not found. Function displayWishlist() will not run.');
        return;
    }

    wishlistContainer.innerHTML = '';

    if (savedPlants.length === 0) {
        wishlistContainer.innerHTML = '<p>No plants in your wishlist.</p>';
    } else {
        savedPlants.forEach((plant, index) => {
            const plantCard = document.createElement('div');
            plantCard.classList.add('plant-card');

            const plantImage = document.createElement('img');
            plantImage.src = plant.Img || 'default.jpg'; 
            plantImage.alt = plant["Common name (fr.)"] || 'Unknown';

            const plantInfo = document.createElement('div');
            plantInfo.classList.add('plant-info');

            const plantName = document.createElement('h3');
            plantName.textContent = plant["Common name (fr.)"] || 'Unknown';

            const latinName = document.createElement('p');
            latinName.textContent = `Latin name: ${plant["Latin name"] || 'Unknown'}`;

            const family = document.createElement('p');
            family.textContent = `Family: ${plant.Family || 'Unknown'}`;

            const Climat =document.createElement('h3');
            Climat.textContent = `Family: ${plant.Climat || 'Unknown'}`;

            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => removeFromWishlist(index));

            plantInfo.appendChild(plantName);
            plantInfo.appendChild(latinName);
            plantInfo.appendChild(family);
            plantCard.appendChild(plantImage);
            plantCard.appendChild(plantInfo);
            plantCard.appendChild(removeButton);
            plantCard.appendChild(Climat);
            wishlistContainer.appendChild(plantCard);
        });
    }
}

export function addToWishlist(plant) {
    
    savedPlants.push(plant);
    
    updateLocalStorage();
    displayWishlist();
   
    
    showAlertMessage('Plant added to wishlist successfully!');
    console.log('Plant added to wishlist:', plant);
}
function showAlertMessage(message) {
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = message;
    alertMessage.classList.add('show'); 

    
    setTimeout(() => {
        alertMessage.classList.remove('show');
    }, 3000);
}

export function removeFromWishlist(plantIndex) {
    savedPlants.splice(plantIndex, 1);
    updateLocalStorage();
    displayWishlist();
}

export function updateLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(savedPlants));
}

export function loadWishlist() {
    const storedPlants = JSON.parse(localStorage.getItem('wishlist'));
    if (storedPlants) {
        savedPlants = storedPlants;
    }
    displayWishlist();  
}
