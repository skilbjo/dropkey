(function($){
	var defaultOptions = {preloadImg:true};
	var jqTransformImgPreloaded = false;

})(jQuery);

jQuery(function() {
	var $ = jQuery;
    
    $(document).ready(function() {

        $("body").addClass("postload");
        
        $(document).scroll(function() {
            if ($(document).scrollTop() > $("#navigation").height()) {
                $("#navigation").addClass("bodynav");
                $("#wsite-menus").addClass("dropnav");
            }
            else {
                $("#navigation").removeClass("bodynav");
                $("#wsite-menus").removeClass("dropnav");
            }
        });
        
        
    });

});

