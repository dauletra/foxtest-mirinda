<template>
    <div>
        <div class="bg-dark text-white">
            <p class="text-uppercase text-center py-1">
                {{ quiz_bank.name }}
            </p>
            <table v-show="false" class="table table-striped bg-light">
                <tr>
                    <td>Код</td>
                    <td>filosofia</td>
                </tr>
                <tr>
                    <td>Количество вопросов</td>
                    <td>301</td>
                </tr>
                <tr>
                    <td>Не найденные вопросы</td>
                    <td>56, 78</td>
                </tr>
                <tr>
                    <td>Дата создания</td>
                    <td>16.12.2019</td>
                </tr>
                <tr>
                    <td>Комментарии</td>
                    <td>Вопрос с номером 270 не имеет 5 вариантов ответа</td>
                </tr>

            </table>
        </div>

        <div class="d-flex justify-content-center mb-3">
            <div style="max-width: 290px; width: 100%">
                <div class="text-muted">Вопросы: {{ quiz_range }}</div>
                <div class="d-flex">
                    <div class="w-100 mr-2">
                        <input v-model="input_question_range" type="text" class="form-control rounded-0" />
                    </div>
                    <button type="button" v-on:click="set_exam_range_numbers" class="btn btn-outline-primary rounded-0">Начать</button>
                </div>
            </div>
        </div>

        <div v-if="exam_range_numbers.length > 0">
            <Trainer v-bind:quiz_bank="quiz_bank" v-bind:exam_range_numbers="exam_range_numbers" />
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

    export default {
        name: "Quiz",
        props: ['quiz_bank'],
        data() {
            return {
                input_question_range: '1-25',
                exam_range_numbers: [],
            }
        },
        created() {
            this.set_exam_range_numbers();
        },
        computed: {
            quiz_numbers: function() {
                return this.quiz_bank.quizes.map(quiz => quiz.number)
            },
            quiz_range: function() {
                return Math.min(...this.quiz_numbers) + '-' + Math.max(...this.quiz_numbers);
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
            set_exam_range_numbers: function() {
                this.exam_range_numbers = [...this.input_question_range_numbers];
            },
        },
        components: {
            Trainer
        }
    }
</script>

<style scoped>

</style>
