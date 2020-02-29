<template>
    <div class="container-fluid px-0" style="max-width: 700px">

        <div class="">
            <div class="h3">
                <span>foxtest.kz</span>
            </div>

            <blockquote class=" border-left pl-2 my-4" style="max-width: 350px">
                <span class="small">Никто не может отнять твой шпор, если этот шпор в твоей голове ;)</span>
            </blockquote>
        </div>

        <div v-if="Object.keys(quiz_bank).length === 0" class="py-4">

            <div class="m-auto">

                <div class="d-flex flex-column flex-sm-row justify-content-center">
                    <div class="text-center pr-sm-3">
                        <label class="col-form-label" style="">Введите код теста</label>
                    </div>
                    <div>
                        <div class="d-flex justify-content-center align-content-center" >
                            <div class="pr-sm-3" style="width: 200px">
                                <input placeholder="code" v-model.trim="input_code.code" v-on:keyup.enter="load_quiz_input_code" v-bind:disabled="input_code.downloading"  type="text" class="form-control rounded-0" style="color: black;" />
                                <div v-if="input_code.message.length > 0" class="text-danger font-weight-bold small">{{ input_code.message }}</div>
                            </div>
                            <div class="">
                                <button type="button" v-on:click="load_quiz_input_code" v-bind:disabled="input_code.downloading" class="btn btn-primary rounded-0" style="width: 95px">
                            <span v-if="input_code.downloading">
                                <font-awesome-icon :icon="['fas', 'spinner']" spin />
                            </span>
                                    <span v-else>Загрузить</span>
                                </button>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center">
                            <div style="width: 290px">
                                <div v-if="last_codes.length > 0" class="">
                                    <div class="my-1">Последние</div>
                                    <div v-for="last_code in last_codes" v-bind:key="last_code.code" class="px-3">
                                        <div class="d-flex justify-content-between ">
                                        <span class="">
                                            <code>{{ last_code.code }}</code>
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
                                <div v-else>
                                    <div class="my-1">Например, <code>filosofia</code></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div v-if="quiz_version_message.length > 0" class="m-auto alert alert-danger" style="max-width: 350px; width: 100%; height: 100px;">
                {{quiz_version_message}}
            </div>
            <div v-else style="height: 100px;"></div>

            <div class="d-flex flex-column justify-content-center">
                <div class="text-center h5">Как загрузить тест на сайт?</div>

                <div class="my-4">
                    <div class="text-center"><span class="font-weight-bold original-font">Отправляете</span> нам тест удобным способым</div>
                    <div class="d-flex justify-content-center mt-2">
                        <a href="#" class="btn btn-outline-primary">
                            <font-awesome-icon :icon="['fab', 'vk']" size="lg" style="color: #45668e" /> dauletra
                        </a>
                        <a href="#" class="btn btn-outline-primary mx-2">
                            <font-awesome-icon :icon="['fab', 'whatsapp']" size="lg" style="color: #225f1e" /> <span style="color: black;">8(747)1126303</span>
                        </a>
                        <a href="#" class="btn btn-outline-primary">
                            <font-awesome-icon :icon="['fab', 'instagram']" size="lg" style="color: #833ab4" /> dauletra
                        </a>
                    </div>
                </div>

                <div class="my-4">
                    <div class="text-center">
                        <span class=" font-weight-bold original-font">Ждете</span> пока мы загружаем ваш тест на сайт
                    </div>
                    <div class="text-center mt-2">
                        <font-awesome-icon :icon="['fas', 'user-clock']" size="3x" style="color: #8d8d8d" />
                    </div>
                    <div class="small m-auto text-center mt-2" style="width: 320px">Загрузка теста на сайт может занять до 4-ч часов в зависимости от нагруженности</div>
                </div>

                <div class="my-4">
                    <div class="text-center"><span class="font-weight-bold original-font">Получаете</span> код вашего теста</div>
                    <div class="text-center mt-2">
                        <font-awesome-icon :icon="['fab', 'vk']" size="lg" style="color: #45668e" />
                        <font-awesome-icon :icon="['fab', 'whatsapp']" size="lg" style="color: #225f1e" class="mx-2" />
                        <font-awesome-icon :icon="['fab', 'instagram']" size="lg" style="color: #833ab4" />
                    </div>
                </div>
            </div>
            <div style="height: 50px;"></div>

            <div class="d-flex flex-column justify-content-center">
                <div class="text-center h5">Какие тесты принимает сайт?</div>

                <div class="d-flex my-3">
                    <div><font-awesome-icon icon="check" size="lg" class="mr-2" style="color: forestgreen" /></div>
                    <div>
                        <div>Формат файла</div>
                        <div class=" p-2 mt-2">
                            <img width="40" v-bind:src="ms_word" />
                            MS Word</div>
                    </div>
                </div>
                <div class="d-flex">
                    <div><font-awesome-icon icon="check" size="lg" class="mr-2" style="color: forestgreen" /></div>
                    <div>
                        <div>Содержание теста</div>
                        <div class="p-2 mt-2">
                            <font-awesome-icon icon="font" style="color: #2b496e;" /> Текст <br/>
                            <font-awesome-icon icon="superscript" style="color: #2b496e;" /> Формула <br/>
                            <font-awesome-icon icon="chart-pie" style="color: #2b496e;" /> Изображение
                        </div>
                    </div>
                </div>
                <div class="d-flex my-3">
                    <div><font-awesome-icon icon="check" size="lg" class="mr-2" style="color: forestgreen" /></div>
                    <div>
                        <div>Варианты ответа</div>
                        <div class="p-2 mt-2">
                            <font-awesome-icon :icon="['far', 'check-circle']" style="color: #2b496e;" /> один ответ или <br/>
                            <font-awesome-icon :icon="['far', 'check-square']" style="color: #2b496e;" /> несколько ответов<br/>
                        </div>
                    </div>
                </div>
                <div class="d-flex">
                    <div><font-awesome-icon icon="check" size="lg" class="mr-2" style="color: forestgreen" /></div>
                    <div class="w-100">
                        <div>Варианты ответа</div>
                        <div class="row no-gutters mt-3">
                            <div class="col-12 col-sm-6 border">
                                <div class="border-bottom p-2"><font-awesome-icon :icon="['far', 'check-circle']" style="color: #2b496e;" /> один ответ</div>
                                <div class="p-2">
                                    <div><span class="of">2.</span> В каком году Эйнштейн получил Нобельевскую премию? (Во всех воросах вариант А должен быть правильным)
                                        <span class="of">&para;</span></div>
                                    <div>A<span class="of">)</span> 1922 г<span class="of">&para;</span></div>
                                    <div>B<span class="of">)</span> 1914 г<span class="of">&para;</span></div>
                                    <div>C<span class="of">)</span> 1921 г<span class="of">&para;</span></div>
                                    <div>D<span class="of">)</span> 1926 г<span class="of">&para;</span></div>
                                    <div>E<span class="of">)</span> 1918 г<span class="of">&para;</span></div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 border mt-2 mt-sm-0">
                                <div class="border-bottom p-2"><font-awesome-icon :icon="['far', 'check-square']" style="color: #2b496e;" /> несколько ответов</div>
                                <div class="p-2">
                                    <div><span class="of">2.</span> В каком году Эйнштейн получил Нобельевскую премию? (В данном вопросе правильные ответы B, C, D)
                                        <span class="of">&para;</span></div>
                                    <div>A<span class="of">)</span> <span class="of">[</span>0.0<span class="of">]</span> 1922 г<span class="of">&para;</span></div>
                                    <div>B<span class="of">)</span> <span class="of">[</span>0.6<span class="of">]</span> 1914 г<span class="of">&para;</span></div>
                                    <div>C<span class="of">)</span> <span class="of">[</span>0.7<span class="of">]</span> 1921 г<span class="of">&para;</span></div>
                                    <div>D<span class="of">)</span> <span class="of">[</span>0.7<span class="of">]</span> 1926 г<span class="of">&para;</span></div>
                                    <div>E<span class="of">)</span> <span class="of">[</span>0.0<span class="of">]</span> 1918 г<span class="of">&para;</span></div>
                                    <div>F<span class="of">)</span> <span class="of">[</span>0.0<span class="of">]</span> 1918 г<span class="of">&para;</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Quiz v-if="Object.keys(quiz_bank).length > 0" v-bind:quiz_bank="quiz_bank" />


        <div class="mt-3 small border-top border-bottom">
            <!-- footer -->
            <div class="text-center">
                <span>v0.3</span> |
                <span>Бурное 2020</span> |
                <span>
                    <a href="https://vk.com/dauletra" target="_blank">vk.com/dauletra</a>
                </span>
            </div>
            <div class="text-center">
                <input type="file" hidden ref="jsonFile" id="quiz_file" v-on:change="openFile" class="form-control form-control-file rounded-0" />
                <label for="quiz_file" class="text-primary" style="cursor: pointer">Загрузить из файла</label>
                <!-- <button type="button" v-on:click="openFile" class="btn btn-primary rounded-0" style="width: 95px">Загрузить</button> -->
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Quiz from './components/Quiz'
    import ms_word from './assets/ms_word.png'

    // todo Сайттың фонын өзгерту
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
                ms_word: ms_word,
                quiz_version_message: '',
                quiz_bank: {},
                input_code: {
                    code: '',
                    downloading: false,
                    message: ''
                },
                last_codes: [
                    {
                        code: 'fizika',
                        downloading: false
                    },
                    {
                        code: 'mathemat',
                        downloading: false
                    },
                    {
                        code: 'termodynamics',
                        downloading: false
                    },
                    {
                        code: 'algebra',
                        downloading: false
                    }
                ]
            }
        },
        computed: {},
        created() {
            return;
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
    .original-font {
        color: #dc3545;
    }
    .of {
        color: #dc3545;
    }
</style>
