/* ==========================================================================
   CROSSWAVE — Site configuration
   Edit the values below once official details are confirmed.
   Nothing here is invented: empty values keep the related feature inactive.
   ========================================================================== */
window.CW_CONFIG = {

    /* ---- Enquiry forms ------------------------------------------------------
       URL that receives form submissions as a POST (multipart/form-data) and
       answers with a 2xx status on success. Works out of the box with form
       services such as Formspree ("https://formspree.io/f/xxxxxxx"), Getform,
       Basin, or your own server script.
       While this is empty, forms validate input but clearly tell the visitor
       that online submission is not yet active — no fake success message. */
    formEndpoint: "",

    /* ---- Social media -------------------------------------------------------
       Add the official profile URLs. Icons stay greyed-out and unlinked until
       a URL is supplied. */
    social: {
        facebook: "",
        instagram: "",
        linkedin: "",
        x: ""
    },

    /* ---- Google Maps --------------------------------------------------------
       Paste the "src" URL from Google Maps > Share > Embed a map once the
       official address is confirmed. Leave empty to show the placeholder. */
    mapEmbedUrl: "https://maps.google.com/maps?q=C67%2C%20Ikota%20Shopping%20Complex%2C%20VGC%2C%20Lekki-Ajah%2C%20Lagos&z=16&output=embed",

    /* ---- Dedicated service landing pages ------------------------------------
       Set a value to true once the matching page exists in /services/.
       Every card, CTA and menu link marked with data-landing="<key>" will then
       point to the dedicated page instead of the services directory. */
    landingPages: {
        "nafdac-regulatory": false,        // services/nafdac-regulatory.html
        "pr-media-communication": false,   // services/pr-media-communication.html
        "fashion-modeling-talent": false   // services/fashion-modeling-talent.html
    }
};
