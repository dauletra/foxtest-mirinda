<template>
    <div>
        <div class="d-flex flex-column flex-sm-row justify-content-center">
            <div class="text-center pr-sm-3">
                <label class="col-form-label" style="">Введите код теста</label>
            </div>
            <div>
                <div class="d-flex justify-content-center align-content-center" >
                    <div class="pr-sm-3" style="width: 200px">
                        <input placeholder="code" v-model.trim="input_code.code" v-on:keyup.enter="load_quiz(input_code)" v-bind:disabled="input_code.downloading"  type="text" class="form-control rounded-0" style="color: black;" />
                        <div v-if="message.length > 0" class="text-danger small">{{ message }}</div>
                    </div>
                    <div class="">
                        <button type="button" v-on:click="load_quiz(input_code)" v-bind:disabled="input_code.downloading" class="btn btn-primary rounded-0" style="width: 95px">
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
</template>

<script>

    import axios from 'axios'

    let api_url = 'https://foxtest-retro.herokuapp.com/quiz/';

    export default {
        name: "Loader",
        data() {
            return {
                input_code: {
                    code: '',
                    downloading: false
                },
                last_codes: [],
                message: ''
            }
        },
        computed: { },
        created() {
            let last_codes_string = localStorage.getItem('last_codes');
            let last_codes_list = [];
            try {
                last_codes_list = JSON.parse(last_codes_string) || [];
            } catch {}

            this.last_codes = last_codes_list.map(last_code => ({
                code: last_code,
                downloading: false
            }));
        },
        methods: {
            remove_from_last_codes: function(code) {
                let res = this.last_codes.filter(last_code => last_code.code === code);
                if (res.length > 0) {
                    console.log('@Loader-remove_from_last_codes');
                    this.last_codes.splice(this.last_codes.indexOf(res[0]), 1);
                    let last_codes_list = this.last_codes.map(last_code => last_code.code);
                    localStorage.setItem('last_codes', JSON.stringify(last_codes_list))
                }
            },
            update_last_codes: function(code) {
                console.log('@Loader-update_last_codes');
                let res = this.last_codes.filter(last_code => last_code.code === code);
                if (res.length > 0) {
                    this.last_codes.splice(this.last_codes.indexOf(res[0]), 1);
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
            load_quiz: function(quiz_code) {
                console.log('@Loader-load_quiz');
                console.log('Код: ' + quiz_code.code);
                if (quiz_code.code.length === 0)
                    return;
                quiz_code.downloading = true;
                // this.update_last_codes(quiz_code.code);
                axios.get(api_url+quiz_code.code + '/')
                    .then(response => {
                        console.log('Ответ получен...');
                        // console.log(response.data);
                        if (response.data.has_error) {
                            console.log('Ожидаемая ошибка...');
                            this.message = response.data.message;
                            this.remove_from_last_codes(quiz_code.code);
                            console.log(response.data);
                        } else {
                            this.$emit('set_quiz_bank', response.data);
                            this.update_last_codes(quiz_code.code);
                        }
                    })
                    .catch(error => {
                        if (error) {
                            console.log('Непревиденная ошибка!');
                            console.log(error);
                        }
                    })
                    .finally(() => {
                        quiz_code.downloading = false;
                    });
            }
        },
    }
</script>

<style scoped>

</style>
