<template>
    <q-dialog :maximized="true" v-model="active" transition-show="slide-right" transition-hide="slide-left">
        <q-list class="root">
            <q-item>
                <q-item-section>
                    <div class="row">
                        <q-avatar class="icon q-mr-md" @click="$store.commit('mailPopupMobile', false)">
                            <q-icon name="clear" class="q-mr-md"></q-icon>
                        </q-avatar>
                        <div class="menuText">알림</div>
                    </div>
                </q-item-section>
            </q-item>
            <q-item v-for="(item, idx) in mails" :key="idx">
                <q-item-section>
                    <div class="flex">
                        <q-icon :name="item.icon" class="q-mr-md q-mt-sm"></q-icon>
                        <div class="self-center text">
                            <div class="text-weight-bold">
                                {{ item.title }}
                            </div>

                            <div class="content">
                                {{ item.content }}
                            </div>

                            <div class="date">
                                {{ item.date }}
                            </div>
                        </div>
                    </div>
                </q-item-section>
            </q-item>

            <q-item v-if="mails.length === 0">
                <q-item-section>
                    <div class="flex">
                        <div class="text text-center">
                            알림이 없습니다.
                        </div>
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
    </q-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import Login from "src/scripts/login";

@Component
export default class AccountPopupMobile extends Vue {

    private active : boolean = false;
    mails = [];

    mounted() {
        this.mails = [
            {
                title: "개발 스튜디오 이용 제한 안내",
                content: "이용약관 위반 활동이 감지되어 게임 업로드가 제한되었습니다.",
                date: "1일 전",
                icon: "fas fa-bullhorn",
            },
            {
                title: "커뮤니티 이용 제한 안내",
                content: "이용약관 위반 활동이 감지되어 댓글은 작성할 수 없습니다.",
                date: "1일 전",
                icon: "fas fa-bullhorn",
            },
            {
                title: "게임",
                content: "honey keeper에 좋아요가 올랐습니다.",
                date: "3일 전",
                icon: "fas fa-thumbs-up",
            },
            {
                title: "게임",
                content: "basketball papa에 새로운 댓글이 달렸습니다.",
                date: "일주일 전",
                icon: "fas fa-comment-dots",
            },
        ];
    }

    beforeDestroy() {
        // console.log(1234);
    }

    @Watch( 'active' )
    private onChangedActive() {
        this.$store.commit('mailPopupMobile', this.active);
    }

    @Watch( '$store.getters.mailPopupMobile' )
    private onChangedMailPopupMobile() {
        this.active = this.$store.getters.mailPopupMobile;
    }
}
</script>
<style lang="scss" scoped>
a {
    text-decoration: none;
}

.root {
    background-color: #282828;
    .menuItem {
        color: #b7b7b7;
    }

    .menuText {
        line-height: 48px;
        font-size: 18px;
    }
}
</style>
