<template>
    <div class="msg-border">
        <div class="msg-wrapper" :style="scrollerHeight">
            <div class="contact-wrapper msg-box round-border">
                <div class="contact-nav msg-box-nav">
                    <h3>Contacts</h3>
                </div>
                <div class="contact-scroller">
                    <div class="contact-content">
                        <div v-for="i in 20" class="contact-item">
                            <span class="avatar"><img src="../assets/logo.png" /></span>
                            <span class="nickname">Tony Skywalker</span>
                        </div>
                        <div class="contact-padding"></div>
                    </div>
                    <div class="contact-indicator"></div>
                </div>
            </div>
            <div class="message-wrapper msg-box round-border">
                <div class="title msg-box-nav">
                    <h2>Tony Skywalker</h2>
                    <span><i class="fa-solid fa-user-xmark" title="Delete conversation"></i></span>
                </div>
                <div class="message-scroller">
                    <div class="message-content">
                        <div v-for="i in 10" class="message income">
                            <div class="avatar"><img src="../assets/logo.png" /></div>
                            <div class="payload">
                                <div class="text">
                                    <p>Hello there! I am a big fan of you! Can you talk to me? Anything? Please, I really
                                        want to talk with you!</p>
                                </div>
                                <div class="time">
                                    <p>2023-06-06 12:23:35</p>
                                </div>
                            </div>
                        </div>
                        <div class="message income">
                            <div class="avatar"><img src="../assets/logo.png" /></div>
                            <div class="payload">
                                <div class="text">
                                    <p>Hello there!</p>
                                </div>
                                <div class="time">
                                    <p>2023-06-06 12:23:35</p>
                                </div>
                            </div>
                        </div>
                        <div class="message outcome">
                            <div class="avatar"><img src="../assets/logo.png" /></div>
                            <div class="payload">
                                <div class="text">
                                    <p>General Grievous!</p>
                                </div>
                                <div class="time">
                                    <p>2023-06-06 12:23:35</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="message-input">
                    <textarea ref="input" placeholder="Say something..." v-on:keyup="AutoGrowTextArea()"
                        :style="textareaHeight"></textarea>
                    <div class="clear but"><i class="fa-solid fa-eraser"></i></div>
                    <div class="submit but"><i class="fa-regular fa-paper-plane" title="Send"></i></div>
                </div>
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
            textareaHeight: {
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
            this.scrollerHeight.height = Math.max(window.innerHeight - 100, 400) + 'px';
        },

        // Auto-Grow-TextArea script.
        // Script copyright (C) 2011 www.cryer.co.uk.
        // Script is free to use provided this copyright header is included.
        // Modified to Vue style by Tony.
        AutoGrowTextArea() {
            const input = this.$refs.input;
            const clientHeight = input.clientHeight;
            const scrollHeight = input.scrollHeight;
            if (clientHeight < scrollHeight) {
                this.textareaHeight.height = Math.min(Math.max(scrollHeight, 55), 200) + 'px';
                if (clientHeight < scrollHeight) {
                    this.textareaHeight.height = Math.min(Math.max(scrollHeight * 2 - clientHeight, 50), 200) + 'px';
                }
            }
            if (input.value == '') {
                this.textareaHeight.height = '55px';
            }  
        }
    }
}
</script>

<style>
@import '../assets/css/message.css';
</style>