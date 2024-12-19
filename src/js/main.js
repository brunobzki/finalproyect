import { loadHeaderFooter } from "./utils.mjs";
import { loadWishlist } from './wishlist.js';

document.addEventListener("DOMContentLoaded", async () => {
    console.log("El DOM se ha cargado");

    loadHeaderFooter("../partials/header.html", "main-header");
    loadHeaderFooter("../partials/footer.html", "main-footer");

  loadWishlist();
});
