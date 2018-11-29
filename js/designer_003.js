Designer.addFunction("open", function(definition) {
	if(definition == "") {
		return
	}
	if(typeof definition == "string") {
		eval("definition = " + definition)
	}
	$(".shape_box").remove();
	Model.define.elements = {};
	Model.persistence.elements = {};
	Model.define.page = definition.page;
	Model.persistence.page = Utils.copy(definition.page);
	Model.comments = definition.comments;
	if(definition.theme) {
		Model.define.theme = definition.theme;
		Model.persistence.theme = Utils.copy(definition.theme)
	}
	if(localRuntime == false) {
		Designer.initialize.initCanvas()
	}
	var shapes = definition.elements;
	var shapeCount = 0;
	for(var shapeId in shapes) {
		var shape = shapes[shapeId];
		if(shape.name != "linker") {
			Schema.initShapeFunctions(shape);
			Designer.painter.renderShape(shape);
			Model.add(shape, false)
		}
		shapeCount++
	}
	for(var shapeId in shapes) {
		var shape = shapes[shapeId];
		if(shape.name == "linker") {
			Designer.painter.renderLinker(shape);
			Model.add(shape, false)
		}
	}
	if(shapeCount == 0) {
		Model.build()
	}
	if(localRuntime == false) {
		if(typeof isView == "undefined") {
			Navigator.draw()
		}
	}
});
Designer.addFunction("selectAll", function() {
	var a = Model.define.elements;
	var b = [];
	for(var c in a) {
		b.push(c)
	}
	Utils.selectShape(b)
});
Designer.addFunction("setFontStyle", function(d) {
	var c = Utils.getSelected();
	if(c.length == 0) {
		return
	}
	for(var b = 0; b < c.length; b++) {
		var a = c[b];
		a.fontStyle = Utils.copy(a.fontStyle);
		if(typeof d.fontFamily != "undefined") {
			a.fontStyle.fontFamily = d.fontFamily
		}
		if(typeof d.size != "undefined") {
			a.fontStyle.size = d.size
		}
		if(typeof d.color != "undefined") {
			a.fontStyle.color = d.color
		}
		if(typeof d.bold != "undefined") {
			a.fontStyle.bold = d.bold
		}
		if(typeof d.italic != "undefined") {
			a.fontStyle.italic = d.italic
		}
		if(typeof d.underline != "undefined") {
			a.fontStyle.underline = d.underline
		}
		if(typeof d.textAlign != "undefined") {
			a.fontStyle.textAlign = d.textAlign
		}
		if(a.name == "linker") {
			Designer.painter.renderLinker(a)
		} else {
			if(typeof d.vAlign != "undefined") {
				a.fontStyle.vAlign = d.vAlign
			}
			Designer.painter.renderShape(a)
		}
	}
	Model.updateMulti(c)
});
Designer.addFunction("setShapeStyle", function(d) {
	var c = Utils.getSelected();
	if(c.length == 0) {
		return
	}
	var e = [];
	for(var b = 0; b < c.length; b++) {
		var a = c[b];
		if(a.name != "linker") {
			a.shapeStyle = Utils.copy(a.shapeStyle);
			if(typeof d.alpha != "undefined") {
				a.shapeStyle.alpha = d.alpha
			}
			Designer.painter.renderShape(a);
			e.push(a)
		}
	}
	Model.updateMulti(e)
});
Designer.addFunction("setLineStyle", function(f) {
	var e = Utils.getSelected();
	if(e.length == 0) {
		return
	}
	var d = Utils.getFamilyShapes(e);
	e = e.concat(d);
	for(var c = 0; c < e.length; c++) {
		var a = e[c];
		a.lineStyle = Utils.copy(a.lineStyle);
		if(typeof f.lineWidth != "undefined") {
			a.lineStyle.lineWidth = f.lineWidth
		}
		if(typeof f.lineColor != "undefined") {
			a.lineStyle.lineColor = f.lineColor
		}
		if(typeof f.lineStyle != "undefined") {
			a.lineStyle.lineStyle = f.lineStyle
		}
		if(a.name == "linker") {
			if(typeof f.beginArrowStyle != "undefined") {
				a.lineStyle.beginArrowStyle = f.beginArrowStyle;
				Designer.defaults.linkerBeginArrowStyle = f.beginArrowStyle
			}
			if(typeof f.endArrowStyle != "undefined") {
				a.lineStyle.endArrowStyle = f.endArrowStyle;
				Designer.defaults.linkerEndArrowStyle = f.endArrowStyle
			}
			if(a.lineStyle.lineWidth == 0) {
				a.lineStyle.lineWidth = 1
			}
		}
	}
	Model.updateMulti(e);
	for(var c = 0; c < e.length; c++) {
		var a = e[c];
		Designer.painter.renderShape(a);
		if(a.name != "linker") {
			var g = Model.getShapeLinkers(a.id);
			if(!g) {
				continue
			}
			for(var b = 0; b < g.length; b++) {
				if(!Utils.isSelected(g[b])) {
					var h = Model.getShapeById(g[b]);
					Designer.painter.renderShape(h)
				}
			}
		}
	}
});
Designer.addFunction("setFillStyle", function(f) {
	var e = Utils.getSelected();
	if(e.length == 0) {
		return
	}
	if(e.length == 0) {
		return
	}
	var g = [];
	for(var c = 0; c < e.length; c++) {
		var a = e[c];
		if(a.name != "linker") {
			a.fillStyle = Utils.copy(a.fillStyle);
			var d = a.fillStyle.type;
			if(typeof f.type != "undefined") {
				b(a, f.type);
				d = f.type
			}
			if(typeof f.color != "undefined") {
				if(d == "solid") {
					a.fillStyle.color = f.color
				} else {
					if(d == "gradient") {
						a.fillStyle.beginColor = GradientHelper.getLighterColor(f.color);
						a.fillStyle.endColor = GradientHelper.getDarkerColor(f.color)
					}
				}
			}
			if(d == "gradient") {
				if(typeof f.beginColor != "undefined") {
					a.fillStyle.beginColor = f.beginColor
				}
				if(typeof f.endColor != "undefined") {
					a.fillStyle.endColor = f.endColor
				}
				if(typeof f.gradientType != "undefined") {
					a.fillStyle.gradientType = f.gradientType;
					if(f.gradientType == "linear") {
						delete a.fillStyle.radius;
						a.fillStyle.angle = 0
					} else {
						delete a.fillStyle.angle;
						a.fillStyle.radius = 0.75
					}
				}
				if(typeof f.radius != "undefined") {
					a.fillStyle.radius = f.radius
				}
				if(typeof f.angle != "undefined") {
					a.fillStyle.angle = f.angle
				}
			}
			if(d == "image") {
				if(typeof f.display != "undefined") {
					a.fillStyle.display = f.display
				}
				if(typeof f.fileId != "undefined") {
					a.fillStyle.fileId = f.fileId
				}
				if(typeof f.imageW != "undefined") {
					a.fillStyle.imageW = f.imageW
				}
				if(typeof f.imageH != "undefined") {
					a.fillStyle.imageH = f.imageH
				}
			}
			Designer.painter.renderShape(a);
			g.push(a)
		}
	}
	Model.updateMulti(g);

	function b(i, k) {
		var h = i.fillStyle;
		if(h.type != k) {
			var l = {
				type: k
			};
			if(k == "solid") {
				if(h.type == "gradient") {
					var j = GradientHelper.getDarkerColor(h.beginColor);
					l.color = j
				} else {
					l.color = "255,255,255"
				}
			} else {
				if(k == "gradient") {
					var m = h.color;
					if(h.type != "solid") {
						m = "255,255,255"
					}
					l.gradientType = "linear";
					l.angle = 0;
					l.beginColor = GradientHelper.getLighterColor(m);
					l.endColor = GradientHelper.getDarkerColor(m)
				} else {
					if(k == "image") {
						l.fileId = "";
						l.display = "fill";
						l.imageW = 10;
						l.imageH = 10
					}
				}
			}
			i.fillStyle = l
		}
	}
});
Designer.addFunction("setLinkerType", function(e) {
	var d = Utils.getSelected();
	if(d.length == 0) {
		return
	}
	var f = [];
	for(var c = 0; c < d.length; c++) {
		var b = d[c];
		if(b.name == "linker") {
			b.linkerType = e;
			Designer.painter.renderLinker(b, true);
			f.push(b)
		}
	}
	Schema.linkerDefaults.linkerType = e;
	var a = Utils.getSelectedIds();
	if(a.length > 1) {
		Designer.painter.drawControls(a)
	}
	Model.updateMulti(f);
	Utils.showLinkerControls()
});
Designer.addFunction("matchSize", function(l) {
	var c = Utils.getSelected();
	if(c.length == 0 || !l) {
		return
	}
	var b = null;
	var h = null;
	var k = [];
	for(var e = 0; e < c.length; e++) {
		var g = c[e];
		if(g.name != "linker") {
			if(b == null || g.props.w > b) {
				b = g.props.w
			}
			if(h == null || g.props.h > h) {
				h = g.props.h
			}
		}
	}
	if(l.w == "auto") {
		l.w = b
	}
	if(l.h == "auto") {
		l.h = h
	}
	Utils.removeAnchors();
	var d = [];
	for(var e = 0; e < c.length; e++) {
		var g = c[e];
		if(g.name != "linker") {
			var j = Designer.op.changeShapeProps(g, l);
			Utils.showAnchors(g);
			Utils.mergeArray(k, j);
			d.push(g)
		}
	}
	for(var e = 0; e < k.length; e++) {
		var a = k[e];
		var f = Model.getShapeById(a);
		Designer.painter.renderLinker(f, true);
		d.push(f)
	}
	Designer.painter.drawControls(Utils.getSelectedIds());
	Model.updateMulti(d)
});
Designer.addFunction("alignShapes", function(c) {
	var k = Utils.getSelected();
	if(k.length == 0 || !c) {
		return
	}
	var d = Utils.getSelectedIds();
	var g = Utils.getControlBox(d);
	var b = [];
	Utils.removeAnchors();
	var e = [];
	for(var m = 0; m < k.length; m++) {
		var a = k[m];
		if(a.name != "linker") {
			e.push(a)
		}
		if(c == "left") {
			if(a.name != "linker") {
				var q = Utils.getShapeBox(a);
				var r = {
					x: g.x - (q.x - a.props.x)
				};
				var l = Designer.op.changeShapeProps(a, r);
				Utils.showAnchors(a);
				Utils.mergeArray(b, l)
			} else {
				if(a.from.id == null && a.to.id == null) {
					var o = Utils.getLinkerBox(a);
					a.from.x -= (o.x - g.x);
					a.to.x -= (o.x - g.x);
					b.push(a.id)
				}
			}
		} else {
			if(c == "center") {
				var p = g.x + g.w / 2;
				if(a.name != "linker") {
					var r = {
						x: Math.round(p - a.props.w / 2)
					};
					var l = Designer.op.changeShapeProps(a, r);
					Utils.showAnchors(a);
					Utils.mergeArray(b, l)
				} else {
					if(a.from.id == null && a.to.id == null) {
						var o = Utils.getLinkerBox(a);
						a.from.x += Math.round(p - o.w / 2 - o.x);
						a.to.x += Math.round(p - o.w / 2 - o.x);
						b.push(a.id)
					}
				}
			} else {
				if(c == "right") {
					var n = g.x + g.w;
					if(a.name != "linker") {
						var q = Utils.getShapeBox(a);
						var r = {
							x: n - a.props.w - (a.props.x - q.x)
						};
						var l = Designer.op.changeShapeProps(a, r);
						Utils.showAnchors(a);
						Utils.mergeArray(b, l)
					} else {
						if(a.from.id == null && a.to.id == null) {
							var o = Utils.getLinkerBox(a);
							a.from.x += (n - o.x - o.w);
							a.to.x += (n - o.x - o.w);
							b.push(a.id)
						}
					}
				} else {
					if(c == "top") {
						if(a.name != "linker") {
							var q = Utils.getShapeBox(a);
							var r = {
								y: g.y - (q.y - a.props.y)
							};
							var l = Designer.op.changeShapeProps(a, r);
							Utils.showAnchors(a);
							Utils.mergeArray(b, l)
						} else {
							if(a.from.id == null && a.to.id == null) {
								var o = Utils.getLinkerBox(a);
								a.from.y -= (o.y - g.y);
								a.to.y -= (o.y - g.y);
								b.push(a.id)
							}
						}
					} else {
						if(c == "middle") {
							var s = g.y + g.h / 2;
							if(a.name != "linker") {
								var r = {
									y: Math.round(s - a.props.h / 2)
								};
								var l = Designer.op.changeShapeProps(a, r);
								Utils.showAnchors(a);
								Utils.mergeArray(b, l)
							} else {
								if(a.from.id == null && a.to.id == null) {
									var o = Utils.getLinkerBox(a);
									a.from.y += Math.round(s - o.h / 2 - o.y);
									a.to.y += Math.round(s - o.h / 2 - o.y);
									b.push(a.id)
								}
							}
						} else {
							if(c == "bottom") {
								var f = g.y + g.h;
								if(a.name != "linker") {
									var q = Utils.getShapeBox(a);
									var r = {
										y: f - a.props.h - (a.props.y - q.y)
									};
									var l = Designer.op.changeShapeProps(a, r);
									Utils.showAnchors(a);
									Utils.mergeArray(b, l)
								} else {
									if(a.from.id == null && a.to.id == null) {
										var o = Utils.getLinkerBox(a);
										a.from.y += (f - o.y - o.h);
										a.to.y += (f - o.y - o.h);
										b.push(a.id)
									}
								}
							}
						}
					}
				}
			}
		}
	}
	for(var m = 0; m < b.length; m++) {
		var j = b[m];
		var h = Model.getShapeById(j);
		Designer.painter.renderLinker(h, true);
		e.push(h)
	}
	Designer.painter.drawControls(d);
	Model.updateMulti(e)
});
Designer.addFunction("distributeShapes", function(o) {
	var f = Utils.getSelected();
	if(f.length == 0 || !o) {
		return
	}
	var m = Utils.getSelectedIds();
	var l = Utils.getControlBox(m);
	var s = [];
	Utils.removeAnchors();
	var e = [];
	for(var g = 0; g < f.length; g++) {
		var n = f[g];
		if(n.name != "linker") {
			e.push(n)
		}
	}
	if(o == "h") {
		e.sort(function d(i, h) {
			return i.props.x - h.props.x
		});
		var p = l.w;
		for(var g = 0; g < e.length; g++) {
			var n = e[g];
			p -= n.props.w
		}
		var a = p / (e.length - 1);
		var c = l.x;
		for(var g = 0; g < e.length; g++) {
			var n = e[g];
			var r = {
				x: c
			};
			var q = Designer.op.changeShapeProps(n, r);
			Utils.showAnchors(n);
			Utils.mergeArray(s, q);
			c += (n.props.w + a)
		}
	} else {
		e.sort(function d(i, h) {
			return i.props.y - h.props.y
		});
		var k = l.h;
		for(var g = 0; g < e.length; g++) {
			var n = e[g];
			k -= n.props.h
		}
		var a = k / (e.length - 1);
		var c = l.y;
		for(var g = 0; g < e.length; g++) {
			var n = e[g];
			var r = {
				y: c
			};
			var q = Designer.op.changeShapeProps(n, r);
			Utils.showAnchors(n);
			Utils.mergeArray(s, q);
			c += (n.props.h + a)
		}
	}
	for(var g = 0; g < s.length; g++) {
		var b = s[g];
		var j = Model.getShapeById(b);
		Designer.painter.renderLinker(j, true);
		e.push(j)
	}
	Designer.painter.drawControls(m);
	Model.updateMulti(e)
});
Designer.addFunction("layerShapes", function(m) {
	var h = Utils.getSelected();
	if(h.length == 0 || !m) {
		return
	}
	h.sort(function c(r, i) {
		return r.props.zindex - i.props.zindex
	});
	var b;
	if(m == "front") {
		b = Model.maxZIndex;
		for(var j = 0; j < h.length; j++) {
			var l = h[j];
			b += 1;
			l.props.zindex = b
		}
	} else {
		if(m == "forward") {
			var d = null;
			var q = null;
			for(var j = 0; j < h.length; j++) {
				var l = h[j];
				d = n(l);
				if(d != null) {
					q = l.props.zindex;
					break
				}
			}
			if(d == null) {
				return
			}
			var k = d.props.zindex;
			var f = n(d);
			var p = k + 1;
			if(f != null) {
				p = k + (f.props.zindex - k) / 2
			}
			var g = p - q;
			for(var j = 0; j < h.length; j++) {
				var l = h[j];
				l.props.zindex += g
			}
		} else {
			if(m == "back") {
				b = Model.orderList[0].zindex;
				for(var j = h.length - 1; j >= 0; j--) {
					var l = h[j];
					b -= 1;
					l.props.zindex = b
				}
			} else {
				if(m == "backward") {
					var a = null;
					var q = null;
					for(var j = 0; j < h.length; j++) {
						var l = h[j];
						a = e(l);
						if(a != null) {
							q = l.props.zindex;
							break
						}
					}
					if(a == null) {
						return
					}
					var k = a.props.zindex;
					var o = e(a);
					var p = k - 1;
					if(o != null) {
						p = k - (k - o.props.zindex) / 2
					}
					var g = p - q;
					for(var j = 0; j < h.length; j++) {
						var l = h[j];
						l.props.zindex += g
					}
				}
			}
		}
	}
	Model.updateMulti(h);

	function n(s) {
		var v = Utils.getShapeBox(s);
		for(var u = 0; u < Model.orderList.length; u++) {
			var i = Model.orderList[u];
			if(i.zindex <= s.props.zindex || Utils.isSelected(i.id)) {
				continue
			}
			var t = Model.getShapeById(i.id);
			var r = Utils.getShapeBox(t);
			if(Utils.rectCross(v, r)) {
				return t
			}
		}
		return null
	}

	function e(s) {
		var v = Utils.getShapeBox(s);
		for(var u = Model.orderList.length - 1; u >= 0; u--) {
			var i = Model.orderList[u];
			if(i.zindex >= s.props.zindex || Utils.isSelected(i.id)) {
				continue
			}
			var t = Model.getShapeById(i.id);
			var r = Utils.getShapeBox(t);
			if(Utils.rectCross(v, r)) {
				return t
			}
		}
		return null
	}
});
Designer.addFunction("group", function() {
	var d = Utils.getSelected();
	if(d.length < 2) {
		return
	}
	var c = Utils.newId();
	for(var b = 0; b < d.length; b++) {
		var a = d[b];
		a.group = c
	}
	Model.updateMulti(d)
});
Designer.addFunction("ungroup", function() {
	var c = Utils.getSelected();
	if(c.length == 0) {
		return
	}
	for(var b = 0; b < c.length; b++) {
		var a = c[b];
		a.group = null
	}
	Model.updateMulti(c)
});
Designer.addFunction("lockShapes", function() {
	var b = Utils.getSelectedIds();
	if(b.length == 0) {
		return
	}
	var d = [];
	for(var c = 0; c < b.length; c++) {
		var a = Model.getShapeById(b[c]);
		a.locked = true;
		d.push(a)
	}
	Utils.unselect();
	Utils.selectShape(b);
	Model.updateMulti(d)
});
Designer.addFunction("unlockShapes", function() {
	var b = Utils.getSelectedLockedIds();
	if(b.length == 0) {
		return
	}
	var d = [];
	for(var c = 0; c < b.length; c++) {
		var a = Model.getShapeById(b[c]);
		a.locked = false;
		d.push(a)
	}
	var e = Utils.getSelectedIds();
	Utils.unselect();
	Utils.selectShape(e);
	Model.updateMulti(d)
});
Designer.addFunction("setPageStyle", function(a) {
	Model.updatePage(a)
});
Designer.addFunction("setReadonly", function(a) {
	if(typeof a != "boolean") {
		return
	}
	if(a) {
		$(".diagram_title").addClass("readonly");
		$(".menubar").hide();
		$(".toolbar").hide();
		$("#shape_panel").addClass("readonly");
		$("#designer_viewport").addClass("readonly");
		Designer.hotkey.cancel();
		Designer.op.cancel();
		$(window).trigger("resize.designer");
		$("#dock").hide();
		$(".dock_view").hide();
		Dock.currentView = "";
		Designer.contextMenu.destroy()
	}
});
Designer.addFunction("zoomIn", function() {
	var a = Designer.config.scale;
	var b = a + 0.1;
	Designer.setZoomScale(b)
});
Designer.addFunction("zoomOut", function() {
	var a = Designer.config.scale;
	var b = a - 0.1;
	Designer.setZoomScale(b)
});
Designer.addFunction("setZoomScale", function(e) {
	if(e < 0.25) {
		e = 0.25
	}
	if(e > 4) {
		e = 4
	}
	Utils.hideLinkerCursor();
	Designer.config.scale = e;
	Designer.initialize.initCanvas();
	for(var d in Model.define.elements) {
		var b = Model.define.elements[d];
		Designer.painter.renderShape(b)
	}
	var a = Utils.getSelectedIds();
	var c = Utils.getSelectedLockedIds();
	Utils.mergeArray(a, c);
	Utils.unselect();
	Utils.selectShape(a);
	Utils.showLinkerCursor()
});
Designer.addFunction("setShapeProps", function(h, b) {
	if(!b) {
		b = Utils.getSelected()
	}
	if(b.length == 0 || !h) {
		return
	}
	var c = [];
	var k = [];
	for(var d = 0; d < b.length; d++) {
		var g = b[d];
		if(g.name != "linker") {
			var j = Designer.op.changeShapeProps(g, h);
			c.push(g);
			if(j && j.length) {
				Utils.mergeArray(k, j)
			}
		}
	}
	for(var d = 0; d < k.length; d++) {
		var a = k[d];
		var e = Model.getShapeById(a);
		Designer.painter.renderLinker(e, true);
		c.push(e)
	}
	if(c.length > 0) {
		Model.updateMulti(c)
	}
	var f = Utils.getSelectedIds();
	Utils.unselect();
	Utils.selectShape(f)
});
Designer.addFunction("addDataAttribute", function(a) {
	var c = Utils.getSelectedIds();
	var b = Model.getShapeById(c[0]);
	if(!b.dataAttributes) {
		b.dataAttributes = []
	}
	a.id = Utils.newId();
	a.category = "custom";
	b.dataAttributes.push(a);
	MessageSource.doWithoutUpdateDock(function() {
		Model.update(b)
	})
});
Designer.addFunction("updateDataAttribute", function(f) {
	var c = Utils.getSelectedIds();
	var b = Model.getShapeById(c[0]);
	if(!b.dataAttributes) {
		b.dataAttributes = []
	}
	var e = false;
	for(var d = 0; d < b.dataAttributes.length; d++) {
		var a = b.dataAttributes[d];
		if(a.id == f.id) {
			b.dataAttributes[d] = f;
			e = true
		}
	}
	if(!e) {
		return
	}
	MessageSource.doWithoutUpdateDock(function() {
		Model.update(b)
	});
	Designer.painter.renderShape(b)
});
Designer.addFunction("getDataAttrById", function(e) {
	var c = Utils.getSelectedIds();
	var b = Model.getShapeById(c[0]);
	if(!b.dataAttributes) {
		b.dataAttributes = []
	}
	for(var d = 0; d < b.dataAttributes.length; d++) {
		var a = b.dataAttributes[d];
		if(a.id == e) {
			return a
		}
	}
	return null
});
Designer.addFunction("getDefaultDataAttrByName", function(d) {
	var c = Utils.getSelectedIds();
	var b = Model.getShapeById(c[0]);
	if(!b.dataAttributes) {
		b.dataAttributes = []
	}
	for(var e = 0; e < b.dataAttributes.length; e++) {
		var a = b.dataAttributes[e];
		if(a.category == "default" && a.name == d) {
			return a
		}
	}
	return null
});
Designer.addFunction("deleteDataAttribute", function(e) {
	var c = Utils.getSelectedIds();
	var b = Model.getShapeById(c[0]);
	if(!b.dataAttributes) {
		b.dataAttributes = []
	}
	var f = false;
	for(var d = 0; d < b.dataAttributes.length; d++) {
		var a = b.dataAttributes[d];
		if(a.id == e) {
			b.dataAttributes.splice(d, 1);
			f = true
		}
	}
	if(!f) {
		return
	}
	MessageSource.doWithoutUpdateDock(function() {
		Model.update(b)
	});
	Designer.painter.renderShape(b)
});
Designer.addFunction("setSchema", function(schemaCategories, callback) {
	if(schemaCategories.length == 0) {
		Schema.empty();
		Schema.init(true);
		Designer.initialize.initShapes();
		if(callback) {
			callback()
		}
		return
	}
	Util.ajax({
		url: "/diagraming/schema",
		data: {
			categories: schemaCategories
		},
		type: "get",
		success: function(data) {
			Schema.empty();
			eval(data);
			Schema.init(true);
			Designer.initialize.initShapes();
			if(callback) {
				callback()
			}
		}
	})
});