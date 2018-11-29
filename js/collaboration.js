$(function() {
	if(chartId == "" || userId == "") {
		return
	}
	CLB.init()
});
var CLB = {
	clientId: null,
	isOffLine: false,
	saving: false,
	collaClient: null,
	collaItv: null,
	collaUsers: null,
	collaUserCount: 1,
	collaCount: 1,
	collaPollTimeSingle: 8000,
	collaPollTime: 2000,
	baseUrl: "https://cb.processon.com/",
	versionSaveTime: 120000,
	versionNow: 0,
	version: 0,
	init: function() {
		var d = Math.random();
		var b = (d + new Date().getTime());
		this.clientId = b.toString(16).replace(".", "");
		var c = this,
			a = "";
		var e = sessionStorage.getItem("flowclient_" + chartId);
		if(e == null || e == "") {
			a = new Date().valueOf();
			sessionStorage.setItem("flowclient_" + chartId, a)
		} else {
			a = e
		}
		$.ajax({
			url: "/diagraming/listen",
			type: "post",
			data: {
				subject: chartId,
				client: a
			},
			success: function(f) {
				c.collaUsers = f.users;
				c.collaClient = a;
				c.collaUk = f.uk;
				c.collaItv = null;
				if(c.collaUsers != null && c.collaUsers.length > 1) {
					c.collaItv = window.setInterval(c.poll, c.collaPollTime)
				} else {
					c.collaItv = window.setInterval(c.poll, c.collaPollTimeSingle)
				}
			},
			error: function() {
				console.log("请求失败");
			}
		});
		window.onbeforeunload = function(f) {
			if(c.isOffLine) {
				return "当前处于离线模式，退出前请保存"
			}
			c.stop(false)
		};
		window.setInterval(function() {
			if(c.version != c.versionNow) {
				c.versionNow = c.version;
				CLB.saveVersion()
			}
		}, CLB.versionSaveTime)
	},
	saveVersion: function(b) {
		var d = userName;
		var a = JSON.stringify(Model.define),
			c = "自动存储";
		if(b != null && b != "") {
			c = b
		}
		$.ajax({
			url: "/diagraming/add_version",
			data: {
				chartId: chartId,
				userId: userId,
				fullName: d,
				def: a,
				remark: c,
				ignore: "def"
			},
			type: "post",
			success: function(e) {
				Dock.loadHistorys();
				$("#history_remark").val("");
				$("#btn_history_clear").button("disable")
			}
		})
	},
	poll: function() {
		var c = CLB;
		c.collaCount++;
		if(c.collaCount > 4000) {
			c.stop();
			return
		}
		var a = c.collaClient,
			b = c.collaUk;
		$.getJSON(c.baseUrl + "diagraming/poll", {
			subject: chartId,
			client: a,
			uk: b
		}, function(g) {
			var h = g.users;
			if(h == null) {
				return
			}
			if(h.length > 1 && c.collaUsers.length != h.length) {
				window.clearInterval(c.collaItv);
				c.collaItv = null;
				c.collaItv = window.setInterval(c.poll, c.collaPollTime)
			} else {
				if(h.length == 1) {
					window.clearInterval(c.collaItv);
					c.collaItv = null;
					c.collaItv = window.setInterval(c.poll, c.collaPollTimeSingle)
				}
			}
			c.collaUsers = h;
			c.collaUserCount = h.length;
			c.manageOnlineUsers(h);
			var f = g.msgs;
			for(var e = 0; e < f.length; e++) {
				var d = JSON.parse(f[e]);
				if(d.client == a) {
					continue
				}
				c.onMessage(d.msg)
			}
		})
	},
	stop: function(d) {
		var c = this;
		var a = c.collaClient,
			b = c.collaUk;
		window.clearInterval(c.collaItv);
		c.collaUserCount--;
		c.collaCount = 1;
		if(d == null) {
			c.renderOff()
		}
		$.ajax({
			url: "/diagraming/stop",
			type: "post",
			cache: false,
			data: {
				subject: chartId,
				client: a,
				uk: b
			},
			success: function(e) {},
			error: function() {}
		})
	},
	renderOff: function() {
		var b = this;
		if($("#stop_listen_tip").length) {
			return
		}
		var a = '<div id="stop_listen_tip"><div style="font-size:17px;margin-top:40px;color:#999;font-size:16px;">温馨提示</div><div style="font-size:16px;margin-top:58px;color:#666;">由于您长时间未编辑图形<br><br>系统已自动为您存储历史版本并暂停了作图</div><div style="color:#666;font-size:16px;margin-top:40px;">点击 <a style="color:#63abf7;cursor:pointer" onclick="location.reload();">恢复</a></div></div>';
		if(b.isOffLine) {
			a = '<div id="stop_listen_tip"><div style="font-size:17px;margin-top:40px;color:#999;font-size:16px;">温馨提示</div><div style="font-size:16px;margin-top:58px;color:#666;">多人协作时，为了防止丢失图形，禁止使用离线模式</div><div style="font-size:16px;margin-top:8px;color:#666;">请确保网络恢复后刷新页面</div><div style="color:#666;font-size:16px;margin-top:40px;">点击 <a style="color:#63abf7;cursor:pointer" onclick="location.reload();">刷新页面</a></div></div>'
		}
		$(a).appendTo("body").show();
		$.mask()
	},
	sending: false,
	mess: [],
	tempMess: [],
	send: function(e) {
		var d = this;
		d.collaCount = 0;
		d.version++;
		if(d.isOffLine) {
			$("#saving_tip").text("");
			d.saveLocal();
			return
		}
		if(d.sending) {
			d.tempMess = d.tempMess.concat(e);
			return
		}
		d.sending = true;
		var c = d.collaUk;
		var a = d.collaClient;
		d.mess = d.tempMess.concat(e);
		var b = JSON.stringify(this.mess);
		d.tempMess = [];
		$("#saving_tip").text("正在保存...");
		$.ajax({
			url: "/diagraming/msg",
			data: {
				msgStr: b,
				ignore: "msgStr",
				chartId: chartId,
				uk: c,
				client: a
			},
			cache: false,
			type: "post",
			success: function(f) {
				if(f.error == "error") {
					d.onError()
				} else {
					d.sending = false;
					d.mess = [];
					$("#saving_tip").text("所有更改已保存");
					localStorage.setItem("version_local_" + chartId, (f.version || 1))
				}
			},
			error: function(f) {
				d.onError()
			}
		})
	},
	onError: function() {
		var d = this;
		d.sending = false;
		d.mess = [];
		d.isOffLine = true;
		d.saveLocal();
		if(d.collaUserCount > 1) {
			var b = {};
			for(var c = 0; c < d.collaUsers.length; c++) {
				var a = d.collaUsers[c];
				b[a.userId] = a
			}
			if(Object.keys(b).length > 1) {
				d.stop()
			} else {
				d.stop(false)
			}
			return
		} else {
			d.stop(false)
		}
		Util.loading({
			content: "保存失败，已切换到离线模式，您可以继续编辑并手动保存",
			show: 4000,
			model: false
		})
	},
	sendErrorCount: 0,
	localSaveCount: 0,
	saveLocal: function(b) {
		localStorage.setItem("def_" + chartId, JSON.stringify(Model.define));
		var a = localStorage.getItem("version_local_" + chartId);
		if(a == null || a == "") {
			a = 1
		}
		localStorage.setItem("version_local_" + chartId, parseInt(a) + 1);
		setTimeout(function() {
			$("#saving_tip").html("<span>已保存到本地<a title='保存到线上' onclick='CLB.saveOnline()'>保存</a></span>")
		}, 100)
	},
	saveOnline: function() {
		var b = this;
		if(b.saving) {
			return
		}
		b.saving = true;
		var d = localStorage.getItem("def_" + chartId);
		if(d == null || $.trim(d) == "") {
			Util.loading({
				content: "未发现本地数据，请编辑一个图形后，再次尝试",
				show: 3000,
				model: false
			});
			return
		}
		var c = Object.keys(Model.define.elements).length;
		var a = localStorage.getItem("version_local_" + chartId);
		if(isNaN(a)) {
			a = c
		}
		Util.loading({
			content: "正在保存到云端......",
			show: true,
			model: false
		});
		$.ajax({
			url: "/diagraming/saveonline",
			type: "post",
			cache: false,
			data: {
				id: chartId,
				def: d,
				shapecount: c,
				version: a,
				ignore: "def"
			},
			success: function(e) {
				b.saving = false;
				if(e.error == "error") {
					Util.loading({
						content: "保存失败，请网络恢复后或者稍后再次尝试",
						show: 3000,
						model: false
					});
					return
				}
				localStorage.removeItem("def_" + chartId);
				localStorage.removeItem("version_local_" + chartId);
				$("#saving_tip").text("所有更改已保存");
				b.isOffLine = false;
				Util.loading({
					content: "保存成功，已退出离线模式",
					show: 3000,
					model: false
				});
				b.init()
			},
			error: function() {
				Util.loading({
					content: "保存失败，请网络恢复后或者稍后再次尝试",
					show: 3000,
					model: false
				});
				b.saving = false
			}
		})
	},
	sendDirectly: function(b, e) {
		var d = {
			userId: userId,
			subject: chartId
		};
		var c = $.extend(d, b);
		var a = JSON.stringify(c);
		$.ajax({
			url: "/diagraming/msg_directly",
			data: {
				msgStr: a,
				ignore: "msgStr",
				chartId: chartId
			},
			cache: false,
			type: "post",
			success: function(f) {
				if(e) {
					e(f)
				}
			}
		})
	},
	onMessage: function(b) {
		for(var a = 0; a < b.length; a++) {
			var d = b[a];
			var c = d.action;
			if(c == "join") {
				if($("#chat_user_" + d.userId).length == 0) {
					$("#collaborators").append("<img id='chat_user_" + d.userId + "' src='" + d.photoUrl + "' class='' title='" + d.name + "'/>")
				}
			} else {
				if(c == "leave") {
					$("#chat_user_" + d.userId).remove()
				} else {
					if(c == "changeTitle") {
						$(".diagram_title").text(d.title)
					} else {
						if(c == "chat") {
							this.appendChatMsg(d.name, d.message, true)
						} else {
							if(c == "changeSchema") {
								if(d.categories == "") {
									Designer.setSchema([])
								} else {
									Designer.setSchema(d.categories.split(","))
								}
							} else {
								if(c == "command") {
									MessageSource.receive(d.messages)
								} else {
									if(c == "addHistory") {
										Dock.loadHistorys()
									}
								}
							}
						}
					}
				}
			}
		}
	},
	findLocal: function() {
		var a = false;
		return a
	},
	removeLocal: function() {
		localStorage.removeItem("def_local_" + chartId);
		localStorage.removeItem("title_local_" + chartId);
		localStorage.removeItem("version_local_" + chartId)
	},
	manageOnlineUsers: function(b) {
		$("#collaborators").children().attr("class", "");
		for(var d = 0; d < b.length; d++) {
			var a = JSON.parse(b[d]);
			if($("#chat_user_" + a.userId).length == 0) {
				var c = "https://accounts.processon.com/photo/" + a.userId + ".png";
				$("#collaborators").append("<img id='chat_user_" + a.userId + "' src='" + c + "' title='" + a.name + "' title_pos='top'/>")
			}
			$("#chat_user_" + a.userId).attr("class", "online")
		}
		$("#collaborators").children("img[class!=online]").remove()
	},
	setConfig: function(b, a) {
		$.ajax({
			url: "/diagraming/config",
			data: {
				field: b,
				value: a
			},
			cache: false,
			type: "post",
			success: function() {}
		})
	}
};