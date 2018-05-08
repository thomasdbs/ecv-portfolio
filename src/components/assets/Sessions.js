export const CheckLanguage = () => {
  if (localStorage.getItem('language') !== null && localStorage.getItem('language') === 'en') {
    return "en"
  }else {
    return "fr"
  }
}
