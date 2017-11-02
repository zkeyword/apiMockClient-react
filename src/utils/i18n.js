import { addLocaleData } from 'react-intl'
import zh from 'react-intl/locale-data/zh'
import en from 'react-intl/locale-data/en'
import * as i18n from '../locales'
import language from './language'
import storage from './storage'

let lang = language.split('-').join('_')

addLocaleData([...en, ...zh])

if (!i18n[lang]) {
    lang = 'zh_CN'
    storage.set('language', 'zh-CN', 365 * 24 * 60 * 60)
}

export default i18n[lang]
