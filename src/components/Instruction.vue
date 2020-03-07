<template>
    <div>
        <div class="d-flex flex-column justify-content-center">
            <div class="text-center h4 font-weight-bold">Как загрузить тест на сайт?</div>

            <div class="my-4">
                <div class="text-center"><sp class="font-weight-bold">Отправляете</sp> нам тест удобным способым</div>
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
                    <sp class="font-weight-bold">Ждете</sp> пока мы загружаем ваш тест на сайт
                </div>
                <div class="text-center mt-2">
                    <font-awesome-icon :icon="['fas', 'user-clock']" size="3x" style="color: #8d8d8d" />
                </div>
                <div class="small m-auto text-center mt-2" style="width: 320px">Загрузка теста на сайт может занять до 4-ч часов в зависимости от нагруженности</div>
            </div>

            <div class="my-4">
                <div class="text-center"><sp class="font-weight-bold">Получаете</sp> код вашего теста</div>
                <div class="text-center mt-2">
                    <font-awesome-icon :icon="['fab', 'vk']" size="lg" style="color: #45668e" />
                    <font-awesome-icon :icon="['fab', 'whatsapp']" size="lg" style="color: #225f1e" class="mx-2" />
                    <font-awesome-icon :icon="['fab', 'instagram']" size="lg" style="color: #833ab4" />
                </div>
            </div>
        </div>
        <div style="height: 50px;"></div>

        <div class="d-flex flex-column justify-content-center">
            <div class="text-center h4 font-weight-bold">Какие тесты принимает сайт?</div>

            <div class="mt-4">
                <div class="text-center">
                    <font-awesome-icon icon="check" size="lg" class="mr-2" style="color: forestgreen" />
                    Формат файла
                </div>
                <div class="p-2 text-center">
                    <img width="40" src="../assets/ms_word.png" />
                    MS Word</div>
            </div>

            <div class="mt-4">
                <div class="text-center">
                    <font-awesome-icon icon="check" size="lg" class="mr-2" style="color: forestgreen" />
                    Содержание теста
                </div>
                <div class="p-2 text-center">
                    <font-awesome-icon icon="font" style="color: #2b496e;" /> Текст
                    <span class="mx-3"><font-awesome-icon icon="superscript" style="color: #2b496e;" /> Формула</span>
                    <font-awesome-icon icon="chart-pie" style="color: #2b496e;" /> Изображение
                </div>
            </div>

            <div class="mt-4">
                <div class="text-center">
                    <font-awesome-icon icon="check" size="lg" class="mr-2" style="color: forestgreen" />
                    Варианты ответа и структура теста
                </div>
                <div class="row no-gutters mt-3">
                    <div class="col-12 col-sm-6 border">
                        <div class="border-bottom p-2"><font-awesome-icon :icon="['far', 'check-circle']" style="color: #2b496e;" /> один ответ</div>
                        <div class="p-2">
                            <div><sp>2.</sp> Давление в гидравлической машине 400 кПа. На меньший поршень действует сила 200 Н. Площадь меньшего поршня
                                <sp>&para;</sp></div>
                            <div>A<sp>)</sp> 50 см<sup>2</sup><sp>&para;</sp></div>
                            <div>B<sp>)</sp> 200 см<sup>2</sup><sp>&para;</sp></div>
                            <div>C<sp>)</sp> 20 см<sup>2</sup><sp>&para;</sp></div>
                            <div>D<sp>)</sp> 500 см<sup>2</sup><sp>&para;</sp></div>
                            <div>E<sp>)</sp> 100 см<sup>2</sup><sp>&para;</sp></div>
                        </div>
                        <div class="">
                            <ul class="list-group">
                                <li class="list-group-item">Количество вариантов: <sp>5</sp></li>
                                <li class="list-group-item">Правильный вариант: <sp>всегда A</sp></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 border mt-2 mt-sm-0">
                        <div class="border-bottom p-2"><font-awesome-icon :icon="['far', 'check-square']" style="color: #2b496e;" /> несколько ответов</div>
                        <div class="p-2">
                            <div><sp>2.</sp> При напряжении 200 В и силе тока 2 А работа силы тока за 2 минуты в электрической плите равна
                                <sp>&para;</sp></div>
                            <div>A<sp>)</sp> <sp>[</sp>0.0<sp>]</sp> 32 кДж<sp>&para;</sp></div>
                            <div>B<sp>)</sp> <sp>[</sp>1.0<sp>]</sp> 48 кДж<sp>&para;</sp></div>
                            <div>C<sp>)</sp> <sp>[</sp>0.0<sp>]</sp> 3800 Дж<sp>&para;</sp></div>
                            <div>D<sp>)</sp> <sp>[</sp>0.0<sp>]</sp> 32000 Дж<sp>&para;</sp></div>
                            <div>E<sp>)</sp> <sp>[</sp>1.0<sp>]</sp> 48000 Дж<sp>&para;</sp></div>
                            <div>F<sp>)</sp> <sp>[</sp>0.0<sp>]</sp> 3,8 кДж<sp>&para;</sp></div>
                        </div>
                        <div class="">
                            <ul class="list-group">
                                <li class="list-group-item">Количество вариантов: <sp>6</sp></li>
                                <li class="list-group-item">Правильные варианты: <sp>здесь В, Е</sp></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import sp from './sp.vue'

    export default {
        name: "Instruction",
        components: {
            sp
        }
    }
</script>

<style scoped>

</style>
