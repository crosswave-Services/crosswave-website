/* ==========================================================================
   CROSSWAVE — Site behaviour
   Template behaviour (spinner, WOW, sticky navbar, hover dropdowns,
   back-to-top, carousels) plus CROSSWAVE features (honest forms, social
   links, map, future landing pages).
   Requires: jQuery, Bootstrap 5 bundle, WOW.js, jQuery Easing,
   Owl Carousel, js/config.js
   ========================================================================== */
(function ($) {
    "use strict";

    var config = window.CW_CONFIG || {};
    var root = document.body.getAttribute("data-root") || "";

    // Spinner
    setTimeout(function () {
        $("#spinner").removeClass("show");
    }, 1);

    // Initiate WOW.js
    if (typeof WOW === "function") {
        new WOW().init();
    }

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $(".nav-bar").addClass("sticky-top shadow");
        } else {
            $(".nav-bar").removeClass("sticky-top shadow");
        }
    });

    // Dropdown on mouse hover (desktop)
    var $dropdown = $(".navbar .dropdown");
    var desktop = window.matchMedia("(min-width: 992px)");
    function bindHover() {
        $dropdown.off("mouseenter.cw mouseleave.cw");
        if (!desktop.matches) { return; }
        $dropdown.on("mouseenter.cw", function () {
            $(this).addClass("show").find(".dropdown-toggle").attr("aria-expanded", "true").end()
                .find(".dropdown-menu").addClass("show");
        }).on("mouseleave.cw", function () {
            $(this).removeClass("show").find(".dropdown-toggle").attr("aria-expanded", "false").end()
                .find(".dropdown-menu").removeClass("show");
        });
    }
    bindHover();
    if (desktop.addEventListener) { desktop.addEventListener("change", bindHover); }

    // On desktop, clicking "Our Services" opens the services page
    $(".navbar .dropdown-toggle[data-href]").on("click", function (e) {
        if (desktop.matches) {
            e.preventDefault();
            window.location.href = $(this).data("href");
        }
    });

    // Close the mobile menu after choosing an in-page link
    $(".navbar-collapse a[href*='#']").on("click", function () {
        var el = document.getElementById("navbarCollapse");
        if (el && el.classList.contains("show") && window.bootstrap) {
            bootstrap.Collapse.getOrCreateInstance(el).hide();
        }
    });

    // Back to top button
    $(window).scroll(function () {
        $(".back-to-top").toggleClass("show", $(this).scrollTop() > 300);
    });
    $(".back-to-top").click(function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return false;
    });

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left" aria-hidden="true"></i>',
            '<i class="bi bi-chevron-right" aria-hidden="true"></i>'
        ]
    });

    // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        margin: 25,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 2 },
            992: { items: 2 },
            1200: { items: 3 }
        }
    });

    // Testimonial-style carousel (client experience standards)
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left" aria-hidden="true"></i>',
            '<i class="bi bi-arrow-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

    // Current year
    $("[data-year]").text(new Date().getFullYear());

    // Future dedicated service landing pages (enable in js/config.js)
    var landing = config.landingPages || {};
    $("[data-landing]").each(function () {
        var key = $(this).data("landing");
        if (landing[key] === true) {
            $(this).attr("href", root + "services/" + key + ".html");
        }
    });

    // Social links: activate only when official URLs are configured
    var social = config.social || {};
    $("[data-social]").each(function () {
        var url = social[$(this).data("social")];
        if (url) {
            $(this).replaceWith($("<a>", {
                href: url, target: "_blank", rel: "noopener",
                "class": $(this).attr("class").replace("is-pending", "").trim(),
                "aria-label": $(this).attr("data-label"), title: $(this).attr("data-label"),
                html: $(this).html()
            }));
        }
    });

    // Google Map embed (configure CW_CONFIG.mapEmbedUrl)
    if (config.mapEmbedUrl) {
        $("[data-map]").each(function () {
            $(this).removeClass("map-placeholder d-flex p-4").addClass("map-embed").removeAttr("style").html(
                $("<iframe>", {
                    src: config.mapEmbedUrl, loading: "lazy", allowfullscreen: "",
                    referrerpolicy: "no-referrer-when-downgrade", title: "CROSSWAVE office location map"
                })
            );
        });
    }

    // Pre-select a service from ?service= in the URL
    var preset = new URLSearchParams(window.location.search).get("service");
    if (preset) {
        $("select[name='service']").each(function () {
            var $opt = $(this).find("option[data-key='" + preset + "']");
            if ($opt.length) { $(this).val($opt.val()); }
        });
    }

    /* Enquiry forms -------------------------------------------------------
       Validates required fields, then submits to CW_CONFIG.formEndpoint.
       Success is only shown when the endpoint confirms receipt. */
    function showStatus($form, type, message) {
        var icons = { success: "fa-check-circle", error: "fa-exclamation-circle", info: "fa-info-circle" };
        var $status = $form.find(".form-status");
        $status.removeClass("is-success is-error is-info")
            .addClass("show is-" + type)
            .attr("role", type === "error" ? "alert" : "status")
            .html('<i class="fa ' + icons[type] + ' mt-1" aria-hidden="true"></i><span>' + message + "</span>");
        $status[0].scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    $("form[data-cw-form]").each(function () {
        var form = this;
        var $form = $(form);
        var $btn = $form.find("[type=submit]");
        var btnHtml = $btn.html();

        $form.on("submit", function (e) {
            e.preventDefault();
            form.classList.add("was-validated");

            if (!form.checkValidity()) {
                var firstInvalid = form.querySelector(":invalid");
                if (firstInvalid) { firstInvalid.focus(); }
                showStatus($form, "error", "Please complete the highlighted fields before submitting.");
                return;
            }

            // Spam trap: real visitors never fill this hidden field
            if ($form.find(".hp-field input").val()) { return; }

            if (!config.formEndpoint) {
                showStatus($form, "info",
                    "Thank you for your interest. Online enquiries are not yet connected, so <strong>your message has not been sent</strong>. " +
                    "Please contact CROSSWAVE directly using the official contact details on our Contact page.");
                return;
            }

            $btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Sending…');

            fetch(config.formEndpoint, {
                method: "POST",
                body: new FormData(form),
                headers: { "Accept": "application/json" }
            }).then(function (res) {
                if (!res.ok) { throw new Error("HTTP " + res.status); }
                form.reset();
                form.classList.remove("was-validated");
                showStatus($form, "success",
                    "Thank you — your enquiry has been received. A member of the CROSSWAVE team will review it and respond using your preferred contact details.");
            }).catch(function () {
                showStatus($form, "error",
                    "Sorry, your enquiry could not be sent at this time. Please try again shortly or contact us directly using the details on our Contact page.");
            }).then(function () {
                $btn.prop("disabled", false).html(btnHtml);
            });
        });
    });

})(jQuery);
