const API_URL = 'https://restcountries.com/v3.1/all';

export const fetchCountries = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`error: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error; 
    }
  };