import Vue from "vue";

class Ads {
    static gtag_report_conversion(url?: Location) {
        var callback = function () {
            if (typeof (url) != 'undefined') {
                window.location = url;
            }
        };
        Vue.$gtag.event('conversion', {
            'send_to': 'AW-455806232/ImSrCMP0qP8BEJiarNkB',
            'event_callback': callback
        });
        return false;
    }
}

export default Ads;