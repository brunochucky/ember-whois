import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
    model(params) {
        
        // defaults
        var data = {
            json: true,
            domain: params.query
        };
        var json = null;

        // Query domain
        if (params.query) {
            var val = params.query;
            if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(val)) {
                json = $.getJSON('https://emancipa.com.br/whois/', data, function(data) {
                    window.data = data;
                    document.getElementById("info").innerHTML = data.whois;

                    if (data.status == 'available')
                        document.getElementById("info").innerHTML = 'This domain is currently ' + data.status + '.';
                });
            } else {
                document.getElementById("info").innerHTML = 'Invalid domain name.';
            }
        }
        
        
        // Export root url
        var rootURL = this.get('router.rootURL');

        return {
            json: json,
            rootURL: rootURL
        }
    }
});