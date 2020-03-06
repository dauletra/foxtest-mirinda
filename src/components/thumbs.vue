<template>
    <span style="white-space: nowrap">
        <span :class="[up ? 'text-success' : 'text-muted']"><font-awesome-icon :icon="['far', 'thumbs-up']" />
            {{ up }}
        </span>
        <span :class="['mx-2', down ? 'text-danger' : 'text-muted']"><font-awesome-icon :icon="['far', 'thumbs-down']" />
            {{ down }}
        </span>
    </span>
</template>

<script>
    export default {
        name: "thumbs",
        props: {
            up: Number,
            down: Number
        }
    }
</script>

<style scoped>

</style>
