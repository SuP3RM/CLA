var navItems = [
  // add more labels/items for more options
  {"label": "About", "screen": "about", "icon": "info"},

];

$(document).ready(function() {

  // initialize all components with auto-init attributes
  window.mdc.autoInit();

  loadDrawerNavigationElements(navItems);

  loadScreen("home");

  // a constant that references MDCDrawer object
  const drawer = $("aside")[0].MDCDrawer;

  // open the drawer when the menu icon is clicked
  $(".mdc-top-app-bar__navigation-icon").on("click", function(){
    drawer.open = true;
  });

  // close the drawer and load the selected screen
  $("body").on('click', "nav .mdc-list-item", function (event){
    drawer.open = false;
    loadScreen($(this).attr("data-screen"));
  });

});


/**
 * load nav
 * @function
 * @param {array} navItems - array of items for the drawer
 */
function loadDrawerNavigationElements(navItems) {
  $.each(navItems, function(i,v) {
    if (v == "divider") {
        var divider = $("<hr>").addClass("mdc-list-divider");
        $("nav.mdc-list").append(divider);
    } else {    // create and append an anchor to the list
      var a = $("<a>").addClass("mdc-list-item");
      if (v.hasOwnProperty("icon")) {
        var icon = $("<i>").addClass("material-icons mdc-list-item__graphic");
        icon.text(v.icon);
        a.append(icon);
        a.attr("data-screen", v.screen);
      }
      a.append(v.label);
      $("nav.mdc-list").append(a);
    }
  });

  $("nav.mdc-list a:eq(0)").addClass("mdc-list-item--activated");

}

/**
 * load screen content via AJAX
 * @function
 * @param {string} screenName - name to load, without _
 */
function loadScreen(screenName) {
  $("#content").load("./screen-content/_" + screenName + ".html", function () {
    console.log("------ Screen load: " + screenName);
});

}
