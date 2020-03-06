<template>
    <div>
        <div class="bg-dark text-white">
            <div class="py-1 d-flex" style="cursor: pointer" v-on:click="showInfo = !showInfo">
                <div class="text-uppercase text-center w-100 ">{{ quiz_bank.name }}</div>
                <div class="px-2">
                    <font-awesome-icon :icon="['fas', showInfo ? 'angle-up' : 'angle-down']" style="font-size: x-large" />
                </div>
            </div>
            <table v-show="showInfo" class="table table-striped table-sm bg-light">
                <tr>
                    <td width="220">Количество вопросов</td>
                    <td>{{ quiz_bank.quizes.length }} вопросов</td>
                </tr>
                <tr v-if="upsent_numbers.length > 0">
                    <td>Не найденные вопросы</td>
                    <td>№{{ upsent_numbers }}</td>
                </tr>
                <tr v-if="dublicate_numbers.length > 0">
                    <td>Вопросы с одинаковыми номерами</td>
                    <td>№{{dublicate_numbers }}</td>
                </tr>
                <tr>
                    <td>Дата создания</td>
                    <td>{{ quiz_bank.created | format_date }}</td>
                </tr>
                <tr v-if="quiz_bank.comment.length > 0" class="">
                    <td colspan="2" class="py-3">Комментарий: "{{ quiz_bank.comment }}"</td>
                </tr>
            </table>
        </div>

        <div class="my-4">
            <div class="m-auto" style="max-width: 290px;">
                <div class="">
                    <div class="text-muted">Вопросы: {{ quiz_range }}</div>
                    <div class="d-flex">
                        <div class="w-100 mr-2">
                            <input v-model="input_question_range" v-on:keyup.enter="set_exam_quizes" type="text" class="form-control rounded-0" />
                        </div>
                        <button type="button" v-on:click="set_exam_quizes" class="btn btn-outline-primary rounded-0">Начать</button>
                    </div>
                    <div v-show="input_question_range_message.length > 0" class="text-success font-weight-lighter">
                        {{ input_question_range_message }}
                    </div>
                </div>
            </div>
        </div>

        <div v-if="seance.id > 0">
            <div v-show="seance.quizes.length === 0" class="my-2 alert alert-success" style="">
                <div class="text-center mb-2">Вы ответили на {{ seance.correct_answers + seance.incorrect_answers }} вопрос(а)</div>
                <div class="text-center">
                    <thumbs v-bind:up="seance.correct_answers" v-bind:down="seance.incorrect_answers" />
                </div>
                <div v-if="seance.next_range.length > 0" class="d-flex justify-content-between m-auto" style="width: 280px">
                        <span class="align-self-center w-100 py-1 px-2 mr-2" style="height: 2.1rem;">
                            Следующие: <span class="font-weight-bold">{{ seance.next_range }}</span>
                        </span>
                    <button class="btn btn-outline-success btn-sm rounded-0" v-on:click="set_next_range">Перейди</button>
                </div>
            </div>

            <Trainer v-bind:seance="seance" />
        </div>
    </div>
</template>

<script>

    import Trainer from './Trainer'
    import sp from './sp'
    import thumbs from './thumbs'

    const range = (raw) => {
        let [start, end] = raw.split("-").map((e) => Number(e));
        return Array.from({length: (end-start+1)}, (v, k) => k + start);
    };

    export default {
        name: "Quiz",
        props: ['quiz_bank'],
        data() {
            return {
                input_question_range: '1-25',
                input_question_range_message: '',
                seance: {
                    id: 0,
                    mode: 0,
                    quizes: [],
                    correct_answers: 0,
                    incorrect_answers: 0,
                    next_range: '1-30'
                },
                showInfo: false
            }
        },
        created() {
            this.set_exam_quizes();
        },
        computed: {
            quiz_numbers: function() {
                return this.quiz_bank.quizes.map(quiz => quiz.number)
            },
            quiz_range: function() {
                return Math.min(...this.quiz_numbers) + '-' + Math.max(...this.quiz_numbers);
            },
            upsent_numbers: function() {
                let numbers = range(this.quiz_range);
                return numbers.filter(number => !this.quiz_numbers.includes(number)).join(', ');
            },
            dublicate_numbers: function() {
                return this.quiz_numbers.reduce((acc, value, index, array) => {
                    if (array.indexOf(value, index+1) !== -1) {
                        acc.push(value);
                    }
                    return acc;
                }, []).join(', ')
            },
            input_question_range_numbers: function() {
                let regpat = /\d{1,3}-\d{1,3}|\d{1,3}/g;
                let numbers = [];
                let match;
                while (match = regpat.exec(this.input_question_range)) {
                    if (match[0].indexOf('-') === -1) {
                        numbers.push(Number(match[0]));
                    }
                    else {
                        numbers.push(...range(match[0]));
                    }
                }
                return numbers.filter((n) => this.quiz_numbers.includes(n));
            }
        },
        filters: {
            format_date: function(secs) {
                let date = new Date(secs * 1000);
                let day = date.getDate().toString().padStart(2, '0');
                let month = (date.getMonth() + 1).toString().padStart(2, '0');
                let hours = date.getHours().toString().padStart(2, '0');
                let minutes = date.getMinutes().toString().padStart(2, '0');
                return  day + '.'+month + '.'+date.getFullYear() + " " + hours + ':' + minutes;
            }
        },
        methods: {
            set_exam_quizes: function() {
                let exam_quizes = this.input_question_range_numbers.reduce((acc, num) => {
                    let quizes = this.quiz_bank.quizes.filter(quiz => quiz.number === num);
                    return acc.concat(quizes);
                }, []);

                if (exam_quizes.length === 0) {
                    this.input_question_range_message = 'Неверный диапазон вопросов';
                    return;
                } else {
                    this.input_question_range_message = '';
                }

                let next_min = Math.max(...this.input_question_range_numbers) + 1;
                let next_max = next_min + next_min - Math.min(...this.input_question_range_numbers);
                let quiz_max = Math.max(...this.quiz_numbers);
                next_max = next_max >= quiz_max ? quiz_max : next_max;
                let next_range = next_min >= quiz_max ? '' : next_min + '-' + next_max;

                this.seance = {
                    id: +new Date(),
                    mode: this.quiz_bank.mode,
                    quizes: [...exam_quizes],
                    correct_answers: 0,
                    incorrect_answers: 0,
                    next_range: next_range
                };
            },
            set_next_range: function() {
                this.input_question_range = this.seance.next_range;
                this.set_exam_quizes();
            }
        },
        components: {
            Trainer,
            // sp,
            thumbs
        }
    }
</script>

<style scoped>

</style>
