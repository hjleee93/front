<template>
    <div>
        <div class="footerTop">
        </div>
        <footer class="mainFooter bgColor-0 q-mt-lg q-pb-lg">
            <div class="maxWidth text-left q-px-md">
                <div class="q-pt-xl q-mb-xl">
                    <div class="text-h7 text-weight-bold row q-mb-md cursor-pointer">
                        <a class="text-h7" :href="$store.getters.supportUrl">
                            {{ $t('mainFooter.support.home') }}
                        </a>
                    </div>
                    <div class="row">
                        <div class="q-mr-md"><a class="cursor-pointer smallFont" :href="`${$store.getters.supportUrl}notice`">{{ $t('mainFooter.support.notice') }}</a></div>
                        <q-separator vertical class="q-mr-md"></q-separator>
<!--                        <div class="q-mr-md"><a class="cursor-pointer" >이벤트</a></div>-->
<!--                        <q-separator vertical class="q-mr-md"></q-separator>-->
                        <div class="q-mr-md"><a class="cursor-pointer smallFont" :href="`${$store.getters.supportUrl}faq`">{{ $t('mainFooter.support.faq') }}</a></div>
                        <q-separator vertical class="q-mr-md"></q-separator>
                        <div class="q-mr-md"><a class="cursor-pointer smallFont" :href="`${$store.getters.supportUrl}inquiry`">{{ $t('mainFooter.support.inquiry') }}</a></div>
                        <q-separator vertical class="q-mr-md"></q-separator>
                        <div class="q-mr-md"><a class="cursor-pointer smallFont" :href="`${$store.getters.supportUrl}guide`">{{ $t('mainFooter.support.guide') }}</a></div>
                        <q-separator vertical class="q-mr-md"></q-separator>
                        <div class="q-mr-md"><a class="cursor-pointer smallFont" :href="`${$store.getters.supportUrl}tos`">{{ $t('mainFooter.support.tos') }}</a></div>
                        <q-separator vertical class="q-mr-md"></q-separator>
                        <div class="q-mr-md"><a class="cursor-pointer smallFont" :href="`${$store.getters.supportUrl}policy`">{{ $t('mainFooter.support.policy') }}</a></div>
                    </div>
                </div>
                <div class="company q-mb-xl">
                    <div>{{ $t('mainFooter.company.data1') }}</div>
                    <div>{{ $t('mainFooter.company.data2') }}</div>
                    <div>{{ $t('mainFooter.company.data3') }}</div>
                    <div>{{ $t('mainFooter.company.data4') }}</div>
<!--                    <div>전화 : 02-0000-0000</div>-->
<!--                    <div>E-Mail : help@fromthred.com</div>-->
<!--                    <div>SNS : @zempie_help</div>-->
                </div>
                <div class="copyright">
                    Copyright 2020. zempie. All rights reserved.
                </div>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class MainFooter extends Vue {
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
            color: #7697A1;
        }

        .copyright {
        }
    }
</style>
