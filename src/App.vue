<template>
  <div class="container-fluid px-0" style="max-width: 700px">

    <div class="text-center border shadow-sm mb-4">
      <div class="h2">
        <span style="cursor: pointer" v-on:click="quiz_bank={}">FoxTest</span>
      </div>
    </div>

    <div v-if="Object.keys(quiz_bank).length === 0" class="py-4 px-3">
      <div class="m-auto" style="max-width: 350px; width: 100%">
        <p class="h5">Из интернета</p>
        <div class="d-flex justify-content-center">
          <div class="w-100 mx-2 border">
            <input placeholder="Введите код" v-model.trim="code" v-on:keyup.enter="loadFile" type="text" class="form-control rounded-0" />
          </div>
          <div>
            <button type="button" v-on:click="loadFile" v-bind:disabled="downloading" class="btn btn-primary rounded-0" style="width: 95px">
              <span v-if="downloading">
                <font-awesome-icon :icon="['fas', 'spinner']" spin />
              </span>
              <span v-else>Загрузить</span>
            </button>
          </div>
        </div>
      </div>

      <div style="height: 100px;"></div>

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
  // import HelloWorld from './components/HelloWorld.vue'
  import Quiz from './components/Quiz'
  import Trainer from './components/Trainer'

  const range = (raw) => {
    let [start, end] = raw.split("-").map((e) => Number(e));
    return Array.from({length: (end-start+1)}, (v, k) => k + start);
  };

  let api_url = 'https://foxtest-retro.herokuapp.com/quiz/';

  export default {
    name: 'app',
    data() {
      return {
        quiz_bank: {},
        code: '',
        downloading: false
      }
    },
    computed: {
    },
    methods: {
      set_quiz_bank: function(quiz_bank) {
        console.group('quiz_bank_info');
        console.log(' - Тесты загружены -');
        console.log('_v = ' + quiz_bank._v);
        console.log('name = ' + quiz_bank.name);
        console.log('code = ' + quiz_bank.code);
        console.log('mode = ' + quiz_bank.mode);
        console.log('created = ' + quiz_bank.created);
        console.log('comment: ' + quiz_bank.comment);
        console.log('Количество вопросов: ' + quiz_bank.quizes.length);
        console.log('[' + Object.keys(quiz_bank).join(', ') + ']');
        console.groupEnd('quiz_bank_info');

        this.quiz_bank = quiz_bank;
      },
      loadFile: function() {
        console.log(this.code);
        if (this.code.length === 0)
          return;
        this.downloading = true;
        fetch(api_url+this.code)
                .then(response => response.json())
                .then(data => {
                  this.downloading = false;
                  console.log('Файл загружен');
                  this.set_quiz_bank(data)
                })
                .catch(error => {
                  this.downloading = false;
                  console.log('Request failed: ', error)
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
