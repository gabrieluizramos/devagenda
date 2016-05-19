"use strict";

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
        function t(t, e) {
            for (var i = 0; i < e.length; i++) {
                var a = e[i];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a)
            }
        }
        return function(e, i, a) {
            return i && t(e.prototype, i), a && t(e, a), e
        }
    }(),
    Default = function() {
        function t(e, i, a, n) {
            _classCallCheck(this, t), this.event = e, this.trigger = i, this.target = a, this.time = n, this.init()
        }
        return _createClass(t, [{
            key: "instance",
            get: function() {
                return this
            }
        }]), t
    }(),
    Dropdown = function(t) {
        function e() {
            return _classCallCheck(this, e), _possibleConstructorReturn(this, Object.getPrototypeOf(e).apply(this, arguments))
        }
        return _inherits(e, t), _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                $(t.trigger).unbind(t.event).bind(t.event, function() {
                    return "true" == $(this).attr("data-active") ? void $(this).attr("data-active", !1).next(t.target).slideToggle(t.time).attr("data-active", !1) : void $(this).attr("data-active", !0).next(t.target).slideToggle(t.time).attr("data-active", !0)
                })
            }
        }]), e
    }(Default),
    Slider = function(t) {
        function e() {
            return _classCallCheck(this, e), _possibleConstructorReturn(this, Object.getPrototypeOf(e).apply(this, arguments))
        }
        return _inherits(e, t), _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                $(t.trigger).unbind(t.event).bind(t.event, function() {
                    $(t.target).attr("data-active", !1).slideUp(t.time), $(t.trigger).attr("data-active", !1), $(t.target + ":nth-child(" + ($(this).index() + 1) + ")").slideDown(t.time).attr("data-active", !0), $(this).attr("data-active", !0)
                }), $(t.trigger + ":nth-child(1) ").trigger("click")
            }
        }]), e
    }(Default),
    Tabs = function(t) {
        function e() {
            return _classCallCheck(this, e), _possibleConstructorReturn(this, Object.getPrototypeOf(e).apply(this, arguments))
        }
        return _inherits(e, t), _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                $(t.trigger).unbind(t.event).bind(t.event, function() {
                    $(t.target).attr("data-active", !1).css("display", "none"), $(t.trigger).attr("data-active", !1), $(t.target + ":nth-of-type(" + ($(this).index() + 1) + ")").toggle(t.time).attr("data-active", !0), $(this).attr("data-active", !0)
                }), $(t.trigger + ":nth-child(1)").trigger("click")
            }
        }]), e
    }(Default),
    Accordion = function(t) {
        function e() {
            return _classCallCheck(this, e), _possibleConstructorReturn(this, Object.getPrototypeOf(e).apply(this, arguments))
        }
        return _inherits(e, t), _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                $(t.trigger).unbind(t.event).bind(t.event, function() {
                    return "true" == $(this).attr("data-active") ? ($(this).attr("data-active", !1), void $(this).next(t.target).slideToggle(t.time).attr("data-active", !1)) : ($(t.trigger + '[data-active="true"]').attr("data-active", !1).next(t.target).slideToggle(t.time).attr("data-active", !1), $(t.trigger).attr("data-active", !1), $(t.target).attr("data-active", !1), void $(this).attr("data-active", !0).next(t.target).slideToggle(t.time).attr("data-active", !0))
                }), $(t.target).css("display", "none")
            }
        }]), e
    }(Default),
    Modal = function(t) {
        function e(t, i, a, n) {
            var r;
            _classCallCheck(this, e);
            var o = _possibleConstructorReturn(this, Object.getPrototypeOf(e).call(this, t, i, a, n));
            return $(o.target).css({
                width: "100vw",
                height: "100vh",
                position: "fixed",
                background: "rgba(0, 0, 0, 0.8)",
                left: "0",
                top: "0",
                "z-index": "5000"
            }), $('[data-modal="content"').css({
                width: "80vw",
                height: "80vh",
                left: "0",
                right: "0",
                margin: "0 auto",
                top: "10vh",
                background: "#FFF",
                position: "absolute",
                padding: "10vh",
                color: "#000",
                "z-index": "10000",
                "font-size": "10vw",
                cursor: "default"
            }), r = o, _possibleConstructorReturn(o, r)
        }
        return _inherits(e, t), _createClass(e, [{
            key: "close",
            value: function() {
                $(this.target).fadeOut(this.time), $(this.trigger).attr("data-active", !1), $(this.target).attr("data-active", !1)
            }
        }, {
            key: "init",
            value: function() {
                var t = this;
                $(t.trigger).unbind(t.event).bind(t.event, function() {
                    $(this).attr("data-active", !0).nextAll(t.target).eq(0).fadeIn(t.time).attr("data-active", !0)
                }), $('[data-modal="close"]') && ($('[data-modal="close"]').css({
                    width: " 5vw",
                    height: " 5vh",
                    position: "absolute",
                    right: " 0",
                    top: " 0",
                    "line-height": " 5vh",
                    "text-align": " center",
                    "font-size": " 3vw",
                    color: "#FFF",
                    background: "#E85151",
                    cursor: "pointer"
                }), $('[data-modal="close"]').unbind("click").bind("click", function() {
                    t.close()
                })), $('[data-modal="outer"]') && ($('[data-modal="outer"').css({
                    width: "100vw",
                    height: "100vh",
                    position: "absolute",
                    cursor: "default"
                }), $('[data-modal="outer"]').unbind("click").bind("click", function() {
                    t.close()
                })), $(t.target).css("display", "none")
            }
        }]), e
    }(Default),
    Parallax = function() {
        function t(e, i, a) {
            _classCallCheck(this, t), this.element = e, this.xPos = i, this.dataAttr = a, this.init()
        }
        return _createClass(t, [{
            key: "init",
            value: function() {
                var t = this;
                t.xPos || (t.xPos = "50%"), t.dataAttr || (t.dataAttr = t.element), t.dataAttr = t.dataAttr.replace("[", "").replace("]", ""), $(t.element).each(function() {
                    $(this).css({
                        width: " 100%",
                        "max-width": "100%",
                        position: " relative",
                        "background-position": t.xPos + " 0",
                        "background-repeat": " no-repeat",
                        "background-attachment": " fixed"
                    });
                    var e = $(this);
                    $(window).scroll(function() {
                        var i = e.offset(),
                            a = -($(window).scrollTop() - i.top) / e.attr(t.dataAttr),
                            n = t.xPos + "" + a + "px";
                        e.css("background-position", n), $("[data-parallax-content]") && $("[data-parallax-content]").css({
                            "margin-top": -($(window).scrollTop() / 3) + "px",
                            opacity: 1 - $(window).scrollTop() / 480,
                            "text-shadow": "0px -" + $(window).scrollTop() / 3 + "px 10px"
                        })
                    })
                })
            }
        }]), t
    }(),
    Counter = function() {
        function t(e) {
            var i = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
                a = arguments[2],
                n = arguments[3];
            _classCallCheck(this, t), this.element = e, this.where = i, this.to = a, this.time = n, this.init()
        }
        return _createClass(t, [{
            key: "init",
            value: function() {
                var t = this,
                    e = setInterval(function() {
                        $(t.element).html(t.where), t.where == t.to && clearInterval(e), t.where++
                    }, t.time)
            }
        }]), t
    }();