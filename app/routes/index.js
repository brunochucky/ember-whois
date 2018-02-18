import Route from '@ember/routing/route';

export default Route.extend({
    model() {              
        
        // Export root url
        var rootURL = this.get('router.rootURL');

        return {
            rootURL: rootURL
        }
    }
});