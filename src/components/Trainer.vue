<template>
    <div>
        <div v-if="exam_quizes.length > 0" class="border d-flex" style="height: 60px">
            <div class="border shadow-sm d-flex align-items-center">
                <div class="text-center text-secondary font-weight-bold px-2">
                    {{ exam_quizes.length }}
                </div>
            </div>
            <div class="d-flex align-items-center px-2 border-right w-100 white-space: nowrap" style="overflow-x: auto">
                <a href="#" class="px-2" v-for="(quiz, index) in exam_quizes" v-bind:key="index" v-on:click.prevent="next_question(quiz.id)">{{ quiz.number }}</a>
            </div>
        </div>

        <div v-else class="alert-success text-center font-weight-bold p-2 border rounded">
            Вопросы закончились<br/>
            <span v-if="mistakes > 0">
                Вы допустили <sp>{{mistakes}}</sp> <span v-if="mistakes === 1">ошибку</span> <span v-else>ошибки</span>
            </span>
        </div>

        <div class="px-2 pt-3" style="overflow-x: auto;">
            <div class="d-flex justify-content-between mb-2">
                <span style="white-space: nowrap">
                    <span :class="[corrects ? 'text-success' : 'text-muted']"><font-awesome-icon :icon="['far', 'thumbs-up']" /> {{ corrects }}</span>
                    <span :class="['mx-2', mistakes ? 'text-danger' : 'text-muted']"><font-awesome-icon :icon="['far', 'thumbs-down']" /> {{ mistakes }}</span>
                </span>
                <span>
                    <label for="show_option_id" v-bind:class="['mr-1', show_option ? '' : 'text-muted']">
                        <span v-if="!show_option">Показать ответы</span>
                        <span v-else>
                            <span v-if="mode === 1">вариант А)</span>
                            <span v-else>[больше нуля]</span>
                        </span>
                    </label>
                    <input type="checkbox" id="show_option_id" v-model="show_option" />
                </span>
            </div>

            <div v-touch:swipe.left="next_question">
                <p v-html="question_answers.question" onselectstart="return false" onmousedown="return false"></p>
                <div v-for="answer in question_answers.answers" v-bind:key="answer.value" class="d-flex">
                    <span v-if="answer.spoiler.value > 0" v-bind:class="['text-'+answer.spoiler.color, 'font-weight-bold']">
                        <font-awesome-icon icon="check" v-if="answer.spoiler.value === 1" />
                        <font-awesome-icon icon="times" v-if="answer.spoiler.value === 2" />
                    </span>
                    <p class="form-check-inline" v-on:dblclick="check_answer_by_mode">
                        <input v-model="answer_codes" v-bind:disabled="checked"
                               class="form-check-input" v-bind:type="mode === 1 ? 'radio' : 'checkbox'" v-bind:value="answer.value"
                               v-bind:id="'answer'+answer.value">
                        <label v-bind:for="'answer'+answer.value" v-html="show_option ? answer.pre_text + answer.text : answer.text"
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
                <button type="button" v-bind:disabled="exam_quizes.length === 0" v-on:click="next_question" class="btn btn-warning rounded-0">
                    <font-awesome-icon icon="angle-right" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import sp from './sp'

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
            mode: Number,
            seance: Number
        },
        data() {
            return {
                answer_codes: [],
                checked: '',
                mistakes: 0,
                corrects: 0,
                question_answers: {},
                quiz: {},
                show_option: false
            }
        },
        created() {
            this.next_question();
        },
        watch: {
            seance: function(val) {
                this.mistakes = 0;
                this.corrects = 0;
                this.next_question();
            }
        },
        computed: {},
        methods: {
            next_question: function(id) {
                if (this.exam_quizes.length === 0) {
                    console.log('# Вопросы закончились');
                    return;
                }

                if (typeof id === "number") {
                    this.quiz = this.exam_quizes.filter(quiz => quiz.id === id)[0];
                } else {
                    let index = Math.floor(Math.random() * this.exam_quizes.length);
                    this.quiz = this.exam_quizes[index];
                }

                let answers = [];
                let spoiler = { color: '', value: 0 };

                this.quiz.answers.forEach((answer, index) => {
                    answers.push({
                        pre_text: answer[0] + ' ',
                        text: answer[1],
                        value: 100+index,
                        spoiler
                    })
                });
                this.quiz.fake_answers.forEach((fake_answer, index) => {
                    answers.push({
                        pre_text: fake_answer[0] + ' ',
                        text: fake_answer[1],
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
                        let color = '',
                            value = 0;

                        if (answer.value === 100) {
                            color = this.answer_codes === answer.value ? 'success' : 'danger';
                            value = 1;
                        } else {
                            color = 'danger';
                            value = this.answer_codes === answer.value ? 2 : 0;
                        }
                        answer.spoiler = { color, value };
                    })
                } else {
                    is_right = this.answer_codes.every(value => value >= 100) && this.answer_codes.length === this.question_answers.answers.filter(ans => ans.value >= 100).length;

                    this.question_answers.answers.forEach(answer => {
                        let color = '',
                            value = 0;

                        if (answer.value >= 100) {
                            color = this.answer_codes.includes(answer.value) ? 'success' : 'danger';
                            value = 1;
                        } else {
                            color = 'danger';
                            value = this.answer_codes.includes(answer.value) ? 2 : 0;
                        }
                        answer.spoiler = { color, value };
                    });
                }

                if (is_right) {
                    this.exam_quizes.splice(this.exam_quizes.indexOf(this.quiz), 1);
                    this.corrects += 1;
                } else {
                    this.exam_quizes.push(this.quiz);
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

</style>
