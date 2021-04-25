import { Setting } from '../entities/Setting'
import { ISetting } from '../protocols/ISetting'
import { SettingsService } from '../services/SettingsService'

class SettingsController {
  createNewSetting(setting: ISetting): Promise<Setting> {
    // validar e checar autorização
    const settingsService = new SettingsService()
    return settingsService.create(setting)
  }
}

export { SettingsController }
