/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [{
            name: 'Cameroon',
            continent: 'Africa'
        }, {
            name: 'Fiji Islands',
            continent: 'Oceania'
        }, {
            name: 'Guatemala',
            continent: 'North America'
        }, {
            name: 'Japan',
            continent: 'Asia'
        }, {
            name: 'Yugoslavia',
            continent: 'Europe'
        }, {
            name: 'Tanzania',
            continent: 'Africa'
        }],
        '/cities': [{
            name: 'Bamenda',
            country: 'Cameroon'
        }, {
            name: 'Suva',
            country: 'Fiji Islands'
        }, {
            name: 'Quetzaltenango',
            country: 'Guatemala'
        }, {
            name: 'Osaka',
            country: 'Japan'
        }, {
            name: 'Subotica',
            country: 'Yugoslavia'
        }, {
            name: 'Zanzibar',
            country: 'Tanzania'
        }, ],
        '/populations': [{
            count: 138000,
            name: 'Bamenda'
        }, {
            count: 77366,
            name: 'Suva'
        }, {
            count: 90801,
            name: 'Quetzaltenango'
        }, {
            count: 2595674,
            name: 'Osaka'
        }, {
            count: 100386,
            name: 'Subotica'
        }, {
            count: 157634,
            name: 'Zanzibar'
        }]
    };

    setTimeout(function() {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'];

var callback = function() {
    var requestIndex = 0;
    var responses = {};
    var inputValue = prompt('Enter the name of a continent or a country or a city', 'Cameroon'); //Запрашиваем название континента или страны или города у пользователя
    return function(error, result) {
        responses[requests[requestIndex]] = result;
        requestIndex++;
        if (requestIndex == 3) {
            var c = [],
                cc = [],
                p = 0;
            for (var k = 0; k < responses['/countries'].length; k++) { //Перебираем /countries
                if (responses['/countries'][k].continent === inputValue) { //Если пользователь ввел название континента, то добавляем названия стран, соответствующих этому континенту, в массив c[]
                    c.push(responses['/countries'][k].name);
                }
            }

            if (c.length) {
                for (var k = 0; k < responses['/cities'].length; k++) { //Если массив c[] не пустой, перебираем /cities и ищем соответствия городов со странами
                    for (var j = 0; j < c.length; j++) {
                        if (responses['/cities'][k].country === c[j]) { //Если соответствие найдено, добавляем названия городов в массив cc[]
                            cc.push(responses['/cities'][k].name);
                        }
                    }
                }
            } else {
                for (var k = 0; k < responses['/cities'].length; k++) { //Если массив c[] пустой, проверяем является ли значение, введеное пользователем, названием страны
                    if (responses['/cities'][k].country === inputValue) { //Если пользователь ввел название страны - добавляем названия городов в массив cс[]
                        cc.push(responses['/cities'][k].name);
                    }
                }
            }

            if (cc.length) {
                for (var k = 0; k < responses['/populations'].length; k++) { //Если массив c[] не пустой, перебираем /populations и ищем соответствия городов, после чего суммируем численности их населения
                    for (var j = 0; j < cc.length; j++) {
                        if (responses['/populations'][k].name === cc[j]) {
                            p += responses['/populations'][k].count;
                        }
                    }
                }
            } else {
                for (var k = 0; k < responses['/populations'].length; k++) { //Если массив c[] пустой, проверяем является ли значение, введеное пользователем, названием города
                    if (responses['/populations'][k].name === inputValue) { //Если пользователь ввел название города, сохраняем значение численности населения города в переменную p
                        p = responses['/populations'][k].count;
                        break; //Когда найдем соответствие, сохраняем значения численности населения и выходим из цикла
                    }
                }
            }
            console.log('Total population in ' + inputValue + ': ' + p);
            requestIndex = 0;
        }
    };
}();

for (var i = 0; i < 3; i++) {
    var request = requests[i];
    getData(request, callback);
}
