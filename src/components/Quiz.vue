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
                    <td>{{ quiz_bank.quizes.length }}</td>
                </tr>
                <tr v-if="upsent_numbers.length > 0">
                    <td>Не найденные вопросы</td>
                    <td>{{ upsent_numbers }}</td>
                </tr>
                <tr>
                    <td>Дата создания</td>
                    <td>{{ created_time }}</td>
                </tr>
                <tr v-if="quiz_bank.comment.length > 0">
                    <td colspan="2">Комментарий: "{{ quiz_bank.comment }}"</td>
                </tr>
            </table>
        </div>

        <div class="d-flex justify-content-center mb-3">
            <div style="max-width: 290px; width: 100%">
                <div class="text-muted">Вопросы: {{ quiz_range }}</div>
                <div class="d-flex">
                    <div class="w-100 mr-2">
                        <input v-model="input_question_range" v-on:keyup.enter="set_exam_quizes" type="text" class="form-control rounded-0" />
                    </div>
                    <button type="button" v-on:click="set_exam_quizes" class="btn btn-outline-primary rounded-0">Начать</button>
                </div>
                <div v-if="exam_quizes.length === 0" class="text-success font-weight-lighter">
                    Неправильный диапазон вопросов
                </div>
            </div>
        </div>

        <div v-if="exam_quizes.length > 0">
            <Trainer v-bind:exam_quizes="exam_quizes" v-bind:mode="quiz_bank.mode" />
        </div>
    </div>
</template>

<script>
    /*
    FoxTest _v=0.2
     */

    import Trainer from './Trainer'

    const range = (raw) => {
        let [start, end] = raw.split("-").map((e) => Number(e));
        return Array.from({length: (end-start+1)}, (v, k) => k + start);
    };

    const date_to_str = (secs) => {
        let date = new Date(secs * 1000);
        return  date.getDate() + '.'+(date.getMonth()+1) + '.'+date.getFullYear(); //+" "+date.getHours()+':'+date.getMinutes();
    };

    export default {
        name: "Quiz",
        props: ['quiz_bank'],
        data() {
            return {
                input_question_range: '1-25',
                exam_quizes: [],
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
            created_time: function() {
                return date_to_str(this.quiz_bank.created);
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
        methods: {
            set_exam_quizes: function() {
                this.exam_quizes = this.input_question_range_numbers.reduce((acc, num) => {
                    let quizes = this.quiz_bank.quizes.filter(quiz => quiz.number === num);
                    return acc.concat(quizes);
                }, []);
                // console.log(this.exam_quizes.length);
            },
        },
        components: {
            Trainer
        }
    }
</script>

<style scoped>

</style>
