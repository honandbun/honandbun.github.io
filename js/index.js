$(document).ready( function() {
 // init Isotope
 var $grid = $('.grid').isotope({
   itemSelector: '.grid-item'
 });

 // store filter for each group
 var filters = {};

 $('.filters').on( 'click', '.button', function() {
   var $this = $(this);

   // if clicking the about us button, show section before filtering (so it shows up)
   if($this[0].id === "header-about") {
     $('.aboutus').css("display", "block");
   }

   if($this[0].id === "header-howitworks") {
     $('.howitworks').css("display", "block");
   }

   // if clicking the recommendations or recipes button, don't filter
   if($this[0].id === "header-rec" || $this[0].id === "header-recipes") {
    return;
   }

   // get group key
   var $buttonGroup = $this.parents('.button-group');
   var filterGroup = $buttonGroup.attr('data-filter-group');
   // set filter for group
   filters[ filterGroup ] = $this.attr('data-filter');
   // combine filters
   var filterValue = concatValues( filters );
   // set filter for Isotope
   $grid.isotope({ filter: filterValue });
 });

 // change is-checked class on buttons
 $('.button-group').each( function( i, buttonGroup ) {
   var $buttonGroup = $( buttonGroup );
   $buttonGroup.on( 'click', 'button', function() {
     $buttonGroup.find('.is-checked').removeClass('is-checked');
     $( this ).addClass('is-checked');
   });
 });

 $('.aboutus').css("display", "none"); // hides the aboutus section on page load
 $('.howitworks').css("display", "none");
});

// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.isotope('layout');
});

// flatten object by concatting values
function concatValues( obj ) {
 var value = '';
 for ( var prop in obj ) {
   value += obj[ prop ];
 }
 return value;
}
