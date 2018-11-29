Schema.addCategory({
	name: "flow",
	text: "Flowchart 流程图",
	dataAttributes: [{
		name: "序号",
		type: "number",
		value: "",
		category: "default"
	}, {
		name: "名称",
		type: "string",
		value: "",
		category: "default"
	}, {
		name: "所有者",
		type: "string",
		value: "",
		category: "default"
	}, {
		name: "连接",
		type: "link",
		value: "",
		category: "default"
	}, {
		name: "便笺",
		type: "string",
		value: "",
		category: "default"
	}, {
		name: "成本",
		type: "number",
		value: "",
		category: "default"
	}, {
		name: "时间",
		type: "number",
		value: "",
		category: "default"
	}, {
		name: "部门",
		type: "string",
		value: "",
		category: "default"
	}, {
		name: "输入",
		type: "string",
		value: "",
		category: "default"
	}, {
		name: "输出",
		type: "string",
		value: "",
		category: "default"
	}, {
		name: "风险",
		type: "string",
		value: "",
		category: "default"
	}, {
		name: "备注",
		type: "string",
		value: "",
		category: "default"
	}]
});
Schema.addShape({
	name: "process",
	title: "流程",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	path: [{
		actions: {
			ref: "rectangle"
		}
	}]
});
Schema.addShape({
	name: "decision",
	title: "判定",
	category: "flow",
	props: {
		w: 90,
		h: 70
	},
	path: [{
		actions: [{
			action: "move",
			x: "0",
			y: "h/2"
		}, {
			action: "line",
			x: "w/2",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "h/2"
		}, {
			action: "line",
			x: "w/2",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "h/2"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "terminator",
	title: "开始/结束",
	category: "flow",
	props: {
		w: 100,
		h: 50
	},
	path: [{
		actions: [{
			action: "move",
			x: "Math.min(w,h)/3",
			y: "0"
		}, {
			action: "line",
			x: "w-Math.min(w,h)/3",
			y: "0"
		}, {
			action: "curve",
			x1: "w+Math.min(w,h)/3/3",
			y1: "0",
			x2: "w+Math.min(w,h)/3/3",
			y2: "h",
			x: "w-Math.min(w,h)/3",
			y: "h"
		}, {
			action: "line",
			x: "Math.min(w,h)/3",
			y: "h"
		}, {
			action: "curve",
			x1: "-Math.min(w,h)/3/3",
			y1: "h",
			x2: "-Math.min(w,h)/3/3",
			y2: "0",
			x: "Math.min(w,h)/3",
			y: "0"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "document",
	title: "文档",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	anchors: [{
		x: "w*0.5",
		y: "0"
	}, {
		x: "w",
		y: "h*0.5"
	}, {
		x: "w*0.5",
		y: "h-Math.min(h/8,w/12)"
	}, {
		x: "0",
		y: "h*0.5"
	}],
	textBlock: [{
		position: {
			x: "0",
			y: "0",
			w: "w",
			h: "h*0.9"
		}
	}],
	path: [{
		actions: [{
			action: "move",
			x: "0",
			y: "h-Math.min(h/8,w/12)"
		}, {
			action: "line",
			x: "0",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "h-Math.min(h/8,w/12)"
		}, {
			action: "quadraticCurve",
			x1: "w*0.75",
			y1: "h-3*Math.min(h/8,w/12)",
			x: "w*0.5",
			y: "h-Math.min(h/8,w/12)"
		}, {
			action: "quadraticCurve",
			x1: "w*0.25",
			y1: "h+Math.min(h/8,w/12)",
			x: "0",
			y: "h-Math.min(h/8,w/12)"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "data",
	title: "数据",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	anchors: [{
		x: "w*0.5",
		y: "0"
	}, {
		x: "w-Math.min(h/3,w/3)/2",
		y: "h*0.5"
	}, {
		x: "w*0.5",
		y: "h"
	}, {
		x: "Math.min(h/3,w/3)/2",
		y: "h*0.5"
	}],
	textBlock: [{
		position: {
			x: "w*0.15",
			y: "0",
			w: "w*0.7",
			h: "h"
		}
	}],
	path: [{
		actions: [{
			action: "move",
			x: "Math.min(h/3,w/3)",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "0"
		}, {
			action: "line",
			x: "w-Math.min(h/3,w/3)",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "h"
		}, {
			action: "line",
			x: "Math.min(h/3,w/3)",
			y: "0"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "predefinedProcess",
	title: "子流程",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	textBlock: [{
		position: {
			x: "Math.min(w/6,20)",
			y: "0",
			w: "w-Math.min(w/6,20)*2",
			h: "h"
		}
	}],
	path: [{
		actions: [{
			action: "move",
			x: "0",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "0"
		}, {
			action: "close"
		}, {
			action: "move",
			x: "Math.min(w/6,20)",
			y: "0"
		}, {
			action: "line",
			x: "Math.min(w/6,20)",
			y: "h"
		}, {
			action: "move",
			x: "w- Math.min(w/6,20)",
			y: "0"
		}, {
			action: "line",
			x: "w- Math.min(w/6,20)",
			y: "h"
		}]
	}]
});
Schema.addShape({
	name: "storedData",
	title: "外部数据",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	anchors: [{
		x: "w*0.5",
		y: "0"
	}, {
		x: "w-Math.min(w/8,h/8)",
		y: "h*0.5"
	}, {
		x: "w*0.5",
		y: "h"
	}, {
		x: "0",
		y: "h*0.5"
	}],
	textBlock: [{
		position: {
			x: "w*0.1",
			y: "0",
			w: "w*0.75",
			h: "h"
		}
	}],
	path: [{
		actions: [{
			action: "move",
			x: "w/6",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "0"
		}, {
			action: "curve",
			x1: "w-w/6",
			y1: "0",
			x2: "w-w/6",
			y2: "h",
			x: "w",
			y: "h"
		}, {
			action: "line",
			x: "w/6",
			y: "h"
		}, {
			action: "curve",
			x1: "-w/17",
			y1: "h",
			x2: "-w/17",
			y2: "0",
			x: "w/7",
			y: "0"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "internalStorage",
	title: "内部存储",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	textBlock: [{
		position: {
			x: "Math.min(w/6,20)",
			y: "Math.min(h/5,20)",
			w: "w - Math.min(w/6,20)",
			h: "h- Math.min(h/5,20)"
		}
	}],
	path: [{
		actions: [{
			action: "move",
			x: "0",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "0"
		}, {
			action: "close"
		}, {
			action: "move",
			x: "Math.min(w/6,20)",
			y: "0"
		}, {
			action: "line",
			x: "Math.min(w/6,20)",
			y: "h"
		}, {
			action: "move",
			x: "0",
			y: "Math.min(h/5,20)"
		}, {
			action: "line",
			x: "w",
			y: "Math.min(h/5,20)"
		}]
	}]
});
Schema.addShape({
	name: "sequentialData",
	title: "队列数据",
	category: "flow",
	props: {
		w: 70,
		h: 70
	},
	path: [{
		actions: [{
			action: "move",
			x: "w/2",
			y: "h"
		}, {
			action: "curve",
			x1: "w/2-w*2/3",
			y1: "h",
			x2: "w/2-w*2/3",
			y2: "0",
			x: "w/2",
			y: "0"
		}, {
			action: "curve",
			x1: "w/2+w*2/3",
			y1: "0",
			x2: "w/2+w*2/3",
			y2: "h",
			x: "w/2",
			y: "h"
		}, {
			action: "line",
			x: "w",
			y: "h"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "directData",
	title: "数据库",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	textBlock: [{
		position: {
			x: "0",
			y: "0",
			w: "w*0.8",
			h: "h"
		}
	}],
	path: [{
		actions: [{
			action: "move",
			x: "w*0.15",
			y: "0"
		}, {
			action: "line",
			x: "w-h/6",
			y: "0"
		}, {
			action: "curve",
			x1: "w+h/22",
			y1: "0",
			x2: "w+h/22",
			y2: "h",
			x: "w-h/6",
			y: "h"
		}, {
			action: "line",
			x: "w*0.15",
			y: "h"
		}, {
			action: "curve",
			x1: "-w*0.05",
			y1: "h",
			x2: "-w*0.05",
			y2: "0",
			x: "w*0.15",
			y: "0"
		}, {
			action: "close"
		}, {
			action: "move",
			x: "w-h/6",
			y: "0"
		}, {
			action: "curve",
			x1: "w-h/8*3",
			y1: "0",
			x2: "w-h/8*3",
			y2: "h",
			x: "w-h/6",
			y: "h"
		}, {
			action: "curve",
			x1: "w-h/8*3",
			y1: "h",
			x2: "w-h/8*3",
			y2: "0",
			x: "w-h/6",
			y: "0"
		}]
	}]
});
Schema.addShape({
	name: "manualInput",
	title: "人工输入",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	anchors: [{
		x: "0",
		y: "h*0.5"
	}, {
		x: "w*0.5",
		y: "Math.min(h/2,w/6)/2"
	}, {
		x: "w",
		y: "h*0.5"
	}, {
		x: "w*0.5",
		y: "h"
	}],
	textBlock: [{
		position: {
			x: "0",
			y: "h*0.1",
			w: "w",
			h: "h*0.9"
		}
	}],
	path: [{
		actions: [{
			action: "move",
			x: "0",
			y: "Math.min(h/2,w/6)"
		}, {
			action: "line",
			x: "w",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "Math.min(h/2,w/6)"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "card",
	title: "卡片",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	path: [{
		actions: [{
			action: "move",
			x: "0",
			y: "Math.min(h/2,w/4)"
		}, {
			action: "line",
			x: "Math.min(h/2,w/4)",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "Math.min(h/2,w/4)"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "paperTape",
	title: "条带",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	textBlock: [{
		position: {
			x: "0",
			y: "h*0.1",
			w: "w",
			h: "h*0.8"
		}
	}],
	anchors: [{
		x: "w*0.5",
		y: "Math.min(Math.min(w,h)/8,w/12)"
	}, {
		x: "w",
		y: "h*0.5"
	}, {
		x: "w*0.5",
		y: "h-Math.min(Math.min(w,h)/8,w/12)"
	}, {
		x: "0",
		y: "h*0.5"
	}],
	path: [{
		actions: [{
			action: "move",
			x: "0",
			y: "Math.min(Math.min(w,h)/8,w/12)"
		}, {
			action: "quadraticCurve",
			x1: "w*0.25",
			y1: "3*Math.min(Math.min(w,h)/8,w/12)",
			x: "w*0.5",
			y: "Math.min(Math.min(w,h)/8,w/12)"
		}, {
			action: "quadraticCurve",
			x1: "w*0.75",
			y1: "-Math.min(Math.min(w,h)/8,w/12)",
			x: "w",
			y: "Math.min(Math.min(w,h)/8,w/12)"
		}, {
			action: "line",
			x: "w",
			y: "h-Math.min(Math.min(w,h)/8,w/12)"
		}, {
			action: "quadraticCurve",
			x1: "w*0.75",
			y1: "h-3*Math.min(Math.min(w,h)/8,w/12)",
			x: "w*0.5",
			y: "h-Math.min(Math.min(w,h)/8,w/12)"
		}, {
			action: "quadraticCurve",
			x1: "w*0.25",
			y1: "h+Math.min(Math.min(w,h)/8,w/12)",
			x: "0",
			y: "h-Math.min(Math.min(w,h)/8,w/12)"
		}, {
			action: "line",
			x: "0",
			y: "Math.min(Math.min(w,h)/8,w/12)"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "display",
	title: "展示",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	path: [{
		actions: [{
			action: "move",
			x: "w-w/6",
			y: "0"
		}, {
			action: "line",
			x: "w/6",
			y: "0"
		}, {
			action: "line",
			x: "0",
			y: "h/2"
		}, {
			action: "line",
			x: "w/6",
			y: "h"
		}, {
			action: "line",
			x: "w-w/6",
			y: "h"
		}, {
			action: "quadraticCurve",
			x1: "w",
			y1: "h",
			x: "w",
			y: "h*0.5"
		}, {
			action: "quadraticCurve",
			x1: "w",
			y1: "0",
			x: "w-w/6",
			y: "0"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "manualOperation",
	title: "人工操作",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	textBlock: [{
		position: {
			x: "w*0.1",
			y: "0",
			w: "w*0.8",
			h: "h"
		}
	}],
	anchors: [{
		x: "w*0.5",
		y: "0"
	}, {
		x: "w-Math.min(h/2,w/6)/2",
		y: "h*0.5"
	}, {
		x: "w*0.5",
		y: "h"
	}, {
		x: "Math.min(h/2,w/6)/2",
		y: "h*0.5"
	}],
	path: [{
		actions: [{
			action: "move",
			x: "0",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "0"
		}, {
			action: "line",
			x: "w-Math.min(h/2,w/6)",
			y: "h"
		}, {
			action: "line",
			x: "Math.min(h/2,w/6)",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "0"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "preparation",
	title: "预备",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	path: [{
		actions: [{
			action: "move",
			x: "0",
			y: "h*0.5"
		}, {
			action: "line",
			x: "Math.min(h/2,w/6)",
			y: "0"
		}, {
			action: "line",
			x: "w-Math.min(h/2,w/6)",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "h/2"
		}, {
			action: "line",
			x: "w-Math.min(h/2,w/6)",
			y: "h"
		}, {
			action: "line",
			x: "Math.min(h/2,w/6)",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "h/2"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "parallelMode",
	title: "并行模式",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	anchors: [{
		x: "w*0.5",
		y: "0"
	}, {
		x: "w*0.5",
		y: "0"
	}, {
		x: "w*0.5",
		y: "h"
	}, {
		x: "w*0.5",
		y: "h"
	}],
	path: [{
		actions: [{
			action: "move",
			x: "0",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "0"
		}, {
			action: "line",
			x: "0",
			y: "0"
		}, {
			action: "move",
			x: "0",
			y: "h"
		}, {
			action: "line",
			x: "w",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "h"
		}, {
			action: "close"
		}]
	}, {
		fillStyle: {
			type: "none"
		},
		lineStyle: {
			lineWidth: 0
		},
		actions: [{
			action: "move",
			x: "0",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "0"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "loopLimit",
	title: "循环限值",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	path: [{
		actions: [{
			action: "move",
			x: "0",
			y: "Math.min(h/2,w/6)"
		}, {
			action: "line",
			x: "Math.min(h/2,w/6)",
			y: "0"
		}, {
			action: "line",
			x: "w-Math.min(h/2,w/6)",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "Math.min(h/2,w/6)"
		}, {
			action: "line",
			x: "w",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "Math.min(h/2,w/6)"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "onPageReference",
	title: "页面内引用",
	category: "flow",
	props: {
		w: 70,
		h: 70
	},
	path: [{
		actions: {
			ref: "round"
		}
	}]
});
Schema.addShape({
	name: "offPageReference",
	title: "跨页引用",
	category: "flow",
	props: {
		w: 70,
		h: 60
	},
	textBlock: [{
		position: {
			x: "0",
			y: "0",
			w: "w",
			h: "h-Math.min(h,w)/3"
		}
	}],
	path: [{
		actions: [{
			action: "move",
			x: "0",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "h-Math.min(h,w)/3"
		}, {
			action: "line",
			x: "w*0.5",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "h-Math.min(h,w)/3"
		}, {
			action: "line",
			x: "0",
			y: "0"
		}, {
			action: "close"
		}]
	}]
});
Schema.addShape({
	name: "annotation",
	title: "注释",
	category: "flow",
	props: {
		w: 100,
		h: 70
	},
	anchors: [{
		x: "0",
		y: "h*0.5"
	}, {
		x: "0",
		y: "h*0.5"
	}, {
		x: "0",
		y: "h*0.5"
	}, {
		x: "0",
		y: "h*0.5"
	}],
	path: [{
		fillStyle: {
			type: "none"
		},
		actions: [{
			action: "move",
			x: "Math.min(w/6, 20)",
			y: "0"
		}, {
			action: "line",
			x: "0",
			y: "0"
		}, {
			action: "line",
			x: "0",
			y: "h"
		}, {
			action: "line",
			x: "Math.min(w/6, 20)",
			y: "h"
		}]
	}, {
		fillStyle: {
			type: "none"
		},
		lineStyle: {
			lineWidth: 0
		},
		actions: [{
			action: "move",
			x: "0",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "0"
		}, {
			action: "line",
			x: "w",
			y: "h"
		}, {
			action: "line",
			x: "0",
			y: "h"
		}, {
			action: "close"
		}, ]
	}]
});