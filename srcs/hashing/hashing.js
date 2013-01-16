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
	$("#appContent").load(app.html);
	$("#appScript").load(app.js);
	$("#appStyle").load(app.css);
	$("#tl").html(app.corners.tl);
	$("#tr").html(app.corners.tr);
	$("#bl").html(app.corners.bl);
	$("#br").html(app.corners.br);
	currentApp = app;
}