<template>
    <div class="msg-border">
        <div class="msg-wrapper" :style="styles.scrollerHeight">
            <div class="contact-wrapper msg-box round-border">
                <div class="contact-nav msg-box-nav">
                    <h3>Contacts</h3>
                </div>
                <div class="contact-scroller">
                    <div class="contact-content">
                        <div v-for="i in contacts.contactsCnt" class="contact-item" @click="onClickContactItem(i)">
                            <div class="frame">
                                <div class="avatar">
                                    <img :src="getAvatarUrl(contacts.contactList[i].avatar)" />
                                </div>
                                <i v-show="contacts.contactList[i].unread > 0">{{ getUnread(contacts.contactList[i].unread) }}</i>
                            </div>
                            <div class="info">
                                <span class="nickname">{{ contacts.contactList[i].username }}</span>
                                <span class="timestamp">{{ contacts.contactList[i].timestamp }}</span>
                            </div>
                        </div>
                        <div class="contact-padding"></div>
                    </div>
                    <div v-if="choice.activeId != 0" class="contact-indicator" :style="styles.indicatorClass"></div>
                </div>
            </div>
            <div class="message-wrapper msg-box round-border">
                <div class="title msg-box-nav">
                    <h2 @click="onClickUsername()">{{ choice.title }}</h2>
                    <span @click="onClickDeleteConversation()"><i class="fa-solid fa-user-xmark"
                            title="Delete conversation"></i></span>
                </div>
                <div class="message-scroller">
                    <div v-for="i in contacts.contactsCnt" class="message-content"
                        v-bind:class="{ active: (choice.activeId == i) }" v-bind:id="i">
                        <div class="message income">
                            <div class="avatar"><img src="../assets/logo.png" /></div>
                            <div class="payload">
                                <div class="text">
                                    <p>Hello there! {{ i }}</p>
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
                                    <p>General Grievous! {{ i }}</p>
                                </div>
                                <div class="time">
                                    <p>2023-06-06 12:23:35</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="choice.activeId != 0" class="message-input">
                    <textarea ref="input" placeholder="Say something..." v-on:keyup="autoGrowTextArea()"
                        :style="styles.textareaHeight" v-bind:class="styles.textareaClass"></textarea>
                    <div class="clear but" @click="onClickClearTextArea()"><i class="fa-solid fa-eraser"></i></div>
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
            choice: {
                title: '',
                activeId: 0
            },
            styles: {
                scrollerHeight: {
                    height: ''
                },
                textareaHeight: {
                    height: ''
                },
                textareaClass: '',
                indicatorClass: {
                    transform: ''
                }
            },
            contacts: {
                contactsCnt: 0,
                contactList: []
            },
            history: []
        }
    },
    beforeCreate() {
    },
    created() {
        window.addEventListener("resize", this.resizeEventHandler);
        this.resizeEventHandler();
        for (var i = 0; i < 20; i++) {
            this.history.push('');
        }
    },
    beforeMount() {
    },
    mounted() {
        this.requestContacts();
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
            this.styles.scrollerHeight.height = Math.max(window.innerHeight - 100, 400) + 'px';
        },

        // Auto-Grow-TextArea script.
        // Script copyright (C) 2011 www.cryer.co.uk.
        // Script is free to use provided this copyright header is included.
        // Modified to Vue style by Tony.
        autoGrowTextArea() {
            const input = this.$refs.input;
            if (input.value == '') {
                this.styles.textareaHeight.height = '55px';
                return;
            }

            const clientHeight = input.clientHeight;
            const scrollHeight = input.scrollHeight;
            if (clientHeight < scrollHeight) {
                this.styles.textareaHeight.height = Math.min(Math.max(scrollHeight, 55), 200) + 'px';
                if (clientHeight < scrollHeight) {
                    this.styles.textareaHeight.height = Math.min(Math.max(scrollHeight * 2 - clientHeight, 50), 200) + 'px';
                }
            }
            if (parseInt(this.styles.textareaHeight.height) == 200) {
                this.styles.textareaClass = 'full';
            } else {
                this.styles.textareaClass = '';
            }
        },

        ////////////////////////////////////////////////////////////////////////
        //  Auxiliary functions
        ////////////////////////////////////////////////////////////////////////
        getAvatarUrl(url) {
            return 'http://81.70.161.76:5000' + url;
        },
        getUnread(unread) {
            return (unread > 99) ? '99+' : unread.toString();
        },

        ////////////////////////////////////////////////////////////////////////
        //  Requests
        ////////////////////////////////////////////////////////////////////////
        async requestContacts() {
            await this.$http.get('api/v1/msgs/contacts', {}).then(res => {
                var data = res.data
                console.log(data);
                if (data.meta.status != 0) {
                    alert(data.meta.msg);
                    this.$router.push({ path: '/login' })
                }
                this.contacts.contactsCnt = data.data.total;
                this.contacts.contactList = data.data.contacts;
                this.contacts.contactList.unshift({})   // since vue subscript starts from 1
            }).catch(err => {
                console.log(err);
            })
        },

        ////////////////////////////////////////////////////////////////////////
        //  Click event handlers
        ////////////////////////////////////////////////////////////////////////

        // Contact click
        onClickContactItem(id) {
            if (this.choice.activeId != id) {
                this.history[this.choice.activeId] = this.$refs.input.value;
                this.$refs.input.value = '';
            }
            
            var contact = this.contacts.contactList[id];
            contact.unread = 0;

            this.choice.activeId = id;
            this.choice.title = contact.username;
            this.styles.indicatorClass.transform = 'translateY(' + (id - 1) * 80 + 'px)';

            this.$refs.input.value = this.history[this.choice.activeId];
            this.autoGrowTextArea();
        },

        // Clear text area
        onClickClearTextArea() {
            this.$refs.input.value = '';
            this.autoGrowTextArea();
        },

        // Delete conversation click
        onClickDeleteConversation() {
            this.onClickContactItem(0);
        },

        // Jump to user space.
        onClickUsername() {
            if (this.choice.activeId == 0) {
                return;
            }
            const id = this.choice.activeId;
            this.$router.push({
                path: '/visitor',
                query: {
                    uid: this.contacts.contactList[id].uid
                }
            });
        }
    }
}
</script>

<style>
@import '../assets/css/message.css';
</style>