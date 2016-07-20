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
      url: '/audio/' + fileName,
      type: 'audio/mpeg'
    };
  }

  function createByCategory(id) {
    // console.log('id -- ', id);
    var melodies = [];
    switch (id) {
      case 1: {
        melodies =  [
          createMelody(11, 10, 'Ах эта свадьба...', 'ah eta svadba'),
          createMelody(12, 20, 'Обручальное кольцо непростое украшение', 'ah eta svadba'),
          createMelody(13, 30, 'Мумий Тролль - Невеста', 'ah eta svadba'),
          createMelody(14, 40, 'Чай Вдвоем - Белое платье', 'ah eta svadba'),
          createMelody(15, 50, 'Алсу - Ничто не может быть чудесней', 'ah eta svadba'),
          createMelody(16, 60, 'Егор Крид - Невеста', 'ah eta svadba'),
          createMelody(17, 70, 'Глюкоза - Невеста', 'ah eta svadba'),
        ];
        break;
      }
      case 2: {
        melodies =  [
          createMelody(21, 10, 'Крутится-вертится шар голубой', 'ah eta svadba'),
          createMelody(22, 20, 'Песня о медведях', 'ah eta svadba'),
          createMelody(23, 30, 'Утомленные солнцем', 'ah eta svadba')
        ];
        break;
      }
      case 3: {
        melodies =  [
          createMelody(31, 10, 'Ю. Никулин "Песня про зайцев"', 'ah eta svadba'),
          createMelody(32, 20, 'Песня про черного кота', 'ah eta svadba'),
          createMelody(33, 30, 'В. Бутусов "Одинокая птица"', 'ah eta svadba')
        ];
        break;
      }
      case 4: {
        melodies =  [
          createMelody(41, 10, 'Ах эти черные глаза', 'Leschenko - Black eyes.mp3')
        ];
        break;
      }
      case 5: {
        melodies =  [
          createMelody(51, 10, 'На теплоходе музыка играет', 'ah eta svadba'),
          createMelody(52, 20, 'Гимн Пионеров - Всегда будь готов', 'ah eta svadba'),
          createMelody(53, 30, 'Море, море, край бездонный', 'ah eta svadba'),
          createMelody(55, 50, 'Земля в иллюминаторе', 'ah eta svadba'),
          createMelody(56, 60, 'Первым делом самолеты', 'ah eta svadba')
        ];
        break;
      }
      case 6: {
        melodies =  [
          createMelody(61, 10, 'На заре', 'Leschenko - Black eyes.mp3'),
          createMelody(62, 20, 'Ленинград - Экспонат', 'Leningrad - Exponat.mp3')
        ];
        break;
      }
      case 7: {
        melodies =  [
          createMelody(71, 10, 'Музыка из к/ф "Джентельмены Удачи"', 'Leschenko - Black eyes.mp3')
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
