var Localization = function() {

    this.languages = {
        "af" : {
            lang : "Afrikaans",
            encoding : [ "windows-1252" ]
        },
        "sq" : {
            lang : "Albanian",
            encoding : [ "windows-1252" ]
        },
        "ar" : {
            lang : "Arabic",
            encoding : [ "windows-1256" ]
        },
        "bat" : {
            lang : "Baltic",
            encoding : [ "windows-1257" ]
        },
        "eu" : {
            lang : "Basque",
            encoding : [ "windows-1252" ]
        },
        "pb" : {
            lang : "Brazillian",
            encoding : [ "iso-8859-1" ]
        },
        "bg" : {
            lang : "Bulgarian",
            encoding : [ "Windows-1251" ]
        },
        "be" : {
            lang : "Byelorussian",
            encoding : [ "iso-8859-5" ]
        },
        "ca" : {
            lang : "Catalan",
            encoding : [ "windows-1252" ]
        },
        "hr" : {
            lang : "Croatian",
            encoding : [ "windows-1250" ]
        },
        "cs" : {
            lang : "Czech",
            encoding : [ "iso-8859-2" ]
        },
        "da" : {
            lang : "Danish",
            encoding : [ "iso-8859-1" ]
        },
        "nl" : {
            lang : "Dutch",
            encoding : [ "iso-8859-1" ]
        },
        "en" : {
            lang : "English",
            encoding : [ "iso-8859-1" ]
        },
        "eo" : {
            lang : "Esperanto",
            encoding : [ "iso-8859-3" ]
        },
        "et" : {
            lang : "Estonian",
            encoding : [ "iso-8859-4" ]
        },
        "fo" : {
            lang : "Faroese",
            encoding : [ "windows-1252" ]
        },
        "fi" : {
            lang : "Finnish",
            encoding : [ "iso-8859-1" ]
        },
        "fr" : {
            lang : "French",
            encoding : [ "windows-1252" ]
        },
        "gl" : {
            lang : "Galician",
            encoding : [ "iso-8859-9" ]
        },
        "de" : {
            lang : "German",
            encoding : [ "windows-1252" ]
        },
        "el" : {
            lang : "Greek",
            encoding : [ "windows-1253" ]
        },
        "iw" : {
            lang : "Hebrew",
            encoding : [ "iso-8859-8" ]
        },
        "hu" : {
            lang : "Hungarian",
            encoding : [ "iso-8859-2" ]
        },
        "is" : {
            lang : "Icelandic",
            encoding : [ "iso-8859-1" ]
        },
        "ga" : {
            lang : "Irish",
            encoding : [ "iso-8859-1" ]
        },
        "it" : {
            lang : "Italian",
            encoding : [ "iso-8859-1" ]
        },
        "ja" : {
            lang : "Japanese",
            encoding : [ "shift_jis" ]
        },
        "ko" : {
            lang : "Korean",
            encoding : [ "euc-kr" ]
        },
        "lv" : {
            lang : "Latvian",
            encoding : [ "iso-8859-13" ]
        },
        "lt" : {
            lang : "Lithuanian",
            encoding : [ "iso-8859-13" ]
        },
        "mk" : {
            lang : "Macedonian",
            encoding : [ "iso-8859-5" ]
        },
        "mt" : {
            lang : "Maltese",
            encoding : [ "iso-8859-3" ]
        },
        "no" : {
            lang : "Norwegian",
            encoding : [ "iso-8859-1" ]
        },
        "pl" : {
            lang : "Polish",
            encoding : [ "iso-8859-2" ]
        },
        "pt" : {
            lang : "Portuguese",
            encoding : [ "iso-8859-1" ]
        },
        "pt-br" : {
            lang : "Portuguese",
            encoding : [ "iso-8859-1" ]
        },
        "ro" : {
            lang : "Romanian",
            encoding : [ "iso-8859-16" ]
        },
        "ru" : {
            lang : "Russian",
            encoding : [ "Windows-1251" ]
        },
        "gd" : {
            lang : "Scottish",
            encoding : [ "iso-8859-1" ]
        },
        "sr" : {
            lang : "Serbian cyrillic",
            encoding : [ "windows-1251" ]
        },
        "sr" : {
            lang : "Serbian latin",
            encoding : [ "windows-1250" ]
        },
        "sk" : {
            lang : "Slovak",
            encoding : [ "iso-8859-2" ]
        },
        "sl" : {
            lang : "Slovenian",
            encoding : [ "windows-1250" ]
        },
        "es" : {
            lang : "Spanish",
            encoding : [ "iso-8859-1" ]
        },
        "sv" : {
            lang : "Swedish",
            encoding : [ "iso-8859-1" ]
        },
        "tr" : {
            lang : "Turkish",
            encoding : [ "iso-8859-9" ]
        },
        "uk" : {
            lang : "Ukrainian",
            encoding : [ "iso-8859-5" ]
        }
    };

    this.subtitles =  {
        'Afrikaans': 'af',
        'Albanian': 'sq',
        'Arabic': 'ar',
        'Baltic': 'bat',
        'Basque': 'eu',
        'Bengali': 'bn',
        'Brazillian': 'pb',
        'Brazilian-portuguese': 'pt-br',
        'Bulgarian': 'bg',
        'Bosnian': 'bs',
        'Byelorussian': 'be',
        'Catalan': 'ca',
        'Chinese': 'zh',
        'Croatian': 'hr',
        'Czech': 'cs',
        'Danish': 'da',
        'Dutch': 'nl',
        'English': 'en',
        'Esperanto': 'eo',
        'Estonian': 'et',
        'Faroese': 'fo',
        'Farsi-persian': 'fa',
        'Finnish': 'fi',
        'French': 'fr',
        'Galician': 'gl',
        'German': 'de',
        'Greek': 'el',
        'Hebrew': 'he',
        'Hungarian': 'hu',
        'Icelandic':'is',
        'Indonesian': 'id',
        'Irish': 'ga',
        'Italian': 'it',
        'Japanese': 'ja',
        'Korean': 'ko',
        'Latvian': 'lv',
        'Lithuanian': 'lt',
        'Macedonian': 'mk',
        'Malay': 'ms',
        'Maltese': 'mt',
        'Norwegian': 'no',
        'Polish': 'pl',
        'Portuguese': 'pt',
        'Romanian': 'ro',
        'Russian': 'ru',
        'Scottish': 'gd',
        'Serbian cyrillic': 'sr',
        'Serbian latin': 'sr',
        'Serbian': 'sr',
        'Slovak': 'sk',
        'Slovenian': 'sl',
        'Spanish': 'es',
        'Swedish': 'sv',
        'Thai': 'th',
        'Turkish': 'tr',
        'Urdu': 'ur',
        'Ukrainian': 'uk',
        'Vietnamese': 'vi'
    };
};

module.exports = new Localization();
