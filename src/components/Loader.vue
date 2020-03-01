<template>
    <div>
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

        <div v-if="quiz_version_message.length > 0" class="m-auto alert alert-danger" style="max-width: 350px; width: 100%; height: 100px;">
            {{quiz_version_message}}
        </div>
        <div v-else style="height: 100px;"></div>
    </div>
</template>

<script>

    import axios from 'axios'

    let api_url = 'https://foxtest-retro.herokuapp.com/quiz/';

    export default {
        name: "Loader",
        data() {
            return {
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
        computed: { },
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
                            this.$emit('set_quiz_bank', response.data)
                        }
                    })
                    .catch(error => {
                        console.error(' - Ошибка. Свяжитесь с разработчиками: ', error);
                        console.log(error.response.data);
                    })
                    .finally(() => {
                        down_code.downloading = false;
                    });
            }
        },
    }
</script>

<style scoped>

</style>
