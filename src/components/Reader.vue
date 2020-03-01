<template>
    <div class="text-center">
        <input type="file" hidden ref="jsonFile" id="quiz_file" v-on:change="openFile" class="form-control form-control-file rounded-0" />
        <label for="quiz_file" class="text-primary" style="cursor: pointer">Загрузить из файла</label>
        <!-- <button type="button" v-on:click="openFile" class="btn btn-primary rounded-0" style="width: 95px">Загрузить</button> -->
    </div>
</template>

<script>
    export default {
        name: "Reader",
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
                this.$emit('set_quiz_bank', json);
            }
        }
    }
</script>

<style scoped>

</style>
