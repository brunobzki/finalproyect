
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem('savedPlants', JSON.stringify(savedPlants));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}




export async function loadHeaderFooter(path, element) {
  let elementTemplate = await fetch(path);
  if (!elementTemplate.ok) {
    console.error(`Error ${elementTemplate.status}: No se pudo cargar ${path}`);
    return;
  }

  let elementTemplateText = await elementTemplate.text();
  let elementLoc = document.getElementById(element);

  // Renderiza la plantilla y actualiza tanto el contador del carrito como el de la lista de deseos
  renderWithTemplate(elementTemplateText, elementLoc, () => {
     // Actualizar el contador del carrito
    updateWishListCount() // Actualizar el contador de la lista de deseos
  });
}


export function renderWithTemplate(templateFn, parentElement, callback) {  
    parentElement.insertAdjacentHTML("afterbegin", templateFn);

  if (callback)
  {
    callback();
  }
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false, discounted = false) {
  let htmlString = "";
  if (discounted) {
    list.forEach(element => {
      if (element.IsClearance) {
        htmlString += templateFn(element, true);
      }
      else {
        htmlString += templateFn(element, false);
      }
    });
  }

  else {
    htmlString = list.map(templateFn).join('');
  }
  
  if (clear) {
    parentElement.innerHTML = '';
  }

  parentElement.insertAdjacentHTML(position, htmlString);
}




export function updateWishListCount() {
    
    const currentPage = window.location.pathname;
    if (currentPage.includes("/src/gardenwish/index.html")) {
        
        const savedPlants = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        const wishlistCountElement = document.getElementById('wishlist-count');
        if (wishlistCountElement) {
            wishlistCountElement.textContent = savedPlants.length;
        }
    }
}






