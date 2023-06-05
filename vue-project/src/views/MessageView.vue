<template>
    <div class="msg-border">
        <div class="msg-wrapper" :style="styles.scrollerHeight">
            <div class="contact-wrapper msg-box round-border">
                <div class="contact-nav msg-box-nav">
                    <h3>Contacts</h3>
                </div>
                <div class="contact-scroller">
                    <div class="contact-content">
                        <div v-for="(contact, index) in contacts.contactList" class="contact-item" @click="onClickContactItem(index)">
                            <div class="frame">
                                <div class="avatar">
                                    <img :src="getAvatarUrl(contact.avatar)" />
                                </div>
                                <i v-show="contact.unread > 0">{{ getUnread(contact.unread) }}</i>
                            </div>
                            <div class="info">
                                <span class="nickname">{{ contact.username }}</span>
                                <span class="timestamp">{{ contact.timestamp }}</span>
                            </div>
                        </div>
                        <div class="contact-padding"></div>
                    </div>
                    <div class="contact-indicator" :style="styles.indicatorClass"></div>
                </div>
            </div>
            <div class="message-wrapper msg-box round-border">
                <div class="title msg-box-nav">
                    <h2 @click="onClickUsername()">{{ choice.title }}</h2>
                    <span @click="onClickDeleteConversation()"><i class="fa-solid fa-user-xmark"
                            title="Close conversation"></i></span>
                </div>
                <div class="load" v-bind:class="{hide: !isLoading}"></div>
                <div class="message-scroller">
                    <div v-for="i in contacts.contactsCnt" class="message-content" v-bind:class="{ active: (choice.activeId == i) }" v-bind:id="i">
                        <div v-for="(message, index) in history[i]" v-bind:class="message.income ? income : outcome" v-bind:key="message.timestamp">
                            <div class="avatar"><img :src="getAvatarUrl(message.avatar)" /></div>
                            <div class="payload">
                                <div class="text">
                                    <p>{{ message.text }}</p>
                                </div>
                                <div class="time">
                                    <p>{{ message.timestamp }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="message-input" v-bind:class="getInputClass">
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
                activeId: -1
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
            inputHistory: [],
            history: [],
            isLoading: false
        }
    },
    beforeCreate() {
    },
    created() {
        window.addEventListener("resize", this.resizeEventHandler);
        this.resizeEventHandler();
        for (var i = 0; i < 20; i++) {
            this.inputHistory.push('');
        }
    },
    beforeMount() {
    },
    mounted() {
        this.requestContacts();
        this.onResetContactItem();
    },
    beforeUnmount() {
    },
    unmounted() {
        window.removeEventListener('resize', this.resizeEventHandler);
    },
    destroyed() {
    },
    computed: {
        getInputClass() {
            return this.choice.activeId >= 0 ? "show-input" : 'hide-input';
        }
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
                var data = res.data;
                console.log(data);
                if (data.meta.status != 0) {
                    alert(data.meta.msg);
                    this.$router.push({ path: '/login' })
                }
                this.contacts.contactsCnt = data.data.total;
                this.contacts.contactList = data.data.contacts;

                // prepare user history
                for (var i = 0; i < this.contacts.contactList.length; i++) {
                    this.history.push([]);
                }
            }).catch(err => {
                console.log(err);
            });
        },

        async requestHistory(id, uid) {
            this.isLoading = true;
            await this.$http.get('api/v1/msgs/get', {
                params: {
                    uid: uid
                }
            }).then(res => {
                var data = res.data;
                console.log(data);
                this.$set(this.history, id, data.data.msgs);
            }).catch(err => {
                console.log(err);
            });
            console.log(this.history[id])
            this.isLoading = false;
        },

        ////////////////////////////////////////////////////////////////////////
        //  Click event handlers
        ////////////////////////////////////////////////////////////////////////

        onResetContactItem() {
            this.$refs.input.value = '';
            this.autoGrowTextArea();

            this.choice.activeId = -1;
            this.choice.title=  ''

            this.styles.indicatorClass.transform = 'translateY(-80px)';
        },

        // Contact click
        onClickContactItem(id) {
            // backup input
            if ((this.choice.activeId != id) && (this.choice.activeId != -1)) {
                this.inputHistory[this.choice.activeId] = this.$refs.input.value;
            }

            if (id == -1) {
                this.onResetContactItem();
                return;
            }

            var contact = this.contacts.contactList[id];
            
            // request for history
            if (this.history[id].length == 0) {
                this.requestHistory(id, contact.uid);
            }
            
            // reset layout
            contact.unread = 0;

            this.choice.activeId = id;
            this.choice.title = contact.username;

            this.styles.indicatorClass.transform = 'translateY(' + id * 80 + 'px)';

            // reset input textarea
            this.$refs.input.value = this.inputHistory[this.choice.activeId];
            this.autoGrowTextArea();
        },

        // Clear text area
        onClickClearTextArea() {
            this.$refs.input.value = '';
            this.autoGrowTextArea();
        },

        // Delete conversation click
        onClickDeleteConversation() {
            this.onClickContactItem(-1);
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