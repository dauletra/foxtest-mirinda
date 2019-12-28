<template>
    <div>
        <div v-if="range_numbers.length > 0" class="border d-flex" style="height: 60px">
            <div class="border d-flex align-items-center px-1 shadow-sm">
                <span style="white-space: nowrap">Осталось {{ range_numbers.length }}</span>
            </div>
            <div class="d-flex align-items-center px-2 border-right w-100 white-space: nowrap" style="overflow-x: auto">
                <a href="#" class="px-2" v-for="(next_number, index) in range_numbers" v-bind:key="index" v-on:click.prevent="next_question(next_number)">{{ next_number }}</a>
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
            <p v-html="quiz.question"></p>
            <div v-for="answer in quiz.answers" v-bind:key="answer.value" class="d-flex">
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
                <button type="button" v-bind:disabled="range_numbers.length === 0" v-on:click="next_question" class="btn btn-warning rounded-0">&gt;</button>
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
            quiz_bank: Object,
            exam_range_numbers: Array
        },
        data() {
            return {
                range_numbers: [...this.exam_range_numbers],
                current_question_number: '',
                answer_codes: [],
                checked: '',
                quiz: {},
                show_option: false
            }
        },
        watch: {
            exam_range_numbers: function(val) {
                this.range_numbers = [...val];
                this.next_question();
            }
        },
        created() {
            this.next_question();
        },
        methods: {
            next_question: function(next_number) {
                if (this.range_numbers.length === 0) {
                    console.log('# Вопросы закончились');
                    return;
                }
                let index = Math.floor(Math.random() * this.range_numbers.length);
                this.current_question_number = typeof next_number === "number" ? next_number : this.range_numbers[index];

                let quiz = this.quiz_bank.quizes.filter(quiz => quiz.number === this.current_question_number)[0];
                let answers = [];
                let spoiler = { text: '', color: '' };
                quiz.answers.forEach((answer, index) => {
                    answer = this.show_option ? answer : answer.slice(answer.indexOf(']')+1);
                    answers.push({
                        text: answer,
                        value: 100+index,
                        spoiler
                    })
                });
                quiz.fake_answers.forEach((fake_answer, index) => {
                    fake_answer = this.show_option ? fake_answer : fake_answer.slice(fake_answer.indexOf(']')+1);
                    answers.push({
                        text: fake_answer,
                        value: 10+index,
                        spoiler
                    })
                });
                this.answer_codes = [];
                this.checked = false;
                this.quiz = {};
                this.quiz.question = quiz.question;
                this.quiz.answers = shuffle_array(answers);
            },

            check_answer: function() {
                if (this.checked) return;
                this.checked = true;

                let is_right = this.answer_codes.every(value => value >= 100) && this.answer_codes.length === this.quiz.answers.filter(ans => ans.value >= 100).length;
                // console.log('# check-answer: ' + is_right);

                this.quiz.answers.forEach(answer => {
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
                    this.range_numbers.splice(this.range_numbers.indexOf(this.current_question_number), 1)
                } else {
                    this.range_numbers.push(this.current_question_number);
                }
            }
        }
    }
</script>

<style scoped>

</style>
