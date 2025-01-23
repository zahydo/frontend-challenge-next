// https://github.com/isaachinman/next-i18next
const path = require('path');
module.exports = {
    i18n: {
        defaultLocale: "es-CO",
        locales: ['en-US', "es-CO"]
    },
    localePath: path.resolve('./public/locales')
};  