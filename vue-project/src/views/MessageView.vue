<template>
    <div class="msg-border">
        <div class="msg-wrapper" :style="scrollerHeight">
            <div class="contact-wrapper round-border">
                <div class="contact-nav">
                    <h3>Contacts</h3>
                </div>
                <div class="contact-scroller">
                    <div class="contact-content">
                        <div v-for="i in 20" class="contact-item">
                            <span class="avatar"><img src="../assets/logo.png" /></span>
                            <span class="nickname">Tony Skywalker</span>
                        </div>
                    </div>
                    <div class="contact-indicator"></div>
                </div>
            </div>
            <div class="message-wrapper round-border">
                <div class="title">
                    <h2>Tony Skywalker</h2>
                    <span><i class="fa-solid fa-user"></i></span>
                </div>
                <div class="msg-panel"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            scrollerHeight: {
                height: ''
            },
            scroller: null
        }
    },
    beforeCreate() {
    },
    created() {
        window.addEventListener("resize", this.resizeEventHandler);
        this.resizeEventHandler();
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeUnmount() {
    },
    unmounted() {
        window.removeEventListener('resize', this.resizeEventHandler);
    },
    destroyed() {
    },
    computed: {
    },
    watch: {
    },
    methods: {
        resizeEventHandler() {
            this.scrollerHeight.height = (window.innerHeight - 100) + 'px';
        }
    }
}
</script>

<style>
@import '../assets/css/message.css';
</style>