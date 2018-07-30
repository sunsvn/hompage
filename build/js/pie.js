var color1 = ["#32d6c5","#f173bd","#ef6064","#ff8549","#ffca63","#abdb9c","#3eb27e"],
	color2 = ["#afa9fe","#ffc65c","#fe8080","#f173bd","#32d6c5"],
	color3 = ["#fe8080","#32d6c5","#ffc65c","#afa9fe"],
	color4 = ["#fe8080","#ffc65c","#0fc7b4"],
	color5 = ["#5182e4","#ef6064","#ffa912","#f173bd","#5849a3","#ffca63","#3eb27e","#ff8549","#abdb9c","#32d6c5"];

function sliceSize(dataNum, dataTotal) {
	return(dataNum / dataTotal) * 360;
}

function addSlice(sliceSize, pieElement, offset, sliceID, color) {
	$(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
	var offset = offset - 1;
	var sizeRotation = -179 + sliceSize;
	$("." + sliceID).css({
		"transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
	});
	$("." + sliceID + " span").css({
		"transform": "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
		"background-color": color
	});
}

function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
	var sliceID = "s" + dataCount + "-" + sliceCount;
	var maxSize = 179;
	if(sliceSize <= maxSize) {
		addSlice(sliceSize, pieElement, offset, sliceID, color);
	} else {
		addSlice(maxSize, pieElement, offset, sliceID, color);
		iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
	}
}

function createPie(dataElement, pieElement, color,pieIndex) {
	var listData = [];
	$(dataElement).find('span').each(function() {
		listData.push(Number($(this).html()));
	});
	var listTotal = 0;
	for(var i = 0; i < listData.length; i++) {
		listTotal += listData[i];
	}
	var offset = 0;
	for(var i = 0; i < listData.length; i++) {
		var size = sliceSize(listData[i], listTotal);
		iterateSlices(size, pieElement, offset, i, pieIndex, color[i]);
		$(dataElement).find('li').eq(i+1).css("border-color", color[i]);
		offset += size;
	}
}



