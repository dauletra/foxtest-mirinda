<template>
    <div>

        <div v-if="quizes.length > 0" class="border d-flex" style="height: 60px">
            <div class="border d-flex align-items-center px-1 shadow-sm">
                <span style="white-space: nowrap">Осталось {{ quizes.length }}</span>
            </div>
            <div class="d-flex align-items-center px-2 border-right w-100 white-space: nowrap" style="overflow-x: auto">
                <a href="#" class="px-2" v-for="(quiz, index) in quizes" v-bind:key="index" v-on:click.prevent="next_question(quiz.id)">{{ quiz.number }}</a>
            </div>
        </div>

        <div v-else class="alert-success text-center font-weight-bold p-2 border rounded">
            Вопросы закончились
        </div>

        <div class="px-1 pt-3">
            <div class="text-right">
                <label for="show_option_id" v-bind:class="['mr-1', show_option ? '' : 'text-muted']">Показать буквы</label>
                <input type="checkbox" v-bind:disabled="checked" id="show_option_id" v-model="show_option" />
            </div>
            <p v-html="question_answers.question"></p>
            <div v-for="answer in question_answers.answers" v-bind:key="answer.value" class="d-flex">
                <span v-bind:class="['text-'+answer.spoiler.color, 'font-weight-bold']">
                    {{ answer.spoiler.text }}
                </span>
                <p class="form-check-inline">
                    <input v-model="answer_codes" v-bind:disabled="checked"
                           class="form-check-input" type="checkbox" v-bind:value="answer.value"
                           v-bind:id="'answer'+answer.value">
                    <label v-bind:for="'answer'+answer.value" v-html="answer.text"
                           class="form-check-label"></label>
                </p>
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
                this.next_question();
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
                    answer = this.show_option ? answer : answer.slice(answer.indexOf(']')+1);
                    answers.push({
                        text: answer,
                        value: 100+index,
                        spoiler
                    })
                });
                this.quiz.fake_answers.forEach((fake_answer, index) => {
                    fake_answer = this.show_option ? fake_answer : fake_answer.slice(fake_answer.indexOf(']')+1);
                    answers.push({
                        text: fake_answer,
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

            check_answer: function() {
                if (this.checked) return;
                this.checked = true;

                let is_right = this.answer_codes.every(value => value >= 100) && this.answer_codes.length === this.question_answers.answers.filter(ans => ans.value >= 100).length;
                // console.log('# check-answer: ' + is_right);

                this.question_answers.answers.forEach(answer => {
                    let text = '',
                        color = '';

                    if (answer.value >= 100) {
                        text = 'Дұрыс';
                        color = this.answer_codes.includes(answer.value) ? 'success' : 'danger';
                    } else {
                        color = 'danger';
                        text = this.answer_codes.includes(answer.value) ? 'Қате' : '';
                    }
                    answer.spoiler = { text, color };
                });

                if (is_right) {
                    this.quizes.splice(this.quizes.indexOf(this.quiz), 1)
                } else {
                    this.quizes.push(this.quiz);
                }
            }
        }
    }
</script>

<style scoped>

</style>
