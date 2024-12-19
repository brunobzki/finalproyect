export default class ExternalServices {
    
  constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseUrl = "https://house-plants2.p.rapidapi.com"; 
  }

  async getCategories() {
      const response = await fetch(`${this.baseUrl}/categories`, {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': this.apiKey,
              'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
          }
      });
      
      
      const text = await response.text(); 
      if (!response.ok) {
          console.error(`Error ${response.status}: ${text}`); 
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      try {
          return JSON.parse(text); 
      } catch (e) {
          console.error("Error parsing JSON:", e);
          console.error("Response body:", text); 
          throw new Error("Response is not valid JSON");
      }
  }
}

  