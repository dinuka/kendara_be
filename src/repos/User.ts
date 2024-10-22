enum Nakath {
  ASWIDHA = 'aswidha',
}

enum Rashi {
  MESHA = 'mesha'
}

enum Graha {
  KETHU = "kethu",
  SIKURU = "sikuru",
  RAVI = "ravi",
  SANDU = "sandu",
  KUJA = "kuja",
  RAHU = "rahu",
  GURU = "guru",
  SHANI = "shani",
  BUDHA = "budha",
}

enum Level {
  UCHCHA = 1,
  MULA_THRIKONA = 0.75,
  SWAKSHETHRA = 0.5,
  MITHTHRA = 0.1,
  SAMA = 0,
  SATHURU = -0.1,
  NEECHA = -1,
}

enum Bhava {
  LAGNA = 1,
}

enum Awsastha {

}

interface GrahaInfo {
  degree: number; //0-30
  rashi: Rashi;
  bhava: Bhava;
  rashiLevel: Level;
  lagnaLevel: Level;
  wargoththama?: boolean;
  wakra?: boolean;
  awastha: Awsastha;
  drushti?: {
    graha: GrahaInfo;
    gap: number;
  }[]
}

interface BhavaInfo {
  madyasputa: number;
  graha?: GrahaInfo;
  drushti?: {
    graha: GrahaInfo;
    gap: number;
  }[];
}

interface Dhasha {
  start: Date;
  end: Date;
  children: Record<Graha, Dhasha>;
}

interface User {
  id: string;
  name: string;
  birthTime: Date;
  location: {
    latitude: number;
    longitude: number;
  };
  nakatha: {
    slug: Nakath;
    pada: number; //1,2,3,4
  };
  lagna: {
    slug: Rashi;
    degree: number;
  };
  graha: Record<Graha, GrahaInfo>;
  bhava: Record<Bhava, BhavaInfo>;
  dhasha: Dhasha;
  yoga: {
    name: string;
    reason: string;
    description: string;
  }
}