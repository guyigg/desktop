Designer.events.addEventListener("initialized", function() {
	if(localRuntime) {
		Designer.open(definition)
	} else {
		var a = CLB.findLocal();
		if(a == false) {
			b(function(c) {
				Designer.open(c)
			})
		}
	}

	function b(c) {
		$.get("/diagraming/getdef", {
			id: chartId
		}, function(e) {
			c(JSON.parse(e.def))
		})
	}
});
Designer.events.addEventListener("create", function(a) {});
var createdTip = false;
Designer.events.addEventListener("created", function(a) {
	if(createdTip) {
		UI.showStartStep("created", $("#" + a.id));
		createdTip = false
	}
});
Designer.events.addEventListener("linkerCreating", function(a) {});
Designer.events.addEventListener("linkerCreated", function(a) {});
Designer.events.addEventListener("selectChanged", function() {
	UI.update();
	Dock.update();
	UI.showShapeOptions()
});
Designer.events.addEventListener("clipboardChanged", function(a) {
	if(a > 0) {
		$("#bar_list_edit").children("li[ac=paste]").menuitem("enable")
	} else {
		$("#bar_list_edit").children("li[ac=paste]").menuitem("disable")
	}
});
Designer.events.addEventListener("undoStackChanged", function(a) {
	if(a == 0) {
		$("#bar_list_edit").children("li[ac=undo]").menuitem("disable");
		$("#bar_undo").button("disable")
	} else {
		$("#bar_list_edit").children("li[ac=undo]").menuitem("enable");
		$("#bar_undo").button("enable")
	}
});
Designer.events.addEventListener("redoStackChanged", function(a) {
	if(a == 0) {
		$("#bar_list_edit").children("li[ac=redo]").menuitem("disable");
		$("#bar_redo").button("disable")
	} else {
		$("#bar_list_edit").children("li[ac=redo]").menuitem("enable");
		$("#bar_redo").button("enable")
	}
});
Designer.events.addEventListener("beforeResize", function(a) {
	var c = a.shapes;
	var b = a.minSize;
	var f = a.dir;
	if(c.length == 1) {
		var l = c[0];
		if(l.name == "verticalPool") {
			if(f == "b") {
				var n = 0;
				for(var j = 0; j < l.children.length; j++) {
					var h = l.children[j];
					var d = Model.getShapeById(h);
					if(d.name == "horizontalSeparator") {
						n += d.props.h
					}
				}
				if(n == 0) {
					n = 90
				} else {
					n += 40
				}
				b.h = n
			} else {
				if(f == "l" || f == "r") {
					var g = 20;
					var e = null;
					var m = 0;
					for(var j = 0; j < l.children.length; j++) {
						var h = l.children[j];
						var d = Model.getShapeById(h);
						if(d.name == "horizontalSeparator") {
							m++
						} else {
							if(d.name == "verticalLane") {
								if(e == null || (d.props.x < e.props.x && f == "l") || (d.props.x > e.props.x && f == "r")) {
									e = d
								}
								g += d.props.w
							}
						}
					}
					if(e != null) {
						g -= e.props.w
					}
					if(m > 0) {
						g += 20
					}
					b.w = g
				}
			}
		} else {
			if(l.name == "verticalLane" && f == "b") {
				var n = 0;
				var e = l;
				var k = Model.getShapeById(e.parent);
				for(var j = 0; j < k.children.length; j++) {
					var h = k.children[j];
					var d = Model.getShapeById(h);
					if(d.name == "horizontalSeparator") {
						n += d.props.h
					}
				}
				if(n == 0) {
					n = 50
				}
				b.h = n
			} else {
				if(l.name == "horizontalPool") {
					if(f == "r") {
						var g = 0;
						for(var j = 0; j < l.children.length; j++) {
							var h = l.children[j];
							var d = Model.getShapeById(h);
							if(d.name == "verticalSeparator") {
								g += d.props.w
							}
						}
						if(g == 0) {
							g = 90
						} else {
							g += 40
						}
						b.w = g
					} else {
						if(f == "t" || f == "b") {
							var n = 20;
							var e = null;
							var m = 0;
							for(var j = 0; j < l.children.length; j++) {
								var h = l.children[j];
								var d = Model.getShapeById(h);
								if(d.name == "verticalSeparator") {
									m++
								} else {
									if(d.name == "horizontalLane") {
										if(e == null || (d.props.y < e.props.y && f == "t") || (d.props.y > e.props.y && f == "b")) {
											e = d
										}
										n += d.props.h
									}
								}
							}
							if(e != null) {
								n -= e.props.h
							}
							if(m > 0) {
								n += 20
							}
							b.h = n
						}
					}
				} else {
					if(l.name == "horizontalLane" && f == "r") {
						var g = 0;
						var e = l;
						var k = Model.getShapeById(e.parent);
						for(var j = 0; j < k.children.length; j++) {
							var h = k.children[j];
							var d = Model.getShapeById(h);
							if(d.name == "verticalSeparator") {
								g += d.props.w
							}
						}
						if(g == 0) {
							g = 50
						}
						b.w = g
					} else {
						if(l.name == "cls" || l.name == "interface" || l.name == "package" || l.name == "combinedFragment") {
							b.h = 50
						}
					}
				}
			}
		}
	}
});
Designer.events.addEventListener("resizing", function(b) {
	var n = b.shape;
	var e = b.dir;
	var g = b.offset;
	var h = [];
	if(n.name == "verticalPool") {
		if(e == "b") {
			for(var j = 0; j < n.children.length; j++) {
				var f = n.children[j];
				var c = Model.getShapeById(f);
				if(c.name == "verticalLane" || c.name == "verticalSeparatorBar") {
					c.props.h = n.props.h - 40;
					Designer.painter.renderShape(c);
					h.push(c)
				}
			}
		} else {
			if(e == "r") {
				if(n.children && n.children.length > 0) {
					var d = null;
					for(var j = 0; j < n.children.length; j++) {
						var f = n.children[j];
						var c = Model.getShapeById(f);
						if(c.name == "horizontalSeparator") {
							c.props.w = n.props.w;
							Designer.painter.renderShape(c);
							h.push(c)
						}
						if(c.name == "verticalLane" && (d == null || c.props.x > d.props.x)) {
							d = c
						}
					}
					if(d != null) {
						d.props.w += g.w;
						Designer.painter.renderShape(d);
						h.push(d)
					}
				}
			} else {
				if(e == "l") {
					if(n.children && n.children.length > 0) {
						var d = null;
						for(var j = 0; j < n.children.length; j++) {
							var f = n.children[j];
							var c = Model.getShapeById(f);
							if(c.name == "horizontalSeparator") {
								c.props.x += g.x;
								c.props.w += g.w;
								Designer.painter.renderShape(c);
								h.push(c)
							} else {
								if(c.name == "verticalSeparatorBar") {
									c.props.x += g.x;
									Designer.painter.renderShape(c);
									h.push(c)
								}
							}
							if(c.name == "verticalLane" && (d == null || c.props.x < d.props.x)) {
								d = c
							}
						}
						if(d != null) {
							d.props.w += g.w;
							d.props.x += g.x;
							Designer.painter.renderShape(d);
							h.push(d)
						}
					}
				}
			}
		}
	} else {
		if(n.name == "verticalLane") {
			var m = Model.getShapeById(n.parent);
			h = [m];
			m.props.w += g.w;
			m.props.h = n.props.h + 40;
			m.props.x += g.x;
			Designer.painter.renderShape(m);
			if(e == "r") {
				var o = [];
				var k = Model.getPersistenceById(n.id);
				for(var j = 0; j < m.children.length; j++) {
					var f = m.children[j];
					if(f != n.id) {
						var a = Model.getPersistenceById(f);
						var c = Model.getShapeById(f);
						if(c.name == "horizontalSeparator") {
							c.props.w += g.w;
							Designer.painter.renderShape(c);
							h.push(c)
						} else {
							if(a.props.x > k.props.x && a.name == "verticalLane") {
								o.push(c)
							}
						}
					}
				}
				if(o.length > 0) {
					var l = Utils.getContainedShapes(o);
					var p = Utils.getOutlinkers(l);
					l = l.concat(p);
					o = o.concat(l);
					Designer.op.moveShape(o, {
						x: g.w,
						y: 0
					});
					h = h.concat(o)
				}
			} else {
				if(e == "b") {
					for(var j = 0; j < m.children.length; j++) {
						var f = m.children[j];
						if(f != n.id) {
							var c = Model.getShapeById(f);
							if(c.name == "verticalLane" || c.name == "verticalSeparatorBar") {
								c.props.h = n.props.h;
								Designer.painter.renderShape(c);
								h.push(c)
							}
						}
					}
				} else {
					if(e == "l") {
						var o = [];
						var k = Model.getPersistenceById(n.id);
						for(var j = 0; j < m.children.length; j++) {
							var f = m.children[j];
							if(f != n.id) {
								var a = Model.getPersistenceById(f);
								var c = Model.getShapeById(f);
								if(c.name == "horizontalSeparator") {
									c.props.x += g.x;
									c.props.w += g.w;
									Designer.painter.renderShape(c);
									h.push(c)
								} else {
									if(c.name == "verticalSeparatorBar") {
										c.props.x += g.x;
										Designer.painter.renderShape(c);
										h.push(c)
									} else {
										if(a.props.x < k.props.x && a.name == "verticalLane") {
											o.push(c)
										}
									}
								}
							}
						}
						if(o.length > 0) {
							var l = Utils.getContainedShapes(o);
							var p = Utils.getOutlinkers(l);
							l = l.concat(p);
							o = o.concat(l);
							Designer.op.moveShape(o, {
								x: g.x,
								y: 0
							});
							h = h.concat(o)
						}
					}
				}
			}
		} else {
			if(n.name == "horizontalSeparator") {
				var m = Model.getShapeById(n.parent);
				h = [m];
				m.props.h += g.h;
				Designer.painter.renderShape(m);
				for(var j = 0; j < m.children.length; j++) {
					var f = m.children[j];
					var c = Model.getShapeById(f);
					if(f == n.id) {
						continue
					}
					if(c.name != "horizontalSeparator") {
						c.props.h += g.h;
						Designer.painter.renderShape(c);
						h.push(c)
					} else {
						if(c.props.y > n.props.y) {
							c.props.y += g.h;
							Designer.painter.renderShape(c);
							h.push(c)
						}
					}
				}
			} else {
				if(n.name == "horizontalPool") {
					if(e == "r") {
						for(var j = 0; j < n.children.length; j++) {
							var f = n.children[j];
							var c = Model.getShapeById(f);
							if(c.name == "horizontalLane" || c.name == "horizontalSeparatorBar") {
								c.props.w = n.props.w - 40;
								Designer.painter.renderShape(c);
								h.push(c)
							}
						}
					} else {
						if(e == "b") {
							if(n.children && n.children.length > 0) {
								var d = null;
								for(var j = 0; j < n.children.length; j++) {
									var f = n.children[j];
									var c = Model.getShapeById(f);
									if(c.name == "verticalSeparator") {
										c.props.h = n.props.h;
										Designer.painter.renderShape(c);
										h.push(c)
									}
									if(c.name == "horizontalLane" && (d == null || c.props.y > d.props.y)) {
										d = c
									}
								}
								if(d != null) {
									d.props.h += g.h;
									Designer.painter.renderShape(d);
									h.push(d)
								}
							}
						} else {
							if(e == "t") {
								if(n.children && n.children.length > 0) {
									var d = null;
									for(var j = 0; j < n.children.length; j++) {
										var f = n.children[j];
										var c = Model.getShapeById(f);
										if(c.name == "verticalSeparator") {
											c.props.y += g.y;
											c.props.h += g.h;
											Designer.painter.renderShape(c);
											h.push(c)
										} else {
											if(c.name == "horizontalSeparatorBar") {
												c.props.y += g.y;
												Designer.painter.renderShape(c);
												h.push(c)
											}
										}
										if(c.name == "horizontalLane" && (d == null || c.props.y < d.props.y)) {
											d = c
										}
									}
									if(d != null) {
										d.props.h += g.h;
										d.props.y += g.y;
										Designer.painter.renderShape(d);
										h.push(d)
									}
								}
							}
						}
					}
				} else {
					if(n.name == "horizontalLane") {
						var m = Model.getShapeById(n.parent);
						h = [m];
						m.props.h += g.h;
						m.props.w += g.w;
						m.props.y += g.y;
						Designer.painter.renderShape(m);
						if(e == "r") {
							for(var j = 0; j < m.children.length; j++) {
								var f = m.children[j];
								if(f != n.id) {
									var c = Model.getShapeById(f);
									if(c.name == "horizontalLane" || c.name == "horizontalSeparatorBar") {
										c.props.w = n.props.w;
										Designer.painter.renderShape(c);
										h.push(c)
									}
								}
							}
						} else {
							if(e == "b") {
								var o = [];
								var k = Model.getPersistenceById(n.id);
								for(var j = 0; j < m.children.length; j++) {
									var f = m.children[j];
									if(f != n.id) {
										var a = Model.getPersistenceById(f);
										var c = Model.getShapeById(f);
										if(c.name == "verticalSeparator") {
											c.props.h += g.h;
											Designer.painter.renderShape(c);
											h.push(c)
										} else {
											if(a.props.y > k.props.y && a.name == "horizontalLane") {
												o.push(c)
											}
										}
									}
								}
								if(o.length > 0) {
									var l = Utils.getContainedShapes(o);
									var p = Utils.getOutlinkers(l);
									l = l.concat(p);
									o = o.concat(l);
									Designer.op.moveShape(o, {
										x: 0,
										y: g.h
									});
									h = h.concat(o)
								}
							} else {
								if(e == "t") {
									var o = [];
									var k = Model.getPersistenceById(n.id);
									for(var j = 0; j < m.children.length; j++) {
										var f = m.children[j];
										if(f != n.id) {
											var a = Model.getPersistenceById(f);
											var c = Model.getShapeById(f);
											if(c.name == "verticalSeparator") {
												c.props.y += g.y;
												c.props.h += g.h;
												Designer.painter.renderShape(c);
												h.push(c)
											} else {
												if(c.name == "horizontalSeparatorBar") {
													c.props.y += g.y;
													Designer.painter.renderShape(c);
													h.push(c)
												} else {
													if(a.props.y < k.props.y && a.name == "horizontalLane") {
														o.push(c)
													}
												}
											}
										}
									}
									if(o.length > 0) {
										var l = Utils.getContainedShapes(o);
										var p = Utils.getOutlinkers(l);
										l = l.concat(p);
										o = o.concat(l);
										Designer.op.moveShape(o, {
											x: 0,
											y: g.y
										});
										h = h.concat(o)
									}
								}
							}
						}
					} else {
						if(n.name == "verticalSeparator") {
							var m = Model.getShapeById(n.parent);
							h = [m];
							m.props.w += g.w;
							Designer.painter.renderShape(m);
							for(var j = 0; j < m.children.length; j++) {
								var f = m.children[j];
								var c = Model.getShapeById(f);
								if(f == n.id) {
									continue
								}
								if(c.name != "verticalSeparator") {
									c.props.w += g.w;
									Designer.painter.renderShape(c);
									h.push(c)
								} else {
									if(c.props.x > n.props.x) {
										c.props.x += g.w;
										Designer.painter.renderShape(c);
										h.push(c)
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return h
});
Designer.events.addEventListener("beforeRemove", function(c) {
	var n = {};
	for(var g = 0; g < c.length; g++) {
		var k = c[g];
		n[k.id] = k
	}
	var a = [];
	for(var g = 0; g < c.length; g++) {
		var k = c[g];
		if(k.name == "verticalSeparatorBar" && !n[k.parent] && a.indexOf(k.id) < 0) {
			delete n[k.id]
		} else {
			if(k.name == "horizontalSeparatorBar" && !n[k.parent] && a.indexOf(k.id) < 0) {
				delete n[k.id]
			} else {
				if(k.name == "horizontalSeparator") {
					var m = Model.getShapeById(k.parent);
					var h = null;
					var l = 0;
					for(var f = 0; f < m.children.length; f++) {
						var e = m.children[f];
						var d = Model.getShapeById(e);
						if(d.name == "horizontalSeparator" && !n[e]) {
							l += 1
						} else {
							if(d.name == "verticalSeparatorBar") {
								h = d
							}
						}
					}
					if(l == 0 && h != null) {
						n[h.id] = h;
						if(a.indexOf(h.id) < 0) {
							a.push(h.id)
						}
					}
				} else {
					if(k.name == "verticalSeparator") {
						var m = Model.getShapeById(k.parent);
						var h = null;
						var l = 0;
						for(var f = 0; f < m.children.length; f++) {
							var e = m.children[f];
							var d = Model.getShapeById(e);
							if(d.name == "verticalSeparator" && !n[e]) {
								l += 1
							} else {
								if(d.name == "horizontalSeparatorBar") {
									h = d
								}
							}
						}
						if(l == 0 && h != null) {
							n[h.id] = h;
							if(a.indexOf(h.id) < 0) {
								a.push(h.id)
							}
						}
					}
				}
			}
		}
	}
	c = [];
	for(var b in n) {
		c.push(n[b])
	}
	return c
});
Designer.events.addEventListener("removed", function(b) {
	var c = b.shapes;
	var m = b.range;
	var s = b.changedIds;
	var g = [];
	var r = [];
	for(var j = 0; j < c.length; j++) {
		var o = c[j];
		if(o.name == "verticalLane" && m.indexOf(o.parent) < 0 && r.indexOf(o.parent) < 0) {
			r.push(o.parent)
		} else {
			if(o.name == "horizontalLane" && m.indexOf(o.parent) < 0 && r.indexOf(o.parent) < 0) {
				r.push(o.parent)
			} else {
				if(o.name == "verticalSeparatorBar" && m.indexOf(o.parent) < 0) {
					var q = Model.getShapeById(o.parent);
					q.props.w -= o.props.w;
					q.props.x += o.props.w;
					Designer.painter.renderShape(q);
					if(s.indexOf(o.parent) < 0) {
						s.push(o.parent);
						g.push(q)
					}
				} else {
					if(o.name == "horizontalSeparatorBar" && m.indexOf(o.parent) < 0) {
						var q = Model.getShapeById(o.parent);
						q.props.y += o.props.h;
						q.props.h -= o.props.h;
						Designer.painter.renderShape(q);
						if(s.indexOf(o.parent) < 0) {
							s.push(o.parent);
							g.push(q)
						}
					} else {
						if(o.name == "horizontalSeparator" && m.indexOf(o.parent) < 0 && r.indexOf(o.parent) < 0) {
							r.push(o.parent)
						} else {
							if(o.name == "verticalSeparator" && m.indexOf(o.parent) < 0 && r.indexOf(o.parent) < 0) {
								r.push(o.parent)
							}
						}
					}
				}
			}
		}
	}
	for(var n = 0; n < r.length; n++) {
		var l = r[n];
		var q = Model.getShapeById(l);
		if(q.name == "verticalPool") {
			var p = 0;
			var e = 0;
			for(var j = 0; j < q.children.length; j++) {
				var f = q.children[j];
				var d = Model.getShapeById(f);
				if(d.name == "verticalLane") {
					e++;
					p += d.props.w
				} else {
					if(d.name == "verticalSeparatorBar") {
						p += d.props.w
					}
				}
			}
			if(e > 0) {
				q.props.w = p;
				Designer.painter.renderShape(q);
				if(s.indexOf(l) < 0) {
					s.push(l);
					g.push(q)
				}
				var a = Utils.rangeChildren(q);
				g = g.concat(a)
			}
		} else {
			if(q.name == "horizontalPool") {
				var k = 0;
				var e = 0;
				for(var j = 0; j < q.children.length; j++) {
					var f = q.children[j];
					var d = Model.getShapeById(f);
					if(d.name == "horizontalLane") {
						e++;
						k += d.props.h
					} else {
						if(d.name == "horizontalSeparatorBar") {
							k += d.props.h
						}
					}
				}
				if(e > 0) {
					q.props.h = k;
					Designer.painter.renderShape(q);
					if(s.indexOf(l) < 0) {
						s.push(l);
						g.push(q)
					}
					var a = Utils.rangeChildren(q);
					g = g.concat(a)
				}
			}
		}
	}
	return g
});
Designer.events.addEventListener("shapeChanged", function(a) {});
