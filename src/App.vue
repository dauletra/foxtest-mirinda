<template>
  <div class="container-fluid px-0" style="max-width: 700px">

    <div class="text-center border shadow-sm mb-4">
      <div class="h2">FoxTest</div>
    </div>

    <div v-if="Object.keys(quiz_bank).length === 0" class="py-4 px-3">
      <div class="m-auto" style="max-width: 350px; width: 100%">
        <p class="h5">Из интернета</p>
        <div class="d-flex justify-content-center">
          <div class="w-100 mx-2 border">
            <input placeholder="Введите код" type="text" class="form-control rounded-0" />
            <div v-show="true" class="list-group list-group-flush border-top text-primary">
              <button type="button" class="list-group-item list-group-item-action py-1 border-0 text-primary">filosofia</button>
              <button type="button" class="list-group-item list-group-item-action py-1 border-0 text-primary">dintanu</button>
              <button type="button" class="list-group-item list-group-item-action py-1 border-0 text-primary">matematika</button>
              <button type="button" class="list-group-item list-group-item-action py-1 border-0 text-primary">english</button>
            </div>
          </div>
          <div>
            <button type="button" class="btn btn-primary rounded-0">Загрузить</button>
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
          <button type="button" v-on:click="openFile" class="btn btn-primary rounded-0">Загрузить</button>
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

  export default {
    name: 'app',
    data() {
      return {
        quiz_bank: {}
      }
    },
    computed: {
    },
    methods: {
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
        console.group('openFile');
        console.log(' - Тесты загружены -');
        console.log('_v = ' + json._v);
        console.log('name = ' + json.name);
        console.log('code = ' + json.code);
        console.log('mode = ' + json.mode);
        console.log('created = ' + json.created);
        console.log('comment: ' + json.comment);
        console.log('Количество вопросов: ' + json.quizes.length);
        console.log('[' + Object.keys(json).join(', ') + ']');
        console.groupEnd('openFile');
        this.quiz_bank = json;
      }
    },
    components: {
      Quiz
    },
  }
</script>

<style>

</style>
