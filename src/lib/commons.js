const DEFAULT_LOCALE = "es-CO";
const LOCALES = ['en-US', DEFAULT_LOCALE];
const languagesMap = {
    "en-US": {
        label: "en-US",
        flag: "us",
        alt: "United States flag"
    },
    [DEFAULT_LOCALE]: {
        label: DEFAULT_LOCALE,
        flag: "co",
        alt: "Colombia flag"
    }
}

const mapLocaleToLanguage = (locale) => {
    return languagesMap[locale];
}

module.exports = {
    DEFAULT_LOCALE,
    LOCALES,
    mapLocaleToLanguage
}