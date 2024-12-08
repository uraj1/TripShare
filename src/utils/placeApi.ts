import axios from 'axios';
import { Place } from '../types';

const API_KEY = '7056baed421c4a5992f72eb7b064fc9a';

export async function fetchNearbyPlaces(destination: string): Promise<Place[]> {
  try {
    
    const geocodeResponse = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        destination
      )}&apiKey=${API_KEY}`
    );

    if (geocodeResponse.data.features.length === 0) {
      throw new Error('Location not found');
    }

    const [lon, lat] = geocodeResponse.data.features[0].geometry.coordinates;

    
    const placesResponse = await axios.get(
      `https://api.geoapify.com/v2/places?categories=tourism.attraction,tourism.sights,entertainment.culture&filter=circle:${lon},${lat},5000&limit=9&apiKey=${API_KEY}`
    );

    return placesResponse.data.features.map((place: any) => ({
      id: place.properties.place_id,
      name: place.properties.name || 'Unnamed Location',
      image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=800&auto=format`,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      description: place.properties.formatted || place.properties.categories.join(', '),
      distance: `${(place.properties.distance / 1000).toFixed(1)} km`,
      address: place.properties.formatted
    }));
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
}