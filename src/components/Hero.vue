<template>
    <div class="row no-gutters my-header">
        <div class="header-bg"></div>
        <div class="h2 col-12 col-sm-8 p-4">
            <div class="pl-4 font-weight-bold" style="">
                <sp>В</sp><span class="">ыучить</span><br/>
                <span class="">тест</span><br/>
                <sp>л</sp><span class="">егко</span><br/>
                <span class="text-warning h2" style="">и бесплатно</span>
            </div>
        </div>
        <div class="position-relative d-none d-sm-block col-sm-4 pl-4" style="height: 330px; transform: rotate(-8deg);">
            <div class="position-absolute">
                <img src="../assets/mobile.gif" width="138" style="margin-left: 11px; margin-top: 13px" />
            </div>
            <div class="position-absolute">
                <img src="../assets/iphone.png" width="160" class="" style="" />
            </div>
        </div>
    </div>
</template>

<script>
    import sp from './sp.vue'

    export default {
        name: "Hero",
        components: {
            sp
        }
    }
</script>

<style scoped>
    .my-header {
        position: relative;
        z-index: 1;
    }
    .my-header .header-bg {
        position: absolute;
        z-index: -1;
        background: url(../assets/test-header-naklon.jpg) no-repeat center;
        opacity: .3;
        width: 100%;
        height: 100%;
    }
</style>
