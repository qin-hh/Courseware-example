var _testGLOBAL_;
var GLOBAL = {
	loadingAnimate: '<div class="loading"><span></span><span></span><span></span></div>',
	removeLoadingAnimate: function() {
		$(".content").children(".loading").remove()
	},
	verifyAccount: (function() {
		if (localStorage.getItem("account")) {
			return localStorage.getItem("account")
		} else {
			return ""
		}
	})(),
	verifyPassword: (function() {
		if (localStorage.getItem("accPwd")) {
			return localStorage.getItem("accPwd")
		} else {
			return ""
		}
	})(),
	userAccount: function() {
		return this.verifyAccount
	},
	userPassword: function() {
		return this.verifyPassword
	},
	currentWindowWidth: (function() {
		return window.innerWidth
	})(),
	allowCopy: true
};
var PR = new PrintMesg();

function PrintMesg() {
	this.msg = function(a) {
		console.log("%c" + a, 'color:#888888;font-size: 16px;font-family:"宋体",serif;')
	};
	this.err = function(a) {
		console.error("%c" + a, 'color:#dc100c;font-size: 20px;font-family:"华文行楷","微软雅黑",serif;')
	}
}
var lightColorCode = {
	mainObject: ["$", "JSON", "window", "document", "navigator", "console", "screen", "function", "location"],
	keywords: ["this", "var", "alert"],
	special: ["TagName", "ID", "AttributeName", "param", "params"]
};
$(function() {
	if (GLOBAL.userAccount() == "\u0061\u0075\u006c\u0065\u006e\u0063\u0065" && GLOBAL.userPassword() == "\u0068\u0074\u006d\u006c\u0035\u0077\u0065\u0062") {
		$(".logo").remove()
	} else {
		$("header .logo").fadeIn(3000)
	}
	newGuide();
	$.get("html-module/html.html", function(a) {
		$(".main .leftNav").html(a)
	});
	$.get("html-pages/html/html-welcome.html", function(a) {
		$(".main .content").html(a)
	});
	$("header nav li").click(function() {
		navChecked(this)
	});
	leftNavLoad();
	loadContentPage();
	$(".toggleDynamicAnchor").on("click", function() {
		var a = $("root[data-root] section").length != 0;
		if (a) {
			$(this).next(".dynamicAnchor").toggle(200)
		} else {
			$(this).next(".dynamicAnchor").hide(200)
		}
	});
	$(document).off("click", ".dynamicAnchor a").on("click", ".dynamicAnchor a", function(a) {
		animateScrollTarget(this, a)
	});
	$(".content,.dynamicAnchor").on("click", function() {
		$(".dynamicAnchor").hide(300)
	});
	$(".content").scroll(function() {
		toggleToTopButton();
		setAnthorAction()
	});
	$("a.toWinTop").on("click", function() {
		contentToTop()
	});
	loginVerify();
	$(document).keydown(function(a) {
		if (a.which === 67 && a.ctrlKey && !GLOBAL.allowCopy) {
			PR.err("\u5c3c\u739b\uff01\u4e0d\u8bb8\u590d\u5236\u4ee3\u7801");
			return false
		}
	});
	$(document).on("copy", function() {
		if (!GLOBAL.allowCopy) {
			PR.err("\u5c3c\u739b\uff01\u4e0d\u8bb8\u590d\u5236\u4ee3\u7801");
			return false
		}
	});
	$(window).resize(function() {
		GLOBAL.currentWindowWidth = (function() {
			return window.innerWidth
		})()
	})
});

function navChecked(c) {
	$(c).addClass("checked").siblings("li").removeClass("checked");
	var a = $(c).index();
	switch (a) {
	case 0:
		b("html-pages/html/html-welcome.html");
		break;
	case 1:
		b("html-pages/css/css-welcome.html");
		break;
	case 2:
		b("html-pages/javascript/js-welcome.html");
		break;
	case 3:
		b("html-pages/jquery/jq-welcome.html");
		break;
	case 4:
		b("html-pages/vuejs/vue-welcome.html");
		break;
	case 5:
		b("html-pages/angularjs/ng-welcome.html");
		break;
	case 6:
		b("html-pages/more/more-welcome.html");
		break;
	default:
		b("html-pages/html/html-welcome.html");
		break
	}
	function b(g) {
		$.get(g, function(l) {
			$(".content").html(GLOBAL.loadingAnimate);
			setTimeout(function() {
				$(".content").html(l)
			}, 10)
		});
		var f = location,
			i = f.origin,
			k = f.pathname;
		var j = g.substr(g.lastIndexOf("/") + 1),
			h = j.length,
			e = j.substr(j.indexOf(".")),
			d = "";
		if (e === ".php" || e === ".htm" || e === ".jsp" || e === ".asp" || e === ".pyc" || e === ".xml") {
			d = j.substr(0, h - 4)
		} else {
			if (e = ".html") {
				d = j.substr(0, h - 5)
			}
		}
		location.href = f.origin + f.pathname + "#" + d
	}
}
function leftNavLoad() {
	$("nav.topNav li").on("click", function() {
		var b = function(c) {
				$.get(c, function(e) {
					var f = $("nav.leftNav"),
						d = f.has("ul").length;
					if (d) {
						f.children("ul").remove()
					}
					f.html(e)
				})
			},
			a = $(this).index();
		switch (a) {
		case 0:
			b("html-module/html.html");
			break;
		case 1:
			b("html-module/css.html");
			break;
		case 2:
			b("html-module/javascript.html");
			break;
		case 3:
			b("html-module/jquery.html");
			break;
		case 4:
			b("html-module/vue.html");
			break;
		case 5:
			b("html-module/angularjs.html");
			break;
		case 6:
			b("html-module/more.html");
			break;
		default:
			b("html-module/more.html");
			break
		}
	})
}
function loadContentPage() {
	$(document).on("click", ".leftNav a", function(c) {
		var a = $(".content"),
			b = $(this).attr("href");
		if (b.indexOf("http://") !== -1) {
			return
		}
		c.preventDefault();
		a.html(GLOBAL.loadingAnimate);
		$(this).addClass("checked").parent("li").siblings("li").children("a").removeClass("checked");
		$.get(b, function(f) {
			GLOBAL.removeLoadingAnimate();
			a.html(f);
			var e = $(".dynamicAnchor ul"),
				n = $("root[data-root]").find("section"),
				l = n.length;
			e.html("");
			for (var j = 0; j < l; j++) {
				n.eq(j).children("h3").attr("id", "sec-" + j);
				var k = n.eq(j).children("h3").html();
				e.append('<li><a href="#sec-' + j + '">' + k + "</a></li>")
			}
			setColorTag();
			setCodeStyle("code.cmd", "color: #b132ff; font-weight: bold", ["html", "css", "javascript", "bootstrap", "jquery", "vue", "angular", "react", "gulp", "webpack", "babel"]);
			setIDEStyle_html("code.ideCode-html");
			setIDEStyle_css("code.ideCode-css");
			setIDEStyle_js("code.ideCode-js", lightColorCode);
			var m = $("div[data-complete-count]");
			m.attr("data-complete-count", "0");
			var h = $("iframe[data-iframe-coderun].codeEffect"),
				d = h.length;
			var g = setInterval(function() {
				var q = m.attr("data-complete-count");
				if (d == q) {
					for (var o = 0; o < d; o++) {
						var p = h.eq(o).contents().find("html").outerHeight();
						h.eq(o).css("height", (p + 26) + "px")
					}
					window.clearInterval(g)
				}
			}, 100)
		})
	})
}
function toggleToTopButton() {
	var c = $(".main[data-main]").children(".content"),
		a = c.scrollTop(),
		b = $("a.toWinTop");
	if (a > 500) {
		b.css("bottom", "6px")
	} else {
		b.css("bottom", "-48px")
	}
}
function contentToTop() {
	var a = $(".main[data-main]").children(".content");
	a.animate({
		scrollTop: "0"
	}, 600)
}
function animateScrollTarget(e, d) {
	d.preventDefault;
	var f = $(e).parent().index(),
		b = $("section h3").eq(f).offset().top,
		c = $("[data-main]").children(".content"),
		a = c.scrollTop();
	c.animate({
		scrollTop: (a + b) - 74 + "px"
	}, 600);
	$(e).addClass("active").parent().addClass("active").siblings("li").removeClass("active").children().removeClass("active")
}
function setAnthorAction() {
	var a = $("[data-root]").children("section"),
		b = a.length;
	for (var d = 0; d < b; d++) {
		var c = a.eq(d).offset().top;
		if (c < 300 && c > -74) {
			$(".dynamicAnchor li").eq(d).addClass("active");
			$(".dynamicAnchor li").eq(d).children("a").addClass("active");
			$(".dynamicAnchor li").eq(d).siblings("li").removeClass("active").children("a").removeClass("active");
			return
		}
	}
}
function newGuide() {
	if (localStorage.getItem("visitTimes")) {
		var c = parseInt(localStorage.getItem("visitTimes"));
		localStorage.setItem("visitTimes", c + 1)
	} else {
		localStorage.setItem("visitTimes", 0);
		$("body").append('<div class="firstNewGuide"></div><div class="maklayer-white"></div>')
	}
	var a = $(".firstNewGuide"),
		b = $(".maklayer-white");
	$(".leftNav").mouseenter(function() {
		a.css({
			"transition-duration": "1.6s",
			transform: "translate(2000px,-260px) rotate(720deg)",
			opacity: "0"
		});
		b.fadeOut(600);
		setTimeout(function() {
			a.remove();
			b.remove()
		}, 1600)
	})
}
function loginVerify() {
	var a = $("[data-leftLogin]");
	$("header .logo").click(function() {
		a.css({
			visibility: "visible",
			opacity: "1",
			left: "0"
		})
	});
	$("[data-leftLogin]").click(function() {
		a.css({
			visibility: "hidden",
			opacity: "0",
			left: "-180px"
		});
		$("body").append('<div class="maklayer-white allMask"></div><div class="loginBox"><div class="closeBox">×</div><h1>请输入您的登录信息</h1><form><div><label>账 号</label><input id="account" type="text" placeholder="请输入指定账号"></div><div><label>密 码</label><input id="accPwd" type="password" placeholder="请输入指定密码"></div><div class="errInfo"></div><div><button id="btnUserLogin" type="button">登 录</button></div></form></div>');
		var b = $(".loginBox");
		setTimeout(function() {
			b.css({
				visibility: "visible",
				transform: "scale(1)"
			})
		}, 60);
		$("#btnUserLogin").click(function() {
			var c = $("#account").val(),
				d = $("#accPwd").val();
			if (c == "\u0061\u0075\u006c\u0065\u006e\u0063\u0065" && d == "\u0068\u0074\u006d\u006c\u0035\u0077\u0065\u0062") {
				localStorage.setItem("account", "\u0061\u0075\u006c\u0065\u006e\u0063\u0065");
				localStorage.setItem("accPwd", "\u0068\u0074\u006d\u006c\u0035\u0077\u0065\u0062");
				b.children(".closeBox").trigger("click");
				shortTimeMessage("登录成功！");
				$(".logo").remove()
			} else {
				b.find(".errInfo").text("-_-! 您输入的账号或者密码错误");
				$("#account, #accPwd").blur()
			}
		});
		$(document).keydown(function(c) {
			var d = c.keyCode;
			if (d == 13) {
				$("#btnUserLogin").click()
			}
		});
		$("#account, #accPwd").focus(function() {
			b.find(".errInfo").text("")
		});
		b.children(".closeBox").click(function() {
			$(this).parent().css("transform", "scale(0)").prev(".maklayer-white").css("opacity", "0");
			setTimeout(function() {
				b.prev().remove();
				b.remove()
			}, 600)
		})
	})
}
function shortTimeMessage(d) {
	$("body").append('<div class="shortTimeMessage">' + d + "</div>");
	var a = $(".shortTimeMessage"),
		b = a.outerWidth(),
		c = a.outerHeight();
	a.css({
		"margin-left": -(b / 2) + "px",
		"margin-top": -(c / 2) + "px",
		opacity: "1"
	});
	setTimeout(function() {
		a.fadeOut(600, function() {
			$(this).remove()
		})
	}, 1600)
}
function setColorTag() {
	var e = $("root[data-root] color"),
		b = e.length;
	for (var c = 0; c < b; c++) {
		var d = e.eq(c),
			a = e.eq(c).text();
		d.css("color", a)
	}
}
function setCodeStyle(h, g, c) {
	var b = c,
		a = b.length;
	for (var e = 0; e < a; e++) {
		var d = b[e];
		var f;
		$(h).each(function(i, j) {
			var k = $(j).html();
			k = k.replace(new RegExp(d), "<span style='" + g + "'>" + d + "</span>");
			$(j).html(k)
		})
	}
}
function setIDEStyle_html(c) {
	var b = $(c),
		a = "";
	b.each(function(o, m) {
		a = $(m).html();
		a = a.replace(/</g, "&lt;");
		a = a.replace(/>/g, "&gt;");
		if (/=/.test(a)) {
			var h = a.match(/\w+\-?\w+=/g);
			var n = [];
			while (h.length) {
				var e = h.pop();
				if (n.indexOf(e) === -1) {
					n.push(e)
				}
			}
			var k = n.indexOf("style=");
			if (k !== -1) {
				n.splice(k, 1);
				n.unshift("style=")
			}
			for (var t = 0; t < n.length; t++) {
				a = a.replace(new RegExp(n[t], "g"), "<span style='color:#8bd12e'>" + n[t] + "</span>")
			}
			var v = a.match(/=<\/span>".+?"/gm);
			var x = [];
			while (v.length) {
				var q = v.pop();
				if (x.indexOf(q) === -1) {
					x.push(q)
				}
			}
			for (var t = 0; t < x.length; t++) {
				a = a.replace(new RegExp(x[t], "g"), "=</span><span style='color:#ece077'>" + x[t].slice(8) + "</span>")
			}
		}
		var w = a.match(/(&lt;\w+\s??|&lt;\/\w+)/gm);
		var y = [];
		while (w.length) {
			var p = w.pop();
			if (y.indexOf(p) === -1) {
				y.push(p)
			}
		}
		$.each(y, function(A, i) {
			a = a.replace(new RegExp(i, "gim"), "&lt;<span style='color:#ff6d6d'>" + i.slice(4) + "</span>")
		});
		var l = a.match(/&gt;.*?&lt;/gm);
		var g = [];
		while (l.length) {
			var u = l.pop();
			if (g.indexOf(u) === -1) {
				g.push(u)
			}
		}
		$.each(g, function(A, i) {
			a = a.replace(new RegExp(i, "gim"), "&gt;<span style='color:#eaeaea'>" + i.slice(4, i.lastIndexOf("&")) + "</span>&lt;")
		});
		var j = a.match(/&lt;\!\-\-\s?.+?\s?\-\-&gt;/gm);
		var f = [];
		if (j !== null) {
			while (j.length) {
				var s = j.pop();
				if (f.indexOf(s) === -1) {
					f.push(s)
				}
			}
			$.each(f, function(B, i) {
				var A;
				if (GLOBAL.currentWindowWidth <= 1000) {
					A = "1.4rem"
				} else {
					A = "1.5rem"
				}
				a = a.replace(new RegExp(i, "gim"), "<span style='color:#00ff7f;font-size:" + A + ";'>" + i + "</span>")
			})
		}
		var z = a.match(/\t/gm);
		var d = [];
		if (z !== null) {
			while (z.length) {
				var r = z.pop();
				if (d.indexOf(r) === -1) {
					d.push(r)
				}
			}
		}
		$.each(d, function(A, i) {
			a = a.replace(new RegExp(i, "gim"), "<span class='guides'></span>")
		});
		$(m).html(a)
	})
}
function setIDEStyle_js(f, e) {
	for (var c in e) {
		var b = e[c],
			a = b.length;
		for (var d = 0; d < a; d++) {
			$(f).each(function(g, i) {
				var j = $(i).html();
				var h = false;
				if (c === "mainObject") {
					if (e[c][d] === "$") {
						j = j.replace(new RegExp("\\$", "gim"), "<span style='color:#ff6d6d'>$</span>")
					} else {
						j = j.replace(new RegExp(e[c][d], "gm"), "<span style='color:#ff6d6d'>" + e[c][d] + "</span>")
					}
					h = true
				} else {
					if (c === "keywords") {
						if (/^\\/.test(e[c][d])) {
							j = j.replace(new RegExp(e[c][d], "gm"), "<span style='color:#ff3f77'>" + e[c][d].slice(1) + "</span>");
							h = true
						} else {
							j = j.replace(new RegExp(e[c][d], "gim"), "<span style='color:#ff3f77'>" + e[c][d] + "</span>");
							h = true
						}
					} else {
						if (c === "special") {
							j = j.replace(new RegExp(e[c][d], "gm"), "<span style='color:#b9ff00'>" + e[c][d] + "</span>");
							h = true
						}
					}
				}
				if (h) {
					$(i).html(j);
					h = false
				}
			})
		}
	}
	$(f).each(function(q, s) {
		var j = $(s).html();
		var k = /[\W][\s]\w+?(\s|\(|\{)[^\=]/gm;
		var h = j.match(k),
			m = h !== null ? h.length : 0;
		if (m === 0) {
			return
		}
		var p = [];
		while (h.length) {
			var g = h.pop();
			if (p.indexOf(g) === -1) {
				p.push(g)
			}
		}
		var n = p.length;
		for (var l = 0; l < n; l++) {
			var r = p[l];
			var o = p[l].slice(2, p[l].length - 2);
			j = j.replace(new RegExp(o, "ig"), "<span style='color:#ff3f77'>" + o + "</span>")
		}
		$(s).html(j)
	});
	$(f).each(function(i, k) {
		var l = $(k).html();
		var j = /(\|\|)/gm;
		l = l.replace(j, "<span style='color:#7ed8af'>||</span>");
		var h = /(&amp;&amp;)/gm;
		l = l.replace(h, "<span style='color:#7ed8af'>&&</span>");
		var g = /!/gm;
		l = l.replace(g, "<span style='color:#7ed8af'>!</span>");
		$(k).html(l)
	});
	$(f).each(function(o, q) {
		var k = $(q).html();
		var l = /(\W|,|\s)"[^"]*"(\s|\)|\,|\;|\:)/gm;
		var g = k.match(l),
			m = g !== null ? g.length : 0;
		if (m === 0) {
			return
		}
		for (var n = 0; n < m; n++) {
			var r = g[n];
			var j = r.lastIndexOf('"'),
				h = r.slice(j + 1),
				p = h.length;
			k = k.replace(g[n].slice(1), "<span style='color:#ece077'>" + g[n].slice(1, j + 1) + "</span>" + h)
		}
		$(q).html(k)
	});
	$(f).each(function(q, r) {
		var g = $(r).html();
		var h = /var<\/span>\s\w+/gm,
			n = g.match(h);
		var o;
		if (n !== null) {
			o = n.length
		} else {
			o = 0;
			return
		}
		var k = [];
		for (var p = 0; p < o; p++) {
			k.push(n[p].slice(n[p].lastIndexOf(" ") + 1))
		}
		var l = k.length;
		for (var m = 0; m < l; m++) {
			g = g.replace(new RegExp(k[m], "gm"), "<span style='color:#ee6aff'>" + k[m] + "</span>")
		}
		$(r).html(g)
	});
	$(f).each(function(p, r) {
		var j = $(r).html();
		var k = new RegExp("\\.\\w+(\\.|\\(|;){1}?", "g"),
			o = j.match(k),
			h;
		if (o !== null) {
			h = o.length
		} else {
			h = 0;
			return
		}
		for (var l = 0; l < h; l++) {
			var n = o[l];
			var g = n[0];
			var m = n[o[l].length - 1];
			var q = n.slice(1, o[l].length - 1);
			j = j.replace(new RegExp("\\" + g + q + "\\" + m, "g"), g + "<span style='color:#51ebff'>" + q + "</span>" + m)
		}
		$(r).html(j)
	});
	$(f).each(function(g, m) {
		var n = $(m).html();
		var k = new RegExp("[\\w\\-]+\\:\\s\\<", "gm"),
			j = n.match(k),
			l;
		if (j !== null) {
			l = j.length
		} else {
			l = 0;
			return
		}
		for (var h = 0; h < l; h++) {
			n = n.replace(j[h], "<span style='color: #aeb9ef;'>" + j[h].slice(0, j[h].length - 3) + "</span>: <")
		}
		$(m).html(n)
	});
	$(f).each(function(v, x) {
		var l = $(x).html();
		var m = new RegExp("(\\s|\\.)\\w+\\({1}?", "gm"),
			u = l.match(m),
			k;
		var t = new RegExp("\\.\\w+\\s??\\=", "gm"),
			q = l.match(t),
			n;
		if (u == null && q == null) {
			return
		}
		if (u == null) {
			k = 0
		} else {
			var h = [];
			while (u.length) {
				var s = u.pop();
				if (h.indexOf(s) === -1) {
					h.push(s)
				}
			}
			k = h.length
		}
		if (q == null) {
			n = 0
		} else {
			var g = [];
			while (q.length) {
				var r = q.pop();
				if (g.indexOf(r) === -1) {
					g.push(r)
				}
			}
			n = g.length
		}
		for (var p = 0; p < k; p++) {
			var w = h[p][0];
			l = l.replace(new RegExp(h[p].slice(0, h[p].length - 1) + "\\(", "g"), w + "<span style='color: #7086ff;'>" + h[p].slice(1, h[p].length - 1) + "</span>(")
		}
		for (var o = 0; o < n; o++) {
			l = l.replace(new RegExp(g[o], "g"), ".<span style='color: #51ebff;'>" + g[o].slice(1, g[o].length - 1) + "</span>=")
		}
		$(x).html(l)
	});
	$(f).each(function(g, m) {
		var o = $(m).html();
		var j = /(\/\/\s?[^\s]+\s?)|(\/\*(.|\s)*?\*\/)/gm,
			n = o.match(j);
		var l;
		if (n !== null) {
			l = n.length
		} else {
			l = 0;
			return
		}
		for (var h = 0; h < l; h++) {
			var k;
			if (GLOBAL.currentWindowWidth <= 1000) {
				k = "1.4rem"
			} else {
				k = "1.5rem"
			}
			o = o.replace(n[h], "<span style='color:#00ff7f;font-size:" + k + ";'>" + n[h] + "</span>")
		}
		$(m).html(o)
	});
	$(f).each(function(g, m) {
		var o = $(m).html();
		var l = /[^\-\#\w\:\u3000-\u9FFF\"](\d+|[1-9]\d*\.\d*|0\.\d*[1-9]\d*)/gm,
			j = o.match(l),
			n;
		if (j !== null) {
			n = j.length
		} else {
			n = 0;
			return
		}
		for (var k = 0; k < n; k++) {
			var h = j[k].slice(0, 1);
			o = o.replace(new RegExp("\\" + j[k], "gm"), h + "<span style='color:#fc8500'>" + j[k].slice(1) + "</span>")
		}
		$(m).html(o)
	});
	$(f).each(function(g, k) {
		var n = $(k).html();
		var j = /\t/gm;
		var l = n.match(j);
		var m;
		if (l !== null) {
			m = l.length
		} else {
			m = 0;
			return
		}
		for (var h = 0; h < m; h++) {
			n = n.replace(l[h], "<span class='guides'></span>")
		}
		$(k).html(n)
	})
}
function setIDEStyle_css(b) {
	var a = $(b);
	a.each(function(t, s) {
		var G = $(s).html();
		var I = /\/\*(.|\s)*?\*\//gm,
			v = G.match(I);
		if (v !== null) {
			var h = v.length;
			for (var D = 0; D < h; D++) {
				G = G.replace(v[D], "<span style='color:#00ff7f'>" + v[D] + "</span>")
			}
		}
		var q = /.+[^\{\n]*?\{/g,
			H = G.match(q),
			g = H.length;
		for (var C = 0; C < g; C++) {
			G = G.replace(H[C], "<span style='color:#9fe22e'>" + H[C].slice(0, H[C].length - 1) + "</span>{")
		}
		var e = /\t.+?\:/gm,
			n = G.match(e),
			z = n.length;
		for (var A = 0; A < z; A++) {
			G = G.replace(n[A], "\t<span style='color:#57c6e8'>" + n[A].slice(1, n[A].length - 1) + "</span>:")
		}
		var f = />\:\s?.+?;/gm,
			F = G.match(f),
			E = F.length;
		for (var y = 0; y < E; y++) {
			G = G.replace(F[y], ">:<span style='color:#a98cff'>" + F[y].slice(2, F[y].length - 1) + "</span>;")
		}
		var x = /[^\=]\".*?\"/g,
			d = G.match(x);
		if (d !== null) {
			var B = d.length;
			for (var u = 0; u < B; u++) {
				G = G.replace(d[u], "<span style='color:#f9f806;'>" + d[u] + "</span>")
			}
		}
		var c = /@\w+/g,
			r = G.match(c);
		if (r !== null) {
			var l = r.length;
			for (var w = 0; w < l; w++) {
				G = G.replace(r[w], "<span style='color:#f33188;'>" + r[w] + "</span>")
			}
		}
		$(s).html(G)
	})
};