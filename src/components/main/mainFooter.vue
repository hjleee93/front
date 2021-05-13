<template>
    <div>
        <div class="footerTop">
        </div>
        <footer class="mainFooter bgColor-0 q-mt-lg q-pb-lg">
            <div class="maxWidth text-left q-px-md">
                <div class="q-mt-xl">
                    <tr>
                        <td class='q-pr-xl text-weight-bold'>DEVELOPER</td>
                        <td><a :href="`${$store.getters.developerWiki}`" target="_black" >개발자 위키</a></td>
                    </tr>
                     <tr>
                        <td class="q-pt-sm text-weight-bold">SNS</td>
                        <td><q-img src="img/instagram_logo.png" width="60%"/></td>
                    </tr>                    
            
                </div>
                 <q-separator class="q-my-xl " />
                <div class="company q-mb-md">
                    <div>{{ $t('mainFooter.company.data1') }}</div>
                    <div>{{ $t('mainFooter.company.data2') }}</div>
                    <div>{{ $t('mainFooter.company.data3') }}</div>
                    <div>{{ $t('mainFooter.company.data4') }}</div>
<!--                    <div>전화 : 02-0000-0000</div>-->
<!--                    <div>E-Mail : help@fromthred.com</div>-->
<!--                    <div>SNS : @zempie_help</div>-->
                </div>
                
 <div class="row">
     <div class="q-mr-md">
                        <a class="text-h7" :href="$store.getters.supportUrl">
                            {{ $t('mainFooter.support.home') }}
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
                        <div class="q-mr-md"><a class="cursor-pointer text-h7" :href="`${$store.getters.supportUrl}tos`">{{ $t('mainFooter.support.tos') }}</a></div>
                        
                        <div class="q-mr-md"><a class="cursor-pointer text-h7" :href="`${$store.getters.supportUrl}policy`">{{ $t('mainFooter.support.policy') }}</a></div>
                    Copyright 2020. zempie. All rights reserved.
                    </div>
                
                <div class="copyright">
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
