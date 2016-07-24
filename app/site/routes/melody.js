function init(router) {
    // var authenticator = require('../tools/authenticator');
    // var tokenModel = require(__common + '/models/token');
    // var telegramUserModel = require(__bot + '/models/telegramUser');
    // var _ = require('underscore');
    // var constants = require('../constants');

    function createMelody(i, score, name, fileName) {
        return {
            _id: i,
            name: name,
            score: score,
            url: '/audio/' + fileName + '.mp3',
            type: 'audio/mpeg'
        };
    }

    function createMelodyMock(i, score, name, fileName) {
        return {};
    }

    function createByCategory(id) {
        // console.log('id -- ', id);
        var melodies = [];
        switch (id) {
            case 1:
                {
                    melodies = [
                        createMelody(11, 10, 'Муслим Магамаев - Ах эта свадьба...', 'Muslim Magomaev - Ah ehta svadba'),
                        createMelody(12, 60, 'Лейся, песня - Обручальное кольцо', 'Lejsya pesnya - Obruchalnoe kolco'),
                        createMelody(13, 20, 'Мумий Тролль - Невеста', 'Mumij Troll - Nevesta'),
                        createMelody(14, 30, 'Чай Вдвоем - Белое платье', 'CHaj vdvoyom - Beloe plate'),
                        createMelody(15, 40, 'Алсу - Вместе и навсегда', 'Alsu - Vmeste i navsegda'),
                        createMelody(16, 50, 'Глюк\'oZa - Невеста', 'Glyukoza - Nevesta'),
                        createMelody(17, 70, 'Звери - Для тебя', 'Zveri - Dlya tebya'),
                    ];
                    break;
                }
            case 2:
                {
                    melodies = [
                        createMelody(21, 10, 'Лев Лещенко - Крутится вертится шар голубой', 'Lev Leshchenko - Krutitsya vertitsya shar goluboj'),
                        createMelody(22, 20, 'Аида Ведищева - Песенка о медведях', 'Aida Vedishcheva - Pesenka o medvedyah'),
                        createMelody(23, 30, 'Леонид Утёсов - Утомлённое солнце', 'Leonid Utyosov - Utomlyonnoe solnce'),
                        createMelody(24, 40, 'Кино / Виктор Цой - Звезда По Имени Солнце', 'Kino - Zvezda po imeni Solnce'),
                        createMelody(25, 40, 'Земфира - Бесконечность', 'Zemfira - Infinity'),
                        createMelodyMock(26, 70, 'mock', ''),
                        createMelodyMock(27, 70, 'mock', '')
                    ];
                    break;
                }
            case 3:
                {
                    melodies = [
                        createMelody(31, 10, 'Юрий Никулин - Песня про зайцев', 'YUrij Nikulin - Pesnya pro zajcev'),
                        createMelody(32, 20, 'Браво - Валерий Сюткин - Чёрный кот', 'Bravo - Valerij Syutkin - CHyornyj kot'),
                        createMelody(33, 30, 'Наутилус Помпилиус - Одинокая птица', 'Nautilus Pompilius - Odinokaya ptitsa'),
                        createMelodyMock(34, 70, 'mock', ''),
                        createMelodyMock(35, 70, 'mock', ''),
                        createMelodyMock(36, 70, 'mock', ''),
                        createMelodyMock(37, 70, 'mock', '')
                    ];
                    break;
                }
            case 4:
                {
                    melodies = [
                        createMelody(41, 10, 'Пётр Лещенко - Ах эти чёрные глаза', 'PYotr Leschenko - Ah eti chYornyie glaza'),
                        createMelody(42, 40, 'Иванушки International - Два океана', 'Ivanushki International - Dva okeana'),
                        createMelodyMock(43, 70, 'mock', ''),
                        createMelodyMock(44, 70, 'mock', ''),
                        createMelodyMock(45, 70, 'mock', ''),
                        createMelodyMock(46, 70, 'mock', ''),
                        createMelodyMock(47, 70, 'mock', '')
                    ];
                    break;
                }
            case 5:
                {
                    melodies = [
                        createMelody(51, 10, 'Алёна Апина - Комбинация - На теплоходе музыка играет', 'Alyona Apina - Kombinaciya - Na teplohode muzyka igraet'),
                        createMelody(52, 20, 'Гимн Пионеров - Взвейтесь кострами', 'Gimn Pionerov - Vzvejtes kostrami'),
                        createMelody(53, 30, 'Юрий Антонов - Море-море', 'YUrij Antonov - More-more'),
                        createMelody(54, 40, 'Земляне - Трава у дома', 'Zemlyane - Trava u doma'),
                        createMelody(55, 50, 'Леонид Утёсов - Первым делом самолёты', 'Leonid Utyosov - Pervym delom samolyoty'),
                        createMelody(56, 60, 'Дискотека Авария - Небо', 'Diskoteka Avariya - Nebo'),
                        createMelody(57, 70, 'Фабрика - Море зовёт', 'Fabrika - More zovyot')
                    ];
                    break;
                }
            case 6:
                {
                    melodies = [
                        createMelody(61, 10, 'Альянс - На заре', 'Alyans - Na zare'),
                        createMelody(62, 20, 'Ленинград - Экспонат', 'Leningrad - Exponat'),
                        createMelody(63, 30, 'Владимир Пресняков (младший) - Зурбаган', 'Vladimir Presnyakov - Zurbagan'),
                        createMelody(64, 40, 'Детские - Крылатые Качели', 'Detskie Krylatye Kacheli'),
                        createMelody(65, 50, 'Иванушки International - Снегири', 'Ivanushki International - Snegiri'),
                        createMelody(66, 60, 'Юрий Шатунов / Ласковый май Розовый вечер', 'YUrij SHatunov - Laskovyj maj Rozovyj vecher'),
                        createMelodyMock(67, 70, 'mock', '')
                    ];
                    break;
                }
            case 7:
                {
                    melodies = [
                        createMelody(71, 10, 'Музыка из к/ф "Джентельмены Удачи"', 'Dzhentlmeny udachi'),
                        createMelody(72, 20, 'Любэ - Берёзы', 'Lyubeh - Beryozy'),
                        createMelody(73, 20, 'ВИА Гра - Попытка № 5', 'VIA Gra - Popytka № 5'),
                        createMelody(74, 20, 'Песня Винни Пуха', 'Vini Puh'),
                        createMelodyMock(75, 20, 'mock', ''),
                        createMelodyMock(76, 20, 'mock', ''),
                        createMelodyMock(77, 20, 'mock', '')
                    ];
                    break;
                }
        }
        // console.log('melodies', melodies);
        return melodies;
    }

    router.get('/api/melody/category/:id', function(req, res, next) {
        console.log('id -- ', req.params.id);
        res.send(createByCategory(Number(req.params.id)));
    });
}
module.exports = { init: init };