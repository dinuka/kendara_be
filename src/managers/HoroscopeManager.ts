import AstrologyApiClient from "../clients/AstrologyApiClient";
import User from "../models/User";

class HoroscopeManager {
  private astrologyApiClient: AstrologyApiClient;

  constructor() {
    this.astrologyApiClient = new AstrologyApiClient();
  }

  async calculate(user: User) {
    const planets = await this.astrologyApiClient.getPlanets(user.birthTime, user.location, user.timezone);

    console.log(planets)
  }

}

export default HoroscopeManager;