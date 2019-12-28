var fs = require('fs');

var file_name = 'matlogika.json';
var text = fs.readFileSync('./foxtest-json-files/' + file_name);
var test = JSON.parse(text);

console.log(typeof test);
console.log(Object.keys(test));
console.log(Object.keys(test.quizes[0]));

var new_test = {};
new_test._v = 0.2;
new_test.name = test.name; // Sabaqtynh qazaqsha aty bolu kerek
new_test.code = test.name;
new_test.mode = 1;
new_test.created = test.created_time;
new_test.comment = 'Бұл тест жаңартылған';
new_test.quizes = test.quizes.map((quiz, index) => {
    let new_quiz = {};
    new_quiz.id = index + 1;
    new_quiz.number = quiz.number;
    new_quiz.question = quiz.question;
    new_quiz.answers = [...quiz.answers];
    new_quiz.fake_answers = [...quiz.fakeanswers];
    return new_quiz;
});


var new_text = JSON.stringify(new_test);
fs.writeFileSync('./foxtest-json-files/_new_'+file_name, new_text);

