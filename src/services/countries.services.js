export const getCountries = async () => {
    try {
      const response = await fetch('src/assets/CountriesData.json');
      if (!response.ok) {
        throw new Error(`error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error; 
    }
  };