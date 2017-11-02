import storage from './storage'
let language = storage.get('language')
if (!language) {
    if (navigator.appName === 'Netscape') {
        language = navigator.language
    } else {
        language = navigator.userLanguage
    }
    let sec = language.split('-')
    sec[1] = sec[1].toUpperCase()
    language = sec.join('-')
    storage.set('language', language, 365 * 24 * 60 * 60)
}
export default language
