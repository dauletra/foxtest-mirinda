<template>
    <div class="container-fluid px-0" style="max-width: 700px">

        <div class="text-center border shadow-sm mb-4">
            <div class="h2">
                <span>FoxTest</span>
            </div>
        </div>

        <div v-if="Object.keys(quiz_bank).length === 0" class="py-4 px-3">

            <div class="m-auto" style="max-width: 350px; width: 100%">
                <p class="h5">Из интернета</p>
                <div class="d-flex justify-content-center">
                    <div class="w-100 mx-2">
                        <input placeholder="Введите код" v-model.trim="input_code.code" v-on:keyup.enter="load_quiz_input_code" type="text" class="form-control rounded-0" />
                        <div v-if="input_code.message.length > 0" class="text-danger font-weight-bold small">{{ input_code.message }}</div>
                    </div>
                    <div>
                        <button type="button" v-on:click="load_quiz_input_code" v-bind:disabled="input_code.downloading" class="btn btn-primary rounded-0" style="width: 95px">
                            <span v-if="input_code.downloading">
                                <font-awesome-icon :icon="['fas', 'spinner']" spin />
                            </span>
                            <span v-else>Загрузить</span>
                        </button>
                    </div>
                </div>
                <div v-if="last_codes.length > 0" class="px-3">
                    <div class="mt-3">Последние</div>
                    <div v-for="last_code in last_codes" v-bind:key="last_code.code" class="ml-2 font-weight-lighter">
                        <div class="d-flex justify-content-between ">
                            <span class="">
                                {{ last_code.code }}
                            </span>
                            <a href="#" v-on:click.prevent="load_quiz(last_code)">
                                <span v-if="last_code.downloading">
                                    <font-awesome-icon :icon="['fas', 'spinner']" spin />
                                </span>
                                <span v-else>загрузить</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="quiz_version_message.length > 0" class="m-auto alert alert-danger" style="max-width: 350px; width: 100%; height: 100px;">
                {{quiz_version_message}}
            </div>
            <div v-else style="height: 100px;"></div>

            <div class="m-auto" style="max-width: 350px; width: 100%">
                <p class="h5">Из файла</p>
                <div class="d-flex justify-content-center">
                    <div class="w-100 mx-2">
                        <input type="file" ref="jsonFile" class="form-control form-control-file rounded-0" />
                    </div>
                    <button type="button" v-on:click="openFile" class="btn btn-primary rounded-0" style="width: 95px">Загрузить</button>
                </div>
            </div>
        </div>

        <Quiz v-if="Object.keys(quiz_bank).length > 0" v-bind:quiz_bank="quiz_bank" />

    </div>
</template>

<script>
    import axios from 'axios'
    import Quiz from './components/Quiz'

    // todo Сайттың фонын өзгерту
    // todo сайтты қайта ашқанда соңғы тест автоматический загружать етіледі
    // todo Тест біткеннен кейін келесі 25|50|100 сұрақты бірден ашу мүмкіндігі
    // todo Тестті қанша сұрақтан бөліп өтетінін (25|50|100) настройкада сақтай алады

    const range = (raw) => {
        let [start, end] = raw.split("-").map((e) => Number(e));
        return Array.from({length: (end-start+1)}, (v, k) => k + start);
    };

    let api_url = 'https://foxtest-retro.herokuapp.com/quiz/';

    export default {
        name: 'app',
        data() {
            return {
                version: 0.3,
                quiz_version_message: '',
                quiz_bank: {},
                input_code: {
                    code: '',
                    downloading: false,
                    message: ''
                },
                last_codes: []
            }
        },
        computed: {},
        created() {
            let last_codes_string = localStorage.getItem('last_codes');
            let last_codes_list = JSON.parse(last_codes_string) || [];
            this.last_codes = last_codes_list.map(last_code => ({
                code: last_code,
                downloading: false
            }));
        },
        methods: {
            remove_from_last_codes: function(code) {
                let res = this.last_codes.filter(last_code => last_code.code === code);
                if (res.length > 0) {
                    console.log('@remove_from_last_codes');
                    this.last_codes.splice(this.last_codes.indexOf(res[0]), 1);
                    let last_codes_list = this.last_codes.map(last_code => last_code.code);
                    localStorage.setItem('last_codes', JSON.stringify(last_codes_list))
                }
            },
            update_last_codes: function(code) {
                let res = this.last_codes.filter(last_code => last_code.code === code);
                if (res.length > 0) {
                    console.log('@update_last_codes');
                    return;
                    // this.last_codes.splice(this.last_codes.indexOf(res[0]), 1);
                }
                if (this.last_codes.length > 4) {
                    this.last_codes.splice(4);
                }
                this.last_codes.splice(0, 0, {
                    code: code,
                    downloading: false
                });
                let last_codes_list = this.last_codes.map(last_code => last_code.code);
                localStorage.setItem('last_codes', JSON.stringify(last_codes_list));
            },
            set_quiz_bank: function(quiz_bank) {
                console.group('quiz_bank_info');

                console.log('@ Тесты загружены -');
                console.log('_v = ' + quiz_bank._v);
                console.log('Количество вопросов: ' + quiz_bank.quizes.length);
                console.log('[' + Object.keys(quiz_bank).join(', ') + ']');
                if (quiz_bank._v !== this.version) {
                    console.log('Сайт не может открыть данную версию теста');
                    this.quiz_version_message = 'Сайт не может открыть данную версию теста. Версия теста: ' + quiz_bank._v;
                    return;
                }

                console.groupEnd('quiz_bank_info');

                // this.update_last_codes(quiz_bank.code);
                this.quiz_bank = quiz_bank;
            },
            load_quiz_input_code: function() {
                this.input_code = {
                    ...this.input_code, message: ''
                };
                this.load_quiz(this.input_code);
            },

            load_quiz: function(down_code) {
                console.log('@load_quiz');
                console.log('code: ' + down_code.code);
                if (down_code.code.length === 0)
                    return;
                // this.update_last_codes(down_code.code);
                down_code.downloading = true;

                axios.get(api_url+down_code.code)
                    .then(response => {
                        console.log(' - Ответ получен');
                        if (response.data.has_error) {
                            down_code.message = response.data.message;
                            this.remove_from_last_codes(response.data.code);
                            console.log(response.data);
                        } else {
                            this.set_quiz_bank(response.data)
                        }
                    })
                    .catch(error => {
                        console.error(' - Ошибка. Свяжитесь с разработчиками: ', error);
                        console.log(error.response.data);
                    })
                    .finally(() => {
                        down_code.downloading = false;
                    });
            },
            openFile: function() {
                this.files = this.$refs.jsonFile.files;
                if (this.files.length === 0) {
                    console.log('Файл не выбран');
                    return;
                }
                console.log(this.files[0].name + ' ' + this.files[0].size + ' ' + this.files[0].type);
                let file = this.files[0];
                let reader = new FileReader();
                reader.onload = this.onReaderLoad;
                reader.readAsText(file);
            },
            onReaderLoad: function(event) {
                let jsontext = event.target.result;
                let json = JSON.parse(jsontext);
                this.set_quiz_bank(json)
            }
        },
        components: {
            Quiz
        },
    }
</script>

<style>

</style>
