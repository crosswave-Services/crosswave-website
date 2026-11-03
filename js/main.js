/* ==========================================================================
   CROSSWAVE — Site behaviour
   Requires: jQuery, Bootstrap 5 bundle, WOW.js, jQuery Easing, js/config.js
   ========================================================================== */
(function ($) {
    "use strict";

    var config = window.CW_CONFIG || {};
    var root = document.body.getAttribute("data-root") || "";

    /* ---- Scroll animations ---------------------------------------------- */
    if (typeof WOW === "function") {
        new WOW({ offset: 40, mobile: true }).init();
    }

    /* ---- Sticky header shadow + back-to-top ----------------------------- */
    var $header = $(".site-header");
    var $toTop = $(".back-to-top");
    function onScroll() {
        var y = $(window).scrollTop();
        $header.toggleClass("is-scrolled", y > 10);
        $toTop.toggleClass("show", y > 400);
    }
    $(window).on("scroll", onScroll);
    onScroll();

    $toTop.on("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        var target = document.getElementById("main");
        if (target) { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
    });

    /* ---- Dropdown on hover (desktop only) ------------------------------- */
    var desktop = window.matchMedia("(min-width: 992px)");
    function bindHover() {
        var $dd = $(".site-header .dropdown");
        $dd.off("mouseenter.cw mouseleave.cw");
        if (!desktop.matches) { return; }
        $dd.on("mouseenter.cw", function () {
            $(this).addClass("show").find(".dropdown-toggle").attr("aria-expanded", "true").end()
                .find(".dropdown-menu").addClass("show");
        }).on("mouseleave.cw", function () {
            $(this).removeClass("show").find(".dropdown-toggle").attr("aria-expanded", "false").end()
                .find(".dropdown-menu").removeClass("show");
        });
    }
    bindHover();
    if (desktop.addEventListener) { desktop.addEventListener("change", bindHover); }

    // On desktop the "Our Services" label itself navigates to the services page
    $(".site-header .dropdown-toggle[data-href]").on("click", function (e) {
        if (desktop.matches) {
            e.preventDefault();
            window.location.href = $(this).data("href");
        }
    });

    // Close the mobile menu after choosing an in-page link
    $(".site-header .navbar-collapse a[href*='#']").on("click", function () {
        var el = document.getElementById("navbarCollapse");
        if (el && el.classList.contains("show") && window.bootstrap) {
            bootstrap.Collapse.getOrCreateInstance(el).hide();
        }
    });

    /* ---- Current year ---------------------------------------------------- */
    $("[data-year]").text(new Date().getFullYear());

    /* ---- Landing page routing (future /services/ pages) ------------------ */
    var landing = config.landingPages || {};
    $("[data-landing]").each(function () {
        var key = $(this).data("landing");
        if (landing[key] === true) {
            $(this).attr("href", root + "services/" + key + ".html");
        }
    });

    /* ---- Social links: activate only when URLs are configured ------------ */
    var social = config.social || {};
    $("[data-social]").each(function () {
        var key = $(this).data("social");
        var url = social[key];
        if (url) {
            var $a = $("<a>", {
                href: url, target: "_blank", rel: "noopener",
                "aria-label": $(this).attr("data-label"), title: $(this).attr("data-label"),
                html: $(this).html()
            });
            $(this).replaceWith($a);
        }
    });

    /* ---- Google Map embed ------------------------------------------------ */
    if (config.mapEmbedUrl) {
        $("[data-map]").each(function () {
            $(this).removeClass("map-placeholder").addClass("map-embed").html(
                $("<iframe>", {
                    src: config.mapEmbedUrl, loading: "lazy", allowfullscreen: "",
                    referrerpolicy: "no-referrer-when-downgrade", title: "CROSSWAVE office location map"
                })
            );
        });
    }

    /* ---- Services page: highlight current section in sub-navigation ----- */
    var $subLinks = $(".service-nav .nav-link");
    if ($subLinks.length && "IntersectionObserver" in window) {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    $subLinks.removeClass("active")
                        .filter("[href='#" + entry.target.id + "']").addClass("active");
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        $subLinks.each(function () {
            var target = document.querySelector($(this).attr("href"));
            if (target) { obs.observe(target); }
        });
    }

    /* ---- Pre-select a service from ?service= in the URL ------------------ */
    var params = new URLSearchParams(window.location.search);
    var preset = params.get("service");
    if (preset) {
        $("select[name='service']").each(function () {
            var $opt = $(this).find("option[data-key='" + preset + "']");
            if ($opt.length) { $(this).val($opt.val()); }
        });
    }

    /* ---- Enquiry forms ---------------------------------------------------
       Validates required fields, then submits to CW_CONFIG.formEndpoint.
       Feedback is always truthful: success is only shown when the endpoint
       confirms receipt. */
    function showStatus($form, type, message) {
        var icons = { success: "bi-check-circle-fill", error: "bi-exclamation-octagon-fill", info: "bi-info-circle-fill" };
        var $status = $form.find(".form-status");
        $status.removeClass("is-success is-error is-info")
            .addClass("show is-" + type)
            .attr("role", type === "error" ? "alert" : "status")
            .html('<i class="bi ' + icons[type] + '" aria-hidden="true"></i><span>' + message + "</span>");
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
