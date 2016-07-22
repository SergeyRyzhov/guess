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

  function createByCategory(id) {
    // console.log('id -- ', id);
    var melodies = [];
    switch (id) {
      case 1: {
        melodies =  [
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
      case 2: {
        melodies =  [
          createMelody(21, 10, 'Лев Лещенко - Крутится вертится шар голубой', 'Lev Leshchenko - Krutitsya vertitsya shar goluboj'),
          createMelody(22, 20, 'Аида Ведищева - Песенка о медведях', 'Aida Vedishcheva - Pesenka o medvedyah'),
          createMelody(23, 30, 'Леонид Утёсов - Утомлённое солнце', 'Leonid Utyosov - Utomlyonnoe solnce'),
          createMelody(),
          createMelody(),
          createMelody(),
          createMelody()
        ];
        break;
      }
      case 3: {
        melodies =  [
          createMelody(31, 10, 'Юрий Никулин - Песня про зайцев', 'YUrij Nikulin - Pesnya pro zajcev'),
          createMelody(32, 20, 'Браво - Валерий Сюткин - Чёрный кот', 'Bravo - Valerij Syutkin - CHyornyj kot'),
          createMelody(33, 30, 'Наутилус Помпилиус - Одинокая птица', 'Nautilus Pompilius - Odinokaya ptitsa'),
          createMelody(),
          createMelody(),
          createMelody(),
          createMelody()
        ];
        break;
      }
      case 4: {
        melodies =  [
          createMelody(41, 10, 'Пётр Лещенко - Ах эти чёрные глаза', 'PYotr Leschenko - Ah eti chYornyie glaza'),
          createMelody(),
          createMelody(),
          createMelody(),
          createMelody(),
          createMelody(),
          createMelody()
        ];
        break;
      }
      case 5: {
        melodies =  [
          createMelody(51, 10, 'На теплоходе музыка играет', 'ah eta svadba'),
          createMelody(52, 20, 'Гимн Пионеров - Всегда будь готов', 'ah eta svadba'),
          createMelody(53, 30, 'Море, море, край бездонный', 'ah eta svadba'),
          createMelody(55, 50, 'Земля в иллюминаторе', 'ah eta svadba'),
          createMelody(56, 60, 'Первым делом самолеты', 'ah eta svadba'),
          createMelody(),
          createMelody()
        ];
        break;
      }
      case 6: {
        melodies =  [
          createMelody(61, 10, 'На заре', 'Leschenko - Black eyes.mp3'),
          createMelody(62, 20, 'Ленинград - Экспонат', 'Leningrad - Exponat.mp3'),
          createMelody(),
          createMelody(),
          createMelody(),
          createMelody(),
          createMelody()
        ];
        break;
      }
      case 7: {
        melodies =  [
          createMelody(71, 10, 'Музыка из к/ф "Джентельмены Удачи"', 'Leschenko - Black eyes.mp3'),
          createMelody(),
          createMelody(),
          createMelody(),
          createMelody(),
          createMelody(),
          createMelody()
        ];
        break;
      }
    }
    // console.log('melodies', melodies);
    return melodies;
  }

  router.get('/api/melody/category/:id', function (req, res, next) {
    console.log('id -- ', req.params.id);
    res.send(createByCategory(Number(req.params.id)));
  });
}
module.exports = { init: init };
