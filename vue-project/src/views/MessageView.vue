<template>
    <div class="msg-border">
        <div class="msg-wrapper" :style="styles.scrollerHeight">
            <!-- Contact Box -->
            <div class="contact-wrapper msg-box round-border">
                <div class="contact-nav msg-box-nav">
                    <h3>Contacts</h3>
                </div>
                <!-- Contact Scroller -->
                <div class="contact-scroller">
                    <div class="contact-content">
                        <div v-for="(contact, index) in contacts.contactList"
                            class="contact-item animate__animated animate__slideInLeft"
                            :style="getContactAnimDuration(index)" @click="onClickContactItem(index)" :key="contact.uid">
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

            <!-- Message Box -->
            <div class="message-wrapper msg-box round-border">
                <div class="title msg-box-nav">
                    <span class="link">
                        <h2 @click="onClickUsername()">{{ choice.title }}</h2>
                    </span>
                    <span class="but r0" @click="onClickDeleteConversation()"><i class="fa-solid fa-xmark"
                            title="Close conversation"></i></span>
                    <span class="but r1" @click="onClickRefresh()"><i class="fa-solid fa-arrows-rotate"
                            v-bind:class="{ 'fa-spin': isLoading || isRefreshing }" title="Refresh conversation"></i></span>
                    <span class="but r2" @click="onClickDeleteContact()"><i class="fa-solid fa-user-xmark"
                            title="Delete contact"></i></span>
                </div>
                <!-- Loading indicator -->
                <div class="load" v-bind:class="{ hide: !isLoading }"><i class="fa-solid fa-spinner fa-spin-pulse"></i>
                </div>
                <!-- Messate Scroller -->
                <div ref="scroller" class="message-scroller">
                    <div v-for="i in contacts.contactsCnt" class="message-content"
                        v-bind:class="{ active: (choice.activeId == (i - 1)) }" v-bind:id="i">
                        <div v-for="(message, index) in activeHistory" class="message animate__animated"
                            v-bind:class="getMessageClass(message.income)" :key="message.timestamp">
                            <div class="avatar"><img :src="getAvatarUrl(message.avatar)" /></div>
                            <div class="payload">
                                <div class="text">
                                    <p class="mathjax">{{ message.text }}</p>
                                    <div class="mark" v-show="message.invalid"><i
                                            class="fa-solid fa-circle-exclamation"></i></div>
                                </div>
                                <div class="time">
                                    <p>{{ message.timestamp }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="message-input" v-bind:class="getInputClass" :style="styles.textareaHeight">
                    <textarea ref="input" placeholder="Say something..." v-on:keyup="autoGrowTextArea()"
                        v-bind:class="styles.textareaClass"></textarea>
                    <div class="clear but" @click="onClickClearTextArea()"><i class="fa-solid fa-eraser"></i></div>
                    <div class="submit but" @click="onClickSend()"><i class="fa-regular fa-paper-plane" title="Send"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { initMathJax, renderByMathjax } from 'mathjax-vue';

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
            tempContacts: {
                contactsCnt: 0,
                contactList: []
            },
            myAvatar: '',
            inputHistory: [],
            // Barnacle Vue2 array & objects! >:(
            activeHistory: [],
            key: 0,
            isLoading: false,
            isRefreshing: false,
            timeFormat: {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            },
            refreshRate: 3 * 1000  // refresh every half minute
        }
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
        // adjust size
        window.addEventListener("resize", this.resizeEventHandler);
        this.resizeEventHandler();

        this.onFirstLoad();

        initMathJax({}, this.onMathJaxReady);

        // this.addUpdateHook();

        // this.$refs.scroller.addEventListener("scroll", this.scrollEventHandler); 
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

        scrollEventHandler() {
            console.log("Scrolling");
        },

        onMathJaxReady() {
            // const math = this.$refs.math
            const maths = document.getElementsByClassName('mathjax');
            for (var i = 0; i < maths.length; i++) {
                // console.log(maths[i]);
                renderByMathjax(maths[i]).catch(err => {
                    console.log(err)
                });
            }
        },

        async renderMathJax() {
            try {
                setTimeout(this.onMathJaxReady, 100);
            } catch (err) {
                console.log(err);
            }
        },

        // Auto-Grow-TextArea script.
        // Script copyright (C) 2011 www.cryer.co.uk.
        // Script is free to use provided this copyright header is included.
        // Modified to Vue style by Tony.
        autoGrowTextArea() {
            const input = this.$refs.input;
            if (input.value == '') {
                this.styles.textareaHeight.height = '55px';
                this.styles.textareaClass = '';
            } else {
                const clientHeight = input.clientHeight;
                const scrollHeight = input.scrollHeight;
                if (clientHeight < scrollHeight) {
                    this.styles.textareaHeight.height = Math.min(Math.max(scrollHeight, 55) + 100, 300) + 'px';
                    if (clientHeight < scrollHeight) {
                        this.styles.textareaHeight.height = Math.min(Math.max(scrollHeight * 2 - clientHeight, 50) + 100, 300) + 'px';
                    }
                }
                if (parseInt(this.styles.textareaHeight.height) == 300) {
                    this.styles.textareaClass = 'full';
                } else {
                    this.styles.textareaClass = '';
                }
            }

            // this.updateMessageAreaAnim();
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
        getMessageClass(income) {
            return income ? 'income animate__fadeInLeft' : 'outcome animate__fadeInRight';
        },
        getContactAnimDuration(id) {
            return 'animation-delay: ' + id * 50 + 'ms';
        },

        // Mapping relation
        getUid(id) {
            if (id < 0) {
                return 0;
            }
            return this.contacts.contactList[id].uid;
        },
        getContactHistory(id) {
            if (id < 0) {
                return [];
            }
            return this.contacts.contactList[id].history;
        },

        // Scroll message area.
        updateMessageAreaAnim() {
            // You're not expected to understand this... Me too. :(
            var start = parseInt(this.$refs.scroller.scrollTop);
            var end = parseInt(this.$refs.scroller.scrollHeight);
            var dist = Math.abs(end - start);
            var coef = (dist < 0) ? -1 : 1;
            for (var i = 1; i <= dist; i++) {
                (function (_i, _obj) {
                    setTimeout(function (__obj) {
                        __obj.scrollTop = start + (coef * _i);
                    }, Math.sqrt(_i) * 20, _obj);
                })(i, this.$refs.scroller);
            }
            (function (_i, _obj) {
                setTimeout(function (__obj) {
                    __obj.scrollTop = __obj.scrollHeight;
                }, (Math.sqrt(dist) + 1) * 20, _obj);
            })(i, this.$refs.scroller);
        },
        updateMessageAreaForce() {
            var start = this.$refs.scroller.scrollTop;
            var end = this.$refs.scroller.scrollHeight;

            // console.log(start);
            // console.log(end);

            // Immediate call may result improper update.
            (function (_obj) {
                setTimeout(function (__obj) {
                    __obj.scrollTop = __obj.scrollHeight;
                }, 0, _obj);
            })(this.$refs.scroller);
        },

        // Only mark invalid message, and it will be lost after refresh.
        markInvalidMessage(id, mid) {
            // console.log("removing " + id + "-" + mid);
            var history = this.getContactHistory(id);
            var msg = history[mid];
            msg.invalid = true;
            history.splice(mid, 1, msg);
        },

        updateContactTime(id, timestamp) {
            this.contacts.contactList[id].timestamp = timestamp;
        },

        ////////////////////////////////////////////////////////////////////////
        //  Requests
        ////////////////////////////////////////////////////////////////////////
        async requestContacts() {
            await this.$http.get('api/v1/msgs/contacts', {}).then(res => {
                var data = res.data;
                console.log(data);
                if (data.meta.status != 0) {
                    // alert(data.meta.msg);
                    this.$message.error(data.meta.msg);
                    this.$router.push({ path: '/login' });
                    return;
                }

                // get contacts
                this.tempContacts.contactsCnt = data.data.total;
                this.tempContacts.contactList = []
                for (var i = 0; i < data.data.total; i++) {
                    var contact = data.data.contacts[i];
                    contact['upToDate'] = false;
                    contact['history'] = [];
                    this.tempContacts.contactList.push(contact);
                }

                // get self avatar
                this.myAvatar = data.data.avatar;

                // prepare user history
                for (var i = 0; i < this.tempContacts.contactList.length; i++) {
                    this.inputHistory.push('');
                }
            }).catch(err => {
                console.log(err);
            });
        },

        async requestChatHistory(id, uid, subtle = false) {
            await this.$http.get('api/v1/msgs/get', {
                params: {
                    uid: uid
                }
            }).then(res => {
                var data = res.data;
                console.log(data);
                if (data.meta.status != 0) {
                    this.$message.error(data.meta.msg);
                } else {
                    for (var i = 0; i < data.data.total; i++) {
                        var message = data.data.msgs[i];
                        message['invalid'] = false;
                        this.contacts.contactList[id].history.push(message);
                    }
                }
            }).catch(err => {
                console.log(err);
                this.$message.error("Network error! Try again later.");
            });

            // console.log(this.chatHistory[id])
            if (!subtle) {
                this.updateMessageAreaAnim();
            }
        },

        async requestUpdateContact(uid) {
            await this.$http.post('api/v1/msgs/update', {
                uid: uid
            }).then(res => {
                var data = res.data;
                console.log(data);
                if (data.meta.status != 0) {
                    this.$message.error(data.meta.msg);
                }
            }).catch(err => {
                this.$message.error("Network error, try again later.");
                console.log(err);
            });
        },

        async sendMessage(uid, text, id, mid) {
            // id and mid for error handling
            await this.$http.post('api/v1/msgs/send', {
                uid: uid,
                type: 0,    // fixed to text message
                msg: {
                    text: text
                }
            }).then(res => {
                var data = res.data;
                console.log(data);
                var message = null;
                if (data.meta.status != 0) {
                    this.$message.error("Failed to send message!");
                    message = {
                        text: text,
                        income: false,
                        avatar: this.myAvatar,
                        timestamp: '',
                        invalid: true
                    }
                } else {
                    // NOTE: remove this in production
                    // this.$message.success("Message delivered!")
                    var content = data.data.content;
                    message = {
                        text: content.msg.text,
                        income: false,
                        avatar: this.myAvatar,
                        timestamp: content.timestamp,
                        invalid: false
                    }
                }
                this.activeHistory.push(message);
                this.updateMessageAreaAnim();
            }).catch(err => {
                this.$message.error("Network error, try again later.");
                setTimeout(this.markInvalidMessage, 50, id, mid);
                console.log(err);
            });
        },

        async requestDeleteContact(uid) {
            await this.$http.post('api/v1/msgs/delete', {
                uid: uid
            }).then(res => {
                var data = res.data;
                console.log(data);
                if (data.meta.status != 0) {
                    this.$message.error(data.meta.msg);
                } else {
                    this.refreshContacts();
                }
            }).catch(err => {
                console.log(err);
            });
        },

        ////////////////////////////////////////////////////////////////////////
        //  First load
        ////////////////////////////////////////////////////////////////////////
        async onFirstLoad() {
            var uid = this.$route.query.uid;
            if (uid != null) {
                await this.requestUpdateContact(uid);
            }
            await this.requestContacts();
            this.contacts = this.tempContacts;

            if (uid != null) {
                this.relocateContact(uid);
            } else {
                this.onResetContactItem();
            }
        },

        ////////////////////////////////////////////////////////////////////////
        //  Click event handlers
        ////////////////////////////////////////////////////////////////////////

        onResetContactItem() {
            // this.$refs.input.value = '';
            // this.autoGrowTextArea();

            this.choice.activeId = -1;
            this.choice.title = ''

            this.styles.indicatorClass.transform = 'translateY(-80px)';

            this.activeHistory = [];
        },

        // Contact click
        async onClickContactItem(id, subtle = false) {
            if (id == this.choice.activeId) {
                return;
            }

            // backup input
            if ((this.choice.activeId != id) && (this.choice.activeId != -1)) {
                this.inputHistory[this.choice.activeId] = this.$refs.input.value;
            }

            if (id == -1) {
                this.onResetContactItem();
                return;
            }

            // start loading...
            if (!subtle) {
                this.isLoading = true;
            }

            var contact = this.contacts.contactList[id];

            // request for history
            if (!contact.upToDate) {
                await this.requestChatHistory(id, contact.uid, subtle);
                contact.upToDate = true;
            }
            this.activeHistory = this.getContactHistory(id);
            if (!subtle) {
                this.updateMessageAreaForce();
            }

            // reset layout
            contact.unread = 0;

            this.choice.activeId = id;
            this.choice.title = contact.username;

            this.styles.indicatorClass.transform = 'translateY(' + id * 80 + 'px)';

            // reset input textarea
            this.$refs.input.value = this.inputHistory[this.choice.activeId];
            this.autoGrowTextArea();

            this.renderMathJax();

            // stop loading...
            if (!subtle) {
                this.isLoading = false;
            }
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

        // Refresh converstaion click
        async refreshChatHistory(id) {
            // clear chat history
            this.contacts.contactList[id].history = [];

            var contact = this.contacts.contactList[id];
            await this.requestChatHistory(id, contact.uid);
            var history = this.getContactHistory(id);
            if (history.length > 0) {
                this.updateContactTime(id, history[history.length - 1].timestamp);
            }
        },

        // Delete contact
        async onClickDeleteContact() {
            const id = this.choice.activeId;
            if (id >= 0) {
                await this.requestDeleteContact(this.getUid(id));
                this.contacts.contactList.splice(id, 1);
                this.onResetContactItem();
            }
        },

        reorderContacts() {
            var id = this.choice.activeId;
            var uid = (id < 0) ? 0 : this.contacts.contactList[id].uid;

            this.tempContacts.contactList = this.contacts.contactList;
            this.tempContacts.contactList.sort(function (x, y) {
                var xDate = Date.parse(x.timestamp);
                var yDate = Date.parse(y.timestamp);
                if (xDate < yDate) {
                    return 1;
                }
                if (xDate > yDate) {
                    return -1;
                }
                return 0;
            });
            this.contacts.contactList = this.tempContacts.contactList;
            this.relocateContact(uid);
        },

        relocateContact(uid) {
            console.log(this.contacts.contactList);
            var id = -1;
            for (var i = 0; i < this.contacts.contactList.length; i++) {
                if (this.contacts.contactList[i].uid == uid) {
                    id = i;
                    break;
                }
            }
            // console.log("relocate: " + id);
            this.onClickContactItem(id, true);
        },

        async refreshContacts() {
            var id = this.choice.activeId;
            var uid = (id < 0) ? 0 : this.contacts.contactList[id].uid;

            await this.requestContacts();
            this.contacts = this.tempContacts;

            this.relocateContact(uid);
        },

        async refreshPage(subtle) {
            if (!subtle) {
                this.isRefreshing = true;
            }

            const id = this.choice.activeId;
            if (id >= 0) {
                await this.refreshChatHistory(id);
            }
            await this.refreshContacts();

            if (!subtle) {
                this.isRefreshing = false;
            }
        },

        async onClickRefresh() {
            await this.refreshPage(false);
        },

        // Jump to user space.
        onClickUsername() {
            if (this.choice.activeId < 0) {
                return;
            }
            const id = this.choice.activeId;
            this.$router.push({
                path: '/visitor',
                query: {
                    uid: this.contacts.contactList[id].uid
                }
            });
        },

        // Send message.
        _isWhiteSpace(str) {
            return str.trim() == ''
        },

        async onClickSend() {
            const id = this.choice.activeId;
            if (id == -1) {
                return; // no active conversation
            }

            // varify input
            var text = this.$refs.input.value;
            if (this._isWhiteSpace(text)) {
                this.$message.info("Don't send empty message :)");
                return;
            }

            this.isRefreshing = true;

            // clear input
            this.$refs.input.value = '';
            this.autoGrowTextArea();

            // send message, aync function
            await this.sendMessage(this.contacts.contactList[id].uid, text, id, this.activeHistory.length);

            var history = this.getContactHistory(id);
            this.updateContactTime(id, history[history.length - 1].timestamp);
            this.reorderContacts();

            this.isRefreshing = false;
        },

        ////////////////////////////////////////////////////////////////////////
        //  Routine update event handlers
        ////////////////////////////////////////////////////////////////////////
        addUpdateHook() {
            setTimeout(this.updatePage, this.refreshRate);
        },
        updatePage() {
            this.refreshPage(true);
            setTimeout(this.updatePage, this.refreshRate);
        }
    }
}
</script>

<style>
@import '../assets/css/message.css';
@import '../assets/css/animate.css';
</style>