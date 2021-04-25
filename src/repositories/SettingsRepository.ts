import { EntityRepository, Repository } from 'typeorm'
import Setting from '../entities/Setting'

@EntityRepository(Setting)
export default class SettingsRepository extends Repository<Setting> {}
