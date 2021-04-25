import { getCustomRepository } from 'typeorm'
import { Setting } from '../entities/Setting'
import { ISetting } from '../protocols/ISetting'
import { SettingsRepository } from '../repositories/SettingsRepository'

class SettingsService {
  private settingsRepository: SettingsRepository

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }
  async create(setting: ISetting): Promise<Setting> {
    const { username, chat } = setting
    const userAlreadyExists = await this.settingsRepository.findOne({ username }) // SELECT * FROM settings WHERE username = "username" LIMIT 1
    if (userAlreadyExists) throw new Error('User already exists!')
    const newSetting: Setting = this.settingsRepository.create(setting)
    return this.settingsRepository.save(newSetting)
  }
}

export { SettingsService }
