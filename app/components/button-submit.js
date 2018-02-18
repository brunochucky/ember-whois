import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({

    actions: {
        submitForm() {



            // defaults
            var domain = $('input[name="query"]').val();
            var data = {
                json: true,
                domain: domain
            };
            var json = null;

            // Query domain
            if (domain) {
                if ($('.domain').length) {
                    $('.domain').remove();
                }

                $('#info').before('<h2 class="domain mt-5"><span class="fa fa-globe"></span> ' + domain + '</h2>');


                if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain)) {
                    json = $.getJSON('https://emancipa.com.br/whois/', data, function(data) {
                        window.data = data;
                        document.getElementById("info").innerHTML = data.whois;

                        if (data.status != 'unavailable')
                            document.getElementById("info").innerHTML = 'This domain is currently ' + data.status + '.';
                    });
                } else {
                    document.getElementById("info").innerHTML = 'Invalid domain name.';
                }
            }

            window.json = json;

        }
    }


});