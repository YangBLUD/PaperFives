<template>
    <div class="areas">
        <div class="areas-body">
            <div class="area-main" v-for="(item, index) in Areas" :key="index">
                <div class="user-info">
                    <div>
                        <span class="area-name" @click="gosearch(item.area.name)">{{ item.area.name }}</span>
                    </div>
                    <div>
                        <span class="area-email">领域大类：{{ item.area.primary }} </span>
                        <span class="area-des">领域小类：{{ item.area.secondary }}</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Areas',
    props: {
        Areas: {
            default: []
        }
    },
    data() {
        return {}
    },
    methods: {
        async gosearch(name) {
            this.$router.push({
                path: "/searchres", query: {
                    "field": "areas",
                    "key": name,
                    type: 1
                }
            })
        },
    }
}
</script>
<style lang="scss">
.areas {
    .area-name {
        color: #2d94d4;
        cursor: pointer;
        font-size: 20px;
    }

    .areas-body {
        display: flex;
        flex-wrap: wrap;
    }

    .area-main {
        display: flex;
        align-items: center;
        flex: 0 0 50%;
        padding-bottom: 20px;

        &:not(:last-child) {
            border-bottom: 1px solid #d3dce6;
        }

        .avator {
            width: 80px;
            height: 100px;
            text-align: center;
            display: flex;
            align-items: center;

            img {
                width: 42px;
                height: 42px;
                border: 1px solid;
                vertical-align: middle;
            }
        }

        .user-info {
            flex: 1;
        }

        .area-des {
            font-size: 12px;
            color: #666;
        }

        .area-grade {
            font-size: 12px;
        }
    }
}</style>