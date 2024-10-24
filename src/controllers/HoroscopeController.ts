import HoroscopeManager from '../managers/HoroscopeManager';
import UserRepo from '../repos/UserRepo';

class HoroscopeController {

  private horoscopeManager: HoroscopeManager;

  constructor(private userRepo: UserRepo) {

    this.horoscopeManager = new HoroscopeManager();
  }

  async add(name: string, birthDate: string, location: { latitude: number, longitude: number }, timezone: number = 5.5) {

    const user = await this.userRepo.add({
      name,
      birthTime: new Date(birthDate),
      location,
      timezone
    });

    return user;
  }

  getAll() {
    return [];
  }

  async updateAll() {
    const users = await this.userRepo.getByQuery({});

    for (const user of users) {
      const horoscope = await this.horoscopeManager.calculate(user);

      await this.userRepo.replaceById(user.id, user);
    }
  }
}

export default HoroscopeController;