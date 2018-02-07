/* This is stub file for gapi.client.{{=it.name}} definition tests */
/* IMPORTANT.
* This file was automatically generated by https://github.com/Bolisov/google-api-typings-generator. Please do not edit it manually.
* In case of any problems please post issue to https://github.com/Bolisov/google-api-typings-generator
**/
gapi.load('client', () => {
    /** now we can use gapi.client */
    gapi.client.load('firebasedynamiclinks', 'v1', () => {
        /** now we can use gapi.client.firebasedynamiclinks */

        /** don't forget to authenticate your client before sending any request to resources: */
        /** declare client_id registered in Google Developers Console */
        const client_id = '<<PUT YOUR CLIENT ID HERE>>';
        const scope = [
            /** View and administer all your Firebase data and settings */
            'https://www.googleapis.com/auth/firebase',
        ];
        const immediate = true;
        gapi.auth.authorize({ client_id, scope, immediate }, authResult => {
            if (authResult && !authResult.error) {
                /** handle succesfull authorization */
                run();
            } else {
                /** handle authorization error */
            }
        });
        run();
    });

    async function run() {
        /**
         * Creates a short Dynamic Link given either a valid long Dynamic Link or
         * details such as Dynamic Link domain, Android and iOS app information.
         * The created short Dynamic Link will not expire.
         *
         * Repeated calls with the same long Dynamic Link or Dynamic Link information
         * will produce the same short Dynamic Link.
         *
         * The Dynamic Link domain in the request must be owned by requester's
         * Firebase project.
         */
        await gapi.client.shortLinks.create({
        });
        /**
         * Fetches analytics stats of a short Dynamic Link for a given
         * duration. Metrics include number of clicks, redirects, installs,
         * app first opens, and app reopens.
         */
        await gapi.client.v1.getLinkStats({
            durationDays: "durationDays",
            dynamicLink: "dynamicLink",
        });
        /** Get iOS strong/weak-match info for post-install attribution. */
        await gapi.client.v1.installAttribution({
        });
    }
});
