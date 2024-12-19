import { addToWishlist, loadWishlist } from './wishlist.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('plant-search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
     

    const query = document.getElementById('plant-search-input').value;
    if (!query) return; 

    
    const apiUrl = `https://house-plants2.p.rapidapi.com/category/${query}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '1f7c780f0dmsh7dbf100a16417b6p1a2cbcjsnacf839cef036', 
          'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
        }
      });

      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); 

      
      renderPlants(data); 

    } catch (error) {
      console.error('Error fetching plant data:', error);
      document.getElementById('results').innerHTML = '<p>Error fetching plant data.</p>';
    }
  });

  
 function renderPlants(plants) {
    const container = document.getElementById('results');
    

    if (!Array.isArray(plants) || plants.length === 0) {
        container.innerHTML = '<p>No plants found.</p>';
        return;
    }

    plants.forEach(plant => {
        const plantCard = document.createElement('div');
        plantCard.classList.add('plant-card');

        const plantImage = document.createElement('img');
        plantImage.src = plant.Img || 'placeholder.jpg'; 
        plantImage.alt = plant["Common name (fr.)"] || 'Unknown';

        const plantInfo = document.createElement('div');
        plantInfo.classList.add('plant-info');

        const plantName = document.createElement('h3');
        plantName.textContent = plant["Common name (fr.)"] || 'Unknown';

        const latinName = document.createElement('p');
        latinName.textContent = `Latin name: ${plant["Latin name"] || 'Unknown'}`;

        const family = document.createElement('p');
        family.textContent = `Family: ${plant.Family || 'Unknown'}`;

        
        

        const youtubeLink = document.createElement('a');
        youtubeLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(plant["Common name (fr.)"] || 'Unknown')}`;
        youtubeLink.target = '_blank';
        youtubeLink.textContent = `Search "${plant["Common name (fr.)"] || 'Unknown'}" on YouTube`;

        const wishlistButton = document.createElement('button');
        wishlistButton.textContent = 'Add to my list';
        wishlistButton.addEventListener('click', () => addToWishlist(plant));

        plantInfo.appendChild(plantName);
        plantInfo.appendChild(latinName);
        plantInfo.appendChild(family);
       
        plantInfo.appendChild(youtubeLink);

        plantCard.appendChild(plantImage);
        plantCard.appendChild(plantInfo);
        plantCard.appendChild(wishlistButton);

        container.appendChild(plantCard);
    });

    loadWishlist(); 
    
}

    
  document.addEventListener('DOMContentLoaded', () => {
    
    renderPlants(plantsArray); 
    
  }); 
   
  }

  
);
