<template>
    <div>
        <div class="footerTop">
        </div>
        <footer class="mainFooter bgColor-0 q-mt-lg q-pb-lg">
            <div class="maxWidth text-left q-px-md">
                <div class="q-pt-xl q-mb-xl">
                    <div class="text-h7 text-weight-bold row q-mb-md">
                        고객센터
                    </div>
                    <div class="row">
                        <div class="q-mr-md"><a href="#">공지사항</a></div>
                        <q-separator vertical></q-separator>
                        <div class="q-mx-md"><a href="#">이벤트</a></div>
                        <q-separator vertical></q-separator>
                        <div class="q-mx-md"><a href="#">FAQ</a></div>
                        <q-separator vertical></q-separator>
                        <div class="q-mx-md"><a href="#">1:1 문의</a></div>
                        <q-separator vertical></q-separator>
                        <div class="q-mx-md"><a href="#">스튜디오 가이드</a></div>
                        <q-separator vertical></q-separator>
                        <div class="q-mx-md"><a href="#">이용약관</a></div>
                        <q-separator vertical></q-separator>
                        <div class="q-mx-md"><a href="#">개인정보취급방침</a></div>
                    </div>
                </div>
                <div class="company q-mb-xl">
                    <div>(주)프롬더레드</div>
                    <div>대표자 : 서상욱</div>
                    <div>사업자번호 : 178-88-00617</div>
                    <div>주소 : 서울특별시 서대문구 충현동 북아현로 105, 3층</div>
                    <div>전화 : 02-0000-0000</div>
                    <div>E-Mail : help@fromthred.com</div>
                    <div>SNS : @zempie_help</div>
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
            font-size: 12px;
            text-decoration: none;
        }


        .company {
            font-size: 12px;
            color: #7697A1;
        }

        .copyright {
        }
    }
</style>
