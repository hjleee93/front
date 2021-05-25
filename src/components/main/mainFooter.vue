<template>
    <div>
        <div class="footerTop"></div>
        <footer class="mainFooter bgColor-0 q-mt-lg q-pb-lg">
            <div class="maxWidth text-left q-px-md">
                <div class="q-mt-xl footer-top">
                    <tr>
                        <td class="q-pr-xl text-weight-bold">DEVELOPER</td>
                        <td>
                            <a
                                :href="`${$store.getters.developerWiki}`"
                                target="_black"
                                >{{ $t("mainFooter.developer.wiki") }}</a
                            >
                        </td>
                    </tr>
                    <tr>
                        <td class="q-pt-sm text-weight-bold">SNS</td>
                        <td>
                            <a
                                :href="`${$store.getters.instaUrl}`"
                                target="_black"
                                ><q-img
                                    src="img/instagram_logo.png"
                                    width="60%"
                            /></a>
                        </td>
                    </tr>
                </div>

                <div class="q-pt-xl languages">
                    <!-- <template v-for="i in Object.keys(languages)">
                        <language :lang="languages[i]" :value="i" :key="i.idx"></language>                        
                    </template> -->
                    <span
                        class="q-mr-md language"
                        ref="ko"
                        @click="selectLang('ko')"
                        >한국어</span
                    >
                    <span class="language" ref="en" @click="selectLang('en')"
                        >ENGLISH</span
                    >
                </div>
                <q-separator class="q-my-xl" />
                <div class="company q-mb-md">
                    <div>{{ $t("mainFooter.company.data1") }}</div>
                    <div>{{ $t("mainFooter.company.data2") }}</div>
                    <div>{{ $t("mainFooter.company.data3") }}</div>
                    <div>{{ $t("mainFooter.company.data4") }}</div>
                    <!--                    <div>전화 : 02-0000-0000</div>-->
                    <!--                    <div>E-Mail : help@fromthred.com</div>-->
                    <!--                    <div>SNS : @zempie_help</div>-->
                </div>
                <div class="row">
                    <div class="q-mr-md">
                        <a class="text-h7" :href="$store.getters.supportUrl">
                            {{ $t("mainFooter.support.home") }}
                        </a>
                    </div>
                    <!-- <div class="q-mr-md"><a class="cursor-pointer smallFont" :href="`${$store.getters.supportUrl}notice`">{{ $t('mainFooter.support.notice') }}</a></div>
                        <q-separator vertical class="q-mr-md"></q-separator> -->
                    <!--                        <div class="q-mr-md"><a class="cursor-pointer" >이벤트</a></div>-->
                    <!--                        <q-separator vertical class="q-mr-md"></q-separator>-->
                    <!-- <div class="q-mr-md"><a class="cursor-pointer smallFont" :href="`${$store.getters.supportUrl}faq`">{{ $t('mainFooter.support.faq') }}</a></div>
                        <q-separator vertical class="q-mr-md"></q-separator> -->
                    <!-- <div class="q-mr-md"><a class="cursor-pointer smallFont" :href="`${$store.getters.supportUrl}inquiry`">{{ $t('mainFooter.support.inquiry') }}</a></div>
                        <q-separator vertical class="q-mr-md"></q-separator> -->
                    <!-- <div class="q-mr-md"><a class="cursor-pointer smallFont" :href="`${$store.getters.supportUrl}guide`">{{ $t('mainFooter.support.guide') }}</a></div>
                        <q-separator vertical class="q-mr-md"></q-separator> -->
                    <div class="q-mr-md">
                        <a
                            class="cursor-pointer text-h7"
                            :href="`${$store.getters.supportUrl}tos`"
                            >{{ $t("mainFooter.support.tos") }}</a
                        >
                    </div>

                    <div class="q-mr-md">
                        <a
                            class="cursor-pointer text-h7"
                            :href="`${$store.getters.supportUrl}policy`"
                            >{{ $t("mainFooter.support.policy") }}</a
                        >
                    </div>
                     <div class="q-mr-md">
                        <a
                            class="cursor-pointer text-h7"
                            :href="`mailto:${$store.getters.inquiryMail}`"
                            >{{ $t("mainFooter.support.inquiry") }}</a
                        >
                    </div>
                    Copyright 2020. zempie. All rights reserved.
                </div>

                <div class="copyright"></div>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// import Language from "components/main/languages/language.vue";

@Component({ components: {} })
export default class MainFooter extends Vue {
    private lang: string = navigator.language;
    // private languages = { ko: "한국어", en: "ENGLISH" };
    private isActive: boolean = false;

    mounted() {
        if (this.lang.includes("ko-")) {
            (this.$refs["ko"] as HTMLElement).classList.add("active");
        } else if (this.lang.includes("en-")) {
            (this.$refs["en"] as HTMLElement).classList.add("active");
        }
    }

    selectLang(lang: string) {
        if (lang === "ko") {
            (this.$refs["ko"] as HTMLElement).classList.add("active");
            (this.$refs["en"] as HTMLElement).classList.remove("active");
        } else if (lang === "en") {
            (this.$refs["en"] as HTMLElement).classList.add("active");
            (this.$refs["ko"] as HTMLElement).classList.remove("active");
        }
        this.$i18n.locale = lang;
    }
}
</script>
<style lang="scss" scoped>
.footerTop {
    padding-top: 420px;
}

.mainFooter {
    position: absolute;
    bottom: 0;
    width: 100%;

    color: #959595;

    a {
        color: #959595;
        text-decoration: none;
    }

    .smallFont {
        font-size: 12px;
    }

    .company {
        font-size: 12px;
        color: #7697a1;
    }

    .copyright {
    }
}
.languages {
    float: right;
}
.footer-top {
    display: inline-block;
}
.language {
    cursor: pointer;
}
.language:hover {
    text-decoration: underline;
}
.language.active {
    color: #fff;
}
.hidden-btn{

}
</style>
