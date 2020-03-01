<template>
    <span class="sp-color">
        <slot></slot>
    </span>
</template>

<script>
    export default {
        name: "sp"
    }
</script>

<style scoped>
    .sp-color {
        color: #dc3545;
    }
</style>
