<template>
    <div class="container-fluid px-0 border" style="max-width: 700px">
        <div class="h3 d-flex justify-content-between">
            <!-- header -->
            <span>
                <sp>fox</sp><span class="">test.kz</span>
            </span>
            <span>
                <font-awesome-icon :icon="['fab', 'vk']" style="color: #45668e" />
                <font-awesome-icon :icon="['fab', 'instagram']" class="mx-2" style="color: #833ab4" />
            </span>
        </div>


        <Hero v-if="home" />

        <Loader v-if="home" v-on:set_quiz_bank="set_quiz_bank" />

        <Quiz v-if="!home" v-bind:quiz_bank="quiz_bank" />

        <Instruction v-if="home" />


        <div class="mt-3 small border-top border-bottom">
            <!-- footer -->
            <div class="text-center">
                <span>v0.3</span> |
                <span>Бурное 2020</span> |
                <span>
                    <a href="https://vk.com/dauletra" target="_blank">vk.com/dauletra</a>
                </span>
                <Reader v-on:set_quiz_bank="set_quiz_bank" />
            </div>
        </div>
    </div>
</template>

<script>
    import Hero from './components/Hero'
    import Loader from './components/Loader'
    import Quiz from './components/Quiz'
    import Instruction from './components/Instruction'
    import Reader from './components/Reader'

    import sp from './components/sp'

    export default {
        name: 'app',
        data() {
            return {
                version: 0.3,
                quiz_bank: {},
            }
        },
        computed: {
            home: function() {
                return Object.keys(this.quiz_bank).length === 0;
            }
        },
        created() {},
        methods: {
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
                this.quiz_bank = quiz_bank;
            },
        },
        components: {
            Hero,
            Loader,
            Quiz,
            Instruction,
            Reader,
            sp
        },
    }
</script>

<style>

</style>
