<template>
    <div class="areas">
        <div class="areas-body">
            <div class="area-main" v-for="(item, index) in Areas" :key="index">
                <div class="user-info">
                    <div>
                        <span class="area-name" @click="gosearch(item.area.name)">{{ item.area.name }}</span>
                    </div>
                    <div>
                        <span class="area-email">RANK:{{ item.rank | numFilter }} </span>
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
            type: Array,
            default: []
        }
    },
    data() {
        return {}
    },
    filters: {
        numFilter(value) {
            // 截取当前数据到小数点后两位
            let realVal = parseFloat(value).toFixed(2)
            return realVal
        }
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
        font-family: 'OpenSans', sans-serif;
        color: #2d94d4;
        cursor: pointer;
        font-size: 20px;
        font-weight: 600;
    }

    .areas-body {
        display: flex;
        flex-wrap: wrap;
    }

    .area-email {
        font-family: 'OpenSans-Bold', sans-serif;
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
}
</style>

