var settings = require('../js/settings.js');

var Translations = function () {

    this.initialize = function() {
        var defaultLanguage = settings.readConfig("language");
        i18n = require('i18n');
        var path = require('path');

        $ = window.$;
        var localesDirectory = path.resolve(__dirname, '..')+'/locales';
        i18n.configure({
            locales:['en', 'de', 'nl', 'fr', 'tr', 'be', 'gr', 'sk', 'pt-br', 'sv', 'ru', 'cs', 'da', 'fi', 'no'],
            directory: localesDirectory,
            defaultLocale: defaultLanguage
        });
    };

    this.translate = function(value) {
        var translatedValue =  i18n.__(value);
        return translatedValue;
    };

    this.translateDefaults = function() {
        var topTitlebarBackButton = i18n.__('Go back');
        $('.top-titlebar-back-button').attr('title', topTitlebarBackButton);

        var topTitlebarMinimizeButton = i18n.__('Minimize');
        $('.top-titlebar-minimize-button').attr('title', topTitlebarMinimizeButton);

        var topTitlebarFullscreenButton = i18n.__('Toggle fullscreen');
        $('.top-titlebar-fullscreen-button').attr('title', topTitlebarFullscreenButton);

        var topTitlebarCloseButton = i18n.__('Close Flixtor');
        $('.top-titlebar-close-button').attr('title', topTitlebarCloseButton);

        var btnCancel = i18n.__('Cancel');
        $('.btnCancel').append(btnCancel);

        var menuMovies = i18n.__('Movies');
        $('.menuMovies').append('&nbsp;&nbsp;'+menuMovies);

        var menuSeries = i18n.__('Series');
        $('.menuSeries').append('&nbsp;&nbsp;'+menuSeries);

        var menuAnimes = i18n.__('Animes');
        $('.menuAnimes').append('&nbsp;&nbsp;'+menuAnimes);

        var menuTorrents = i18n.__('Torrents');
        $('.menuTorrents').append('&nbsp;&nbsp;'+menuTorrents);

        var menuFavorites = i18n.__('Favorites');
        $('.menuFavorites').append('&nbsp;&nbsp;'+menuFavorites);

        var menuSettings = i18n.__('Settings');
        $('.menuSettings').append('&nbsp;&nbsp;'+menuSettings);

        var moviesSearchPlaceholder = i18n.__('Movie title or magnet link...');
        $('#txtMovieSearch').attr('placeholder', moviesSearchPlaceholder);

        var seriesSearchPlaceholder = i18n.__('Serie title or magnet link...');
        $('#txtSerieSearch').attr('placeholder', seriesSearchPlaceholder);

        var animeSearchPlaceholder = i18n.__('Anime title or magnet link...');
        $('#txtAnimeSearch').attr('placeholder', animeSearchPlaceholder);

        var seriesTorrentPlaceholder = i18n.__('Torrent name...');
        $('#txtTorrentSearch').attr('placeholder', seriesTorrentPlaceholder);

        var genreAny = i18n.__(': Any');
        $('#filterByGenre').append(genreAny);

        var filterAll = i18n.__(': All');
        $('#filterByType').append(filterAll);

        var filterByStatus = i18n.__(': All');
        $('#filterByStatus').append(filterByStatus);

        var buttonPlay = i18n.__('Play');
        $('#btnPlay').append(buttonPlay);

        var btnBuy = i18n.__('Buy');
        $('#btnBuy').append(btnBuy);
        $('#series-btnBuy').append(btnBuy);

        var animeBtnBuy = i18n.__('Buy');
        $('#anime-btnBuy').append(animeBtnBuy);

        var buttonTrailer = i18n.__('Trailer');
        $('#btnTrailer').append(buttonTrailer);

        var btnEpisodeList = i18n.__('Episode list');
        $('#btnEpisodeList').append(btnEpisodeList);

        var animeBtnEpisodeList = i18n.__('Episode list');
        $('#anime-btnEpisodeList').append(animeBtnEpisodeList);

        var genreAll = i18n.__('All');
        $('.genreAll').append(genreAll);

        var genreAction = i18n.__('Action');
        $('.genreAction').append(genreAction);

        var genreAdventure = i18n.__('Adventure');
        $('.genreAdventure').append(genreAdventure);

        var genreAnimation = i18n.__('Animation');
        $('.genreAnimation').append(genreAnimation);

        var genreCars = i18n.__('Cars');
        $('.genreCars').append(genreCars);

        var genreChildren = i18n.__('Children');
        $('.genreChildren').append(genreChildren);

        var genreComedy = i18n.__('Comedy');
        $('.genreComedy').append(genreComedy);

        var genreCrime = i18n.__('Crime');
        $('.genreCrime').append(genreCrime);

        var genreDementia = i18n.__('Dementia');
        $('.genreDementia').append(genreDementia);

        var genreDemons = i18n.__('Demons');
        $('.genreDemons').append(genreDemons);

        var genreDocumentary = i18n.__('Documentary');
        $('.genreDocumentary').append(genreDocumentary);

        var genreDrama = i18n.__('Drama');
        $('.genreDrama').append(genreDrama);

        var genreEcchi = i18n.__('Ecchi');
        $('.genreEcchi').append(genreEcchi);

        var genreFamily = i18n.__('Family');
        $('.genreFamily').append(genreFamily);

        var genreFantasy = i18n.__('Fantasy');
        $('.genreFantasy').append(genreFantasy);

        var genreFilmNoir = i18n.__('Film-Noir');
        $('.genreFilm-Noir').append(genreFilmNoir);

        var genreGame = i18n.__('Game');
        $('.genreGame').append(genreGame);

        var genreGameShow = i18n.__('Game Show');
        $('.genreGameShow').append(genreGameShow);

        var genreHomeandGarden = i18n.__('Home and Garden');
        $('.genreHomeandGarden').append(genreHomeandGarden);

        var genreHarem = i18n.__('Harem');
        $('.genreHarem').append(genreHarem);

        var genreHistory = i18n.__('History');
        $('.genreHistory').append(genreHistory);

        var genreHistorical = i18n.__('Historical');
        $('.genreHistorical').append(genreHistorical);

        var genreHorror = i18n.__('Horror');
        $('.genreHorror').append(genreHorror);

        var genreJosei = i18n.__('Josei');
        $('.genreJosei').append(genreJosei);

        var genreKids = i18n.__('Kids');
        $('.genreKids').append(genreKids);

        var genreMagic = i18n.__('Magic');
        $('.genreMagic').append(genreMagic);

        var genreMartialArts = i18n.__('Martial Arts');
        $('.genreMartialArts').append(genreMartialArts);

        var genreMecha = i18n.__('Mecha');
        $('.genreMecha').append(genreMecha);

        var genreMilitary = i18n.__('Military');
        $('.genreMilitary').append(genreMilitary);

        var genreMiniSeries = i18n.__('Mini Series');
        $('.genreMiniSeries').append(genreMiniSeries);

        var genreMusic = i18n.__('Music');
        $('.genreMusic').append(genreMusic);

        var genreMusical = i18n.__('Musical');
        $('.genreMusical').append(genreMusical);

        var genreMystery = i18n.__('Mystery');
        $('.genreMystery').append(genreMystery);

        var genreNews = i18n.__('News');
        $('.genreNews').append(genreNews);

        var genreParody = i18n.__('Parody');
        $('.genreParody').append(genreParody);

        var genrePolice = i18n.__('Police');
        $('.genrePolice').append(genrePolice);

        var genrePsychological = i18n.__('Psychological');
        $('.genrePsychological').append(genrePsychological);

        var genreReality = i18n.__('Reality');
        $('.genreReality').append(genreReality);

        var genreRomance = i18n.__('Romance');
        $('.genreRomance').append(genreRomance);

        var genreSamurai = i18n.__('Samurai');
        $('.genreSamurai').append(genreSamurai);

        var genreSchool = i18n.__('School');
        $('.genreSchool').append(genreSchool);

        var genreSciFi = i18n.__('Sci-Fi');
        $('.genreSci-Fi').append(genreSciFi);

        var genreSeinen = i18n.__('Seinen');
        $('.genreSeinen').append(genreSeinen);

        var genreShoujo = i18n.__('Shoujo');
        $('.genreShoujo').append(genreShoujo);

        var genreShoujoAi = i18n.__('Shoujo Ai');
        $('.genreShoujoAi').append(genreShoujoAi);

        var genreShounen = i18n.__('Shounen');
        $('.genreShounen').append(genreShounen);

        var genreShounenAi = i18n.__('Shounen Ai');
        $('.genreShounenAi').append(genreShounenAi);

        var genreSoap = i18n.__('Soap');
        $('.genreSoap').append(genreSoap)

        var genreSliceOfLife = i18n.__('Slice of Life');
        $('.genreSliceOfLife').append(genreSliceOfLife);

        var genreSpecialInterest = i18n.__('Special Interest');
        $('.genreSpecialInterest').append(genreSpecialInterest);

        var genreSpace = i18n.__('Space');
        $('.genreSpace').append(genreSpace);

        var genreSport = i18n.__('Sport');
        $('.genreSport').append(genreSport);

        var genreSuperPower = i18n.__('Super Power');
        $('.genreSuperPower').append(genreSuperPower);

        var genreSupernatural = i18n.__('Supernatural');
        $('.genreSupernatural').append(genreSupernatural)

        var genreSuspense = i18n.__('Suspense');
        $('.genreSuspense').append(genreSuspense);

        var genreTalkShow = i18n.__('Talk Show');
        $('.genreTalkShow').append(genreTalkShow);

        var genreThriller = i18n.__('Thriller');
        $('.genreThriller').append(genreThriller);

        var genreVampire = i18n.__('Vampire');
        $('.genreVampire').append(genreVampire);

        var genreWar = i18n.__('War');
        $('.genreWar').append(genreWar);

        var genreWestern = i18n.__('Western');
        $('.genreWestern').append(genreWestern);

        var filterMostDownloaded = i18n.__('Most downloaded');
        $('.filterMostDownloaded').append(filterMostDownloaded);

        var filterUpdated = i18n.__('Updated');
        $('.filterUpdated').append(filterUpdated);

        var filterDate = i18n.__('Date');
        $('.filterDate').append(filterDate);

        var filterYear = i18n.__('Year');
        $('.filterYear').append(filterYear);

        var filterRating = i18n.__('Rating');
        $('.filterRating').append(filterRating);

        var filterAlphabetic = i18n.__('Alphabetic');
        $('.filterAlphabetic').append(filterAlphabetic);

        var filterSeeds = i18n.__('Seeds');
        $('.filterSeeds').append(filterSeeds);

        var filterLeechs = i18n.__('Leechs');
        $('.filterLeechs').append(filterLeechs);

        var filterLatest = i18n.__('Latest');
        $('.filterLatest').append(filterLatest);

        var filterSize = i18n.__('Size');
        $('.filterSize').append(filterSize);

        var filterAddedDate = i18n.__('Added date');
        $('.filterAddedDate').append(filterAddedDate);

        var filterTorrentName = i18n.__('Torrent name');
        $('.filterTorrentName').append(filterTorrentName);

        var filterPopularity = i18n.__('Popularity');
        $('.filterPopularity').append(filterPopularity);

        var filterRank = i18n.__('Rank');
        $('.filterRank').append(filterRank);

        var filterName = i18n.__('Name');
        $('.filterName').append(filterName);

        var typeAll = i18n.__('All');
        $('.typeAll').append(typeAll);

        var typeMovie = i18n.__('Movie');
        $('.typeMovie').append(typeMovie);

        var typeShows = i18n.__('TV');
        $('.typeShows').append(typeShows);

        var typeOVA = i18n.__('OVA');
        $('.typeOVA').append(typeOVA);

        var typeONA = i18n.__('ONA');
        $('.typeONA').append(typeONA);

        var statusAll = i18n.__('All');
        $('.statusAll').append(statusAll);

        var statusNotAiring = i18n.__('Not Airing');
        $('.statusNotAiring').append(statusNotAiring);

        var statusCurrentlyAiring = i18n.__('Currently Airing');
        $('.statusCurrentlyAiring').append(statusCurrentlyAiring);

        var statusEnded = i18n.__('Ended');
        $('.statusEnded').append(statusEnded);

        var sectionAnime = i18n.__('Anime');
        $('.sectionAnime').append(sectionAnime);

        var sectionMovies = i18n.__('Movies');
        $('.sectionMovies').append(sectionMovies);

        var sectionSeries = i18n.__('Series');
        $('.sectionSeries').append(sectionSeries);

        var sectionVideos = i18n.__('Videos');
        $('.sectionVideos').append(sectionVideos);

        var section3D = i18n.__('3D');
        $('.section3D').append(section3D);

        var playerErrorTitle = i18n.__('An error has occured');
        $('.playerErrorTitle').append(playerErrorTitle);

        var playerErrorMessage = i18n.__('The video player is unable to start the video. You can switch to VLC or select another source from the list.');
        $('.playerErrorMessage').append(playerErrorMessage);

        var playerErrorNote = i18n.__("Note: If you switch to VLC and you get 'Couldn't load plug-in.' You will need to install the latest version of VLC (Web plugin)");
        $('.playerErrorNote').append(playerErrorNote);

        var btnSwitchToVlc = i18n.__('Switch to VLC');
        $('.btnSwitchToVlc').append(btnSwitchToVlc);

        var btnShowSource = i18n.__('Source');
        $('#btnShowSource').append(btnShowSource);

        var btnShowInfo = i18n.__('Info');
        $('#btnShowInfo').append(btnShowInfo);

        var btnSwitchToDefault = i18n.__('Switch to Default player');
        $('.btnSwitchToDefault').append(btnSwitchToDefault);

        var playerNoSound = i18n.__('No sound is playing from the video? You can try using VLC before selecting another source.');
        $('.playerNoSound').append(playerNoSound);

        var status = i18n.__('Connecting');
        $('#status').append(status);

        var chooseSource = i18n.__('You can also select the source you want at the bottom in the source section. This is particaly useful if you are unable to play from default source.');
        $('.chooseSource').append(chooseSource);

        var btnPlayEpisode = i18n.__('Play episode');
        $('.btnPlayEpisode').append(btnPlayEpisode);

        var sourceInfo = i18n.__('Source info');
        $('.sourceInfo').append(sourceInfo);

        var btnStopDownload = i18n.__('Stop download');
        $('.btnStopDownload').append(btnStopDownload);

        var episodeTitleList = i18n.__('Episodes');
        $('#episode-title-list').append(episodeTitleList);

        var defaultSettings = i18n.__('Default settings:');
        $('.defaultSettings').append(defaultSettings);

        var advancedSettings = i18n.__('Advanced settings:');
        $('.advancedSettings').append(advancedSettings);

        var settingsLanguage = i18n.__('Language:');
        $('.settingsLanguage').append(settingsLanguage);

        var settingsStreamingPort = i18n.__('Streaming port:');
        $('.settingsStreamingPort').append(settingsStreamingPort);

        var settingsCacheDir = i18n.__('Data directory:');
        $('.settingsCacheDir').append(settingsCacheDir);

        var settingsClearCache = i18n.__('Clear data on close:');
        $('.settingsClearCache').append(settingsClearCache);

        var settingsConnectionLimit = i18n.__('Connection limit:');
        $('.settingsConnectionLimit').append(settingsConnectionLimit);

        var settingsDht = i18n.__('DHT:');
        $('.settingsDht').append(settingsDht);

        var settingsSubtitle = i18n.__('Prefered subtitle:');
        $('.settingsSubtitle').append(settingsSubtitle);

        var restoreDefaults = i18n.__('Restore defaults');
        $('#restoreDefaults').append(restoreDefaults);
    };
};

//Exports
module.exports = new Translations();