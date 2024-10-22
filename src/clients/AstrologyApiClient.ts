import { astrologyApi, astrologyAPIKey } from "../../config";
import { format } from "date-fns";
import PlanetsResponse from "../models/AstrologyApi/PlanetsResponse";

class AstrologyApiClient {
  private headers;

  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
      'x-api-key': astrologyAPIKey
    };
  }

  async getPlanets(
    birthDate: Date,
    { latitude, longitude }: { latitude: number, longitude: number },
    timezone = 5.5
  ) {
    const response = await fetch(`${astrologyApi}/planets`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        year: parseInt(format(birthDate, 'yyyy')),
        month: parseInt(format(birthDate, 'M')),
        date: parseInt(format(birthDate, 'd')),
        hours: parseInt(format(birthDate, 'H')),
        minutes: parseInt(format(birthDate, 'm')),
        seconds: 0,
        latitude,
        longitude,
        timezone,
        settings: {
          observation_point: "topocentric",
          ayanamsha: "lahiri"
        }
      })
    });

    const { output }: PlanetsResponse = await response.json();

    return output;
  }
}

export default AstrologyApiClient;