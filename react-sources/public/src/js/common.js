$(document).ready(function() {
	
	// Edit form
	if ($(".filter-control").length) {
		$(".filter-control").on("click", ".filter-control-option a", function(e){
			e.preventDefault();

			// Hide option
			$(this).parent().fadeOut(250, function(){
				$(this).remove();
			});
		});
	}

	// 
	if ($(".js-popup").length) {
		$('.js-popup').click(function(e){
			e.preventDefault();

			var id = $(this).data("id");

			$.magnificPopup.open({
				items: {
				   src: id,
				   type: 'inline'				   
				},
				mainClass: 'mfp-fade',
				showCloseBtn: false,
				removalDelay: 300
			});

		});

		$(document).on("click", ".js-popup-close", function(e){
			e.preventDefault();
			$.magnificPopup.close();
		});
	}

	if ($(".js-tpl-page-popup").length) {
		$('.js-tpl-page-popup').click(function(e){
			e.preventDefault();

			var title = $(this).attr("title") || "";

			$.magnificPopup.open({
				items: {
				   src: $(this).data("url"),
				   type: 'image'				   
				},
				mainClass: 'mfp-fade',
				showCloseBtn: false,
				removalDelay: 300,
				image: { 
			     verticalFit: true,
			     titleSrc: function(item) {
					return title;
				 },
			     markup: '<div class="mfp-figure mfp-figure--page">'+
		            '<a href="javascript:void(0);" class="popup-close-button-whitebox js-popup-close"></a>'+
		            '<div class="mfp-img"></div>'+
		            '<div class="mfp-bottom-bar">'+
		              '<div class="mfp-title"></div>'+
		            '</div>'+
		          '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button		          
				}
			});

		});
	}

});