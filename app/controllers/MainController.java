package controllers;

import play.Routes;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class MainController extends Controller {
    
    public static Result index() {
        return ok(views.html.index.render("Hello from Java"));
    }
    
    public static Result getMessage() {
        return ok(Json.newObject().put("Message", "Hello Test"));
    }
    
    public static Result javascriptRoutes() {
        response().setContentType("text/javascript");
        return ok(
            Routes.javascriptRouter("jsRoutes",
                    controllers.routes.javascript.MainController.getMessage()
            )
        );
    }
}
