type PlanetsResponse = {
  statusCode: number;
  input: {
    year: number;
    month: number;
    date: number;
    hours: number;
    minutes: number;
    seconds: number;
    latitude: number;
    longitude: number;
    timezone: number;
    config: {
      observation_point: string;
      ayanamsha: string;
    };
  };
  output: [
    {
      [key: string]: PlanetInfo | { name: string; value: number } | { observation_point: string; ayanamsha: string };
    },
    PlanetData
  ];
};

type PlanetData = {
  [key: string]: PlanetInfo;
};

type PlanetInfo = {
  name?: string;
  current_sign: number;
  fullDegree: number;
  normDegree: number;
  isRetro: string;
};

export default PlanetsResponse;