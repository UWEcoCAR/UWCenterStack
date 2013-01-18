var currentApp = appResources.home;

window.onload = function() {
	loadApp(currentApp);
	$("#tl").click(function() {
		loadApp(appResources[currentApp.corners.tl.toLowerCase()]);
	});
	$("#tr").click(function() {
		loadApp(appResources[currentApp.corners.tr.toLowerCase()]);
	});
	$("#bl").click(function() {
		loadApp(appResources[currentApp.corners.bl.toLowerCase()]);
	});
	$("#br").click(function() {
		loadApp(appResources[currentApp.corners.br.toLowerCase()]);
	});
}

function loadApp(app) {
	currentApp = app;
	$("#appContent").load(app.html);
	$("#appScript").load(app.js);
	$("#appStyle").load(app.css);
}

function loadCorners() {
	$("#tl").html(currentApp.corners.tl);
	$("#tr").html(currentApp.corners.tr);
	$("#bl").html(currentApp.corners.bl);
	$("#br").html(currentApp.corners.br);
}