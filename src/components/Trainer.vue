<template>
    <div>
        <div v-if="quizes.length > 0" class="border d-flex" style="height: 60px">
            <div class="border shadow-sm d-flex align-items-center">
                <div class="text-center text-secondary font-weight-bold px-2">
                    {{ quizes.length }}<br/>
                    <sp>{{ mistakes }}</sp>
                </div>
            </div>
            <div class="d-flex align-items-center px-2 border-right w-100 white-space: nowrap" style="overflow-x: auto">
                <a href="#" class="px-2" v-for="(quiz, index) in quizes" v-bind:key="index" v-on:click.prevent="next_question(quiz.id)">{{ quiz.number }}</a>
            </div>
        </div>

        <div v-else class="alert-success text-center font-weight-bold p-2 border rounded">
            Вопросы закончились<br/>
            <span v-if="mistakes > 0">
                Вы допустили <sp>{{mistakes}}</sp> <span v-if="mistakes === 1">ошибку</span> <span v-else>ошибки</span>
            </span>
            <span v-else>
                Вы молодец! Ни одной ошибки!
            </span>
        </div>

        <div class="px-2 pt-3" style="overflow-x: auto;">
            <div class="text-right">
                <label for="show_option_id" v-bind:class="['mr-1', show_option ? '' : 'text-muted']">
                    <span v-if="!show_option">Показать ответы</span>
                    <span v-else>
                        <span v-if="mode === 1">Правильный вариант: А)</span>
                        <span v-else>Правильные варианты [больше нуля]</span>
                    </span>
                </label>
                <input type="checkbox" v-bind:disabled="checked" id="show_option_id" v-model="show_option" />
            </div>
            <div v-touch:swipe.left="next_question">
                <p v-html="question_answers.question" onselectstart="return false" onmousedown="return false"></p>
                <div v-for="answer in question_answers.answers" v-bind:key="answer.value" class="d-flex">
                <span v-bind:class="['text-'+answer.spoiler.color, 'font-weight-bold']">
                    {{ answer.spoiler.text }}
                </span>
                    <p class="form-check-inline" v-on:dblclick="check_answer_by_mode">
                        <input v-model="answer_codes" v-bind:disabled="checked"
                               class="form-check-input" v-bind:type="mode === 1 ? 'radio' : 'checkbox'" v-bind:value="answer.value"
                               v-bind:id="'answer'+answer.value">
                        <label v-bind:for="'answer'+answer.value" v-html="answer.text"
                               class="form-check-label" onselectstart="return false" onmousedown="return false"></label>
                    </p>
                </div>
            </div>
        </div>

        <div class="d-flex px-2 py-3">
            <div class="w-100 text-center">
                <button type="button" v-bind:disabled="checked" v-on:click="check_answer" class="btn btn-info rounded-0">Проверить</button>
            </div>
            <div>
                <button type="button" v-bind:disabled="quizes.length === 0" v-on:click="next_question" class="btn btn-warning rounded-0">&gt;</button>
            </div>
        </div>
    </div>
</template>

<script>
    import sp from './sp'

    // todo Вместо Прав. и Неправ. показать иконку. + рядом с количеством ошибок показать иконку ошибки
    // todo В конце теста предложить пройти снова или перейти на следующие вопросы

    function shuffle_array(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    export default {
        name: "Trainer",
        props: {
            exam_quizes: Array,
            mode: Number
        },
        data() {
            return {
                quizes: [...this.exam_quizes],
                answer_codes: [],
                checked: '',
                mistakes: 0,
                question_answers: {},
                quiz: {},
                show_option: false
            }
        },
        created() {
            this.next_question();
        },
        watch: {
            exam_quizes: function(val) {
                this.quizes = [...val];
                this.mistakes = 0;
                this.next_question();
            },
            show_option: function(val) {
                this.next_question(this.quiz.number);
            }
        },
        computed: {},
        methods: {
            next_question: function(id) {
                if (this.quizes.length === 0) {
                    console.log('# Вопросы закончились');
                    return;
                }

                if (typeof id === "number") {
                    this.quiz = this.quizes.filter(quiz => quiz.id === id)[0];
                } else {
                    let index = Math.floor(Math.random() * this.quizes.length);
                    this.quiz = this.quizes[index];
                }

                let answers = [];
                let spoiler = { text: '', color: '' };

                this.quiz.answers.forEach((answer, index) => {
                    let answer_text = this.show_option ? answer[0] + ' ' + answer[1] : answer[1];
                    answers.push({
                        text: answer_text,
                        value: 100+index,
                        spoiler
                    })
                });
                this.quiz.fake_answers.forEach((fake_answer, index) => {
                    let fake_answer_text = this.show_option ? fake_answer[0] + ' ' + fake_answer[1] : fake_answer[1];
                    answers.push({
                        text: fake_answer_text,
                        value: 10+index,
                        spoiler
                    })
                });

                this.answer_codes = [];
                this.checked = false;

                this.question_answers = {};
                this.question_answers.question = this.quiz.question;
                this.question_answers.answers = shuffle_array(answers);
            },
            check_answer_by_mode() {
                if (this.mode === 1)
                    this.check_answer();
            },
            check_answer: function() {
                if (this.checked) return;
                this.checked = true;

                let is_right;

                if (typeof this.answer_codes === "number") {
                    is_right = this.answer_codes === 100;

                    this.question_answers.answers.forEach(answer => {
                        let text = '',
                            color = '';

                        if (answer.value === 100) {
                            text = 'Прав.';
                            color = this.answer_codes === answer.value ? 'success' : 'danger';
                        } else {
                            color = 'danger';
                            text = this.answer_codes === answer.value ? 'Неправ.' : '';
                        }
                        answer.spoiler = { text, color };
                    })
                } else {
                    is_right = this.answer_codes.every(value => value >= 100) && this.answer_codes.length === this.question_answers.answers.filter(ans => ans.value >= 100).length;

                    this.question_answers.answers.forEach(answer => {
                        let text = '',
                            color = '';

                        if (answer.value >= 100) {
                            text = 'Прав.';
                            color = this.answer_codes.includes(answer.value) ? 'success' : 'danger';
                        } else {
                            color = 'danger';
                            text = this.answer_codes.includes(answer.value) ? 'Неправ.' : '';
                        }
                        answer.spoiler = { text, color };
                    });
                }

                if (is_right) {
                    this.quizes.splice(this.quizes.indexOf(this.quiz), 1)
                } else {
                    this.quizes.push(this.quiz);
                    this.mistakes += 1;
                }
            }
        },
        components: {
            sp
        }
    }
</script>

<style scoped>
    .touch-background {
        background-color: cadetblue;
    }
</style>
