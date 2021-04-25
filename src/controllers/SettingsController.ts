import { getCustomRepository } from 'typeorm'
import Setting from '../entities/Setting'
import { ISetting } from '../protocols/ISetting'
import SettingsRepository from '../repositories/SettingsRepository'

export default class SettingsController {
  createNewSetting(setting: ISetting): Promise<ISetting> {
    const settingsRepository: SettingsRepository = getCustomRepository(SettingsRepository)
    const newSetting: Setting = settingsRepository.create(setting)
    return settingsRepository.save(newSetting)
  }
}
