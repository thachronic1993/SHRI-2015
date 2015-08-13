context = new AudioContext(); // Создаем аудио контекст
analyser = context.createAnalyser(); // Создаем анализатор
var eq1 = context.createBiquadFilter(); // Создаем 10 фильтров для эквалайзера 
var eq2 = context.createBiquadFilter();
var eq3 = context.createBiquadFilter();
var eq4 = context.createBiquadFilter();
var eq5 = context.createBiquadFilter();
var eq6 = context.createBiquadFilter();
var eq7 = context.createBiquadFilter();
var eq8 = context.createBiquadFilter();
var eq9 = context.createBiquadFilter();
var eq10 = context.createBiquadFilter();
eq1.type = "peaking"; // Указываем тип фильтров (в данном случае узкополосный фильтр)
eq2.type = "peaking";
eq3.type = "peaking";
eq4.type = "peaking";
eq5.type = "peaking";
eq6.type = "peaking";
eq7.type = "peaking";
eq8.type = "peaking";
eq9.type = "peaking";
eq10.type = "peaking";
eq1.frequency.value = 32; // Указываем частоту каждой полосы
eq2.frequency.value = 64;
eq3.frequency.value = 125;
eq4.frequency.value = 250;
eq5.frequency.value = 500;
eq6.frequency.value = 1000;
eq7.frequency.value = 2000;
eq8.frequency.value = 4000;
eq9.frequency.value = 8000;
eq10.frequency.value = 16000;
eq1.Q.value = 1; // Указываем добротность каждой полосы
eq2.Q.value = 1;
eq3.Q.value = 1;
eq4.Q.value = 1;
eq5.Q.value = 1;
eq6.Q.value = 1;
eq7.Q.value = 1;
eq8.Q.value = 1;
eq9.Q.value = 1;
eq10.Q.value = 1;

var audio = new Audio(); // Создаем объект Audio 
audio.controls = true; // Применяем свойства к объекту
audio.loop = false;
audio.autoplay = false;
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height; // Объявляем все переменные, которые будет использовать анализатор
window.addEventListener("load", initMp3Player, false); // Инициализируем плеер после того как загрузятся все элементы на странице
function initMp3Player() {
    document.getElementById('audio_box').appendChild(audio); // Добавляем элемент audio во внутрь блока с id="audio_box"
    canvas = document.getElementById('analyser_render');
    ctx = canvas.getContext('2d'); // Для рисования нам необходимо получить доступ к обрабатываемому контексту 
    // Перенаправляем воспроизведение аудио в граф обработки AudioContext
    source = context.createMediaElementSource(audio);
    source.connect(eq1);
    eq1.connect(eq2);
    eq2.connect(eq3);
    eq3.connect(eq4);
    eq4.connect(eq5);
    eq5.connect(eq6);
    eq6.connect(eq7);
    eq7.connect(eq8);
    eq8.connect(eq9);
    eq9.connect(eq10);
    eq10.connect(analyser);
    analyser.connect(context.destination);
    frameLooper();
}

function frameLooper() {
    window.requestAnimationFrame(frameLooper); // Зацикливаем функцию
    fbc_array = new Uint8Array(analyser.frequencyBinCount); // Создаем массив с информацией о частотах аудио
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Очищаем элемент canvas 
    ctx.fillStyle = '#fff'; // Цвет шкалы анализатора
    bars = 100;
    for (var i = 0; i < bars; i++) { // Построение графика
        bar_x = i * 3;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 2);
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
}



/****************************/

var dropBox;

window.onload = function() {
    dropBox = document.getElementById("dropzone");
    dropBox.ondragenter = ignoreDrag;
    dropBox.ondragover = ignoreDrag;
    dropBox.ondrop = drop;
    dropBox.ondragleave = leave;
}

function ignoreDrag(e) {
    // Обеспечиваем, чтобы никто другой не получил это событие, т.к. мы выполняем операцию перетаскивания
    e.stopPropagation();
    e.preventDefault();
    document.getElementById("dropzone").className = 'dropzone dragover';
}

function leave(e) {
    e.stopPropagation();
    e.preventDefault();
    document.getElementById("dropzone").className = 'dropzone';
}


function drop(e) {
    // Аннулируем это событие для всех других
    e.stopPropagation();
    e.preventDefault();

    // Получаем перемещенные файлы
    var data = e.dataTransfer;
    var files = data.files;
    document.getElementById("dropzone").className = 'dropzone';

    // Передаем полученный файл в функцию обработки
    processFiles(files);
}

function processFiles(files) {
    var file = files[0];

    var reader = new FileReader();

    reader.onload = function(e) {
        audio.src = URL.createObjectURL(file);
        console.log(audio.src);
        console.log(e.target.result);
        document.getElementById("songname").innerHTML = file.name;

    };

    // Начинаем считывать файл
    reader.readAsDataURL(file);
}

/****************************/

function normal() {
    document.getElementById('eq1').value = 0;
    eq1.gain.value = 0;
    document.getElementById('eq2').value = 0;
    eq2.gain.value = 0;
    document.getElementById('eq3').value = 0;
    eq3.gain.value = 0;
    document.getElementById('eq4').value = 0;
    eq4.gain.value = 0;
    document.getElementById('eq5').value = -0;
    eq5.gain.value = -0;
    document.getElementById('eq6').value = -0;
    eq6.gain.value = -0;
    document.getElementById('eq7').value = 0;
    eq7.gain.value = 0;
    document.getElementById('eq8').value = 0;
    eq8.gain.value = 0;
    document.getElementById('eq9').value = 0;
    eq9.gain.value = 0;
    document.getElementById('eq10').value = 0;
    eq10.gain.value = 0;
}

function pop() {
    document.getElementById('eq1').value = 3;
    eq1.gain.value = 3;
    document.getElementById('eq2').value = 6;
    eq2.gain.value = 6;
    document.getElementById('eq3').value = 9;
    eq3.gain.value = 9;
    document.getElementById('eq4').value = 6;
    eq4.gain.value = 6;
    document.getElementById('eq5').value = 3;
    eq5.gain.value = 3;
    document.getElementById('eq6').value = 2;
    eq6.gain.value = 2;
    document.getElementById('eq7').value = 5;
    eq7.gain.value = 5;
    document.getElementById('eq8').value = 8;
    eq8.gain.value = 8;
    document.getElementById('eq9').value = 11;
    eq9.gain.value = 11;
    document.getElementById('eq10').value = 7;
    eq10.gain.value = 7;
}

function rock() {
    document.getElementById('eq1').value = 5;
    eq1.gain.value = 5;
    document.getElementById('eq2').value = 4;
    eq2.gain.value = 4;
    document.getElementById('eq3').value = 3;
    eq3.gain.value = 3;
    document.getElementById('eq4').value = 2;
    eq4.gain.value = 2;
    document.getElementById('eq5').value = -1;
    eq5.gain.value = -1;
    document.getElementById('eq6').value = -2;
    eq6.gain.value = -2;
    document.getElementById('eq7').value = 1;
    eq7.gain.value = 1;
    document.getElementById('eq8').value = 3;
    eq8.gain.value = 3;
    document.getElementById('eq9').value = 4;
    eq9.gain.value = 4;
    document.getElementById('eq10').value = 5;
    eq10.gain.value = 5;
}

function jazz() {
    document.getElementById('eq1').value = 4;
    eq1.gain.value = 4;
    document.getElementById('eq2').value = 3;
    eq2.gain.value = 3;
    document.getElementById('eq3').value = 2;
    eq3.gain.value = 2;
    document.getElementById('eq4').value = 3;
    eq4.gain.value = 3;
    document.getElementById('eq5').value = -2;
    eq5.gain.value = -2;
    document.getElementById('eq6').value = -2;
    eq6.gain.value = -2;
    document.getElementById('eq7').value = 0;
    eq7.gain.value = 0;
    document.getElementById('eq8').value = 2;
    eq8.gain.value = 2;
    document.getElementById('eq9').value = 3;
    eq9.gain.value = 3;
    document.getElementById('eq10').value = 4;
    eq10.gain.value = 4;
}

function classic() {
    document.getElementById('eq1').value = 5;
    eq1.gain.value = 5;
    document.getElementById('eq2').value = 4;
    eq2.gain.value = 4;
    document.getElementById('eq3').value = 3;
    eq3.gain.value = 3;
    document.getElementById('eq4').value = 2;
    eq4.gain.value = 2;
    document.getElementById('eq5').value = -2;
    eq5.gain.value = -2;
    document.getElementById('eq6').value = -2;
    eq6.gain.value = -2;
    document.getElementById('eq7').value = 0;
    eq7.gain.value = 0;
    document.getElementById('eq8').value = 2;
    eq8.gain.value = 2;
    document.getElementById('eq9').value = 4;
    eq9.gain.value = 4;
    document.getElementById('eq10').value = 5;
    eq10.gain.value = 5;
}
