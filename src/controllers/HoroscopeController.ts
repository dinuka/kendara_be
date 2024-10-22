import AstrologyApiClient from '../clients/AstrologyApiClient';

class HoroscopeController {
  private astrologyApiClient;

  constructor() {
    this.astrologyApiClient = new AstrologyApiClient();
  }

  async add(name: string, birthDate: string, location: { latitude: number, longitude: number }, timezone?: number) {
    const planets = await this.astrologyApiClient.getPlanets(new Date(birthDate), location, timezone);

    console.log(planets);
  }

  getAll() {
    return [];
  }
}

export default HoroscopeController;