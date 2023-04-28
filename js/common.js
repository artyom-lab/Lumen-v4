$(document).ready(function() {

$(document).on('click.bs.dropdown.data-api', '.dropdown-menu', function (e) { 
    e.stopPropagation();
  });

$(".owl-4").owlCarousel({
  items: 1,
  smartSpeed: 1200,
  touchDrag: false,
  mouseDrag: false,
});

var owl1 = $(".owl-1");
owl1.owlCarousel({
  items: 1,
  smartSpeed: 1200,
  touchDrag: false,
  mouseDrag: false,
  loop: true,
});

$('body').on('click', '.click-slide', function() {
  $(this).find(owl1).trigger('next.owl.carousel');
  $(this).siblings(owl1).trigger('next.owl.carousel');
});

Waves.attach('.wave', ['waves-light']);
Waves.attach('.wave2, .dropdown-2 .dropdown-menu a', ['waves-dark']);
Waves.init();

$(".close-metrics").on("click", function(){
  $(this).closest(".metric-alert").hide();
});

$('#sidebar-switcher').on('change', function() {
  if ($(this).is(':checked')) 
    $('.sidebar-2').addClass('sidebar-absolute');
  else 
    $('.sidebar-2').removeClass('sidebar-absolute');
});

$("#sandwich-1").on("click", function() {
	$(this).toggleClass("active");
	$("body").toggleClass("menubar-1");
  $("html").toggleClass("o-hidden");
  $(".form-dropdown").toggleClass("form-transform");
  window.dispatchEvent(new Event('resize'));
});

$("#sandwich-2").on("click", function() { 
	$(this).toggleClass("active");
	$("body").toggleClass("menubar-2");
  $("html").toggleClass("o-hidden");
});

$(".link-tablist").on("click", function() {
  window.dispatchEvent(new Event('resize'));
});

// DARK-MODE

$('#dark-mode').on('change', function() {
  if ($(this).is(':checked')) {
    $('body').addClass('dark-mode');
    darkModeChart();
  }
  else {
    $('body').removeClass('dark-mode');
    lightModeChart();
  }
});

// SIDEBAR-1

$(".sidebar-1").hover(function(){
  $(this).removeClass("sidebar-small");
});

$(".link-tablist").on("click", function(){
  if ($(this).hasClass('active')) 
    $('body').toggleClass('menubar-pitches');
  else 
    $('body').addClass('menubar-pitches');
});

if (window.matchMedia('(min-width: 1200px)').matches)
{
  $(".link-tablist").on("click", function(){
  $(".sidebar-1").addClass("sidebar-small");
    });
}

// FORMS

$(".btn-cross").on("click", function(){
  $(".row-hidden").hide();
});

$(".btn-cancel-store").on("click", function(){
  $(".collapse-store").removeClass("show");
});

$(".btn-cancel-attr").on("click", function(){
  $(".collapse-attr").removeClass("show");
});

$(".news-select").on("click", function(){
  $(this).closest(".dropdown").removeClass("show");
  $(this).closest(".dropdown-menu").removeClass("show");
  $(".hidden-store").removeClass("d-none");
  $(".row-hidden").show();
});

  $("#v-pills-store-tab").on("click", function(){
    $(this).removeClass("done");
    $("#v-pills-quote-tab, #v-pills-monthly-tab, #v-pills-review-tab").removeClass("done");
  });

  $("#v-pills-quote-tab").on("click", function(){
    $(this).removeClass("done");
    $("#v-pills-store-tab").addClass("done");
    $("#v-pills-monthly-tab, #v-pills-review-tab").removeClass("done");
  });

  $("#v-pills-monthly-tab").on("click", function(){
    $(this).removeClass("done");
    $("#v-pills-store-tab, #v-pills-quote-tab").addClass("done");
    $("#v-pills-review-tab").removeClass("done");
  });

  $("#v-pills-review-tab").on("click", function(){
    $(this).removeClass("done");
    $("#v-pills-store-tab, #v-pills-quote-tab, #v-pills-monthly-tab").addClass("done");
  });

// SELECT

  $('.select-beast').selectize({});

// CHECKBOXES

$(document).ready(function () {
  var count_checked = $('.checkbox-block').find('input:checkbox:checked').length; 
  if (count_checked == 0)  {
    $(".metric-selected").hide();
  }
  $('.checkbox-block').find('input:checkbox').change(function () {
    if ($('.checkbox-block').find('input:checkbox:checked').length) {
      $('.metric-selected').hide();
      $('.checkbox-block').find('input:checkbox:checked').each(function () {
        $('.metric-selected[data-id*="' + $(this).attr('id') + '"]').show();
      }); 
    } else if(count_checked == 0) {
      $(".metric-selected").hide(); 
    }
  });
  $('.tag-list').find('.metric-selected').click(function () {
    $(this).closest(".metric-selected").hide(); 
    $('.checkbox-block').find('input:checkbox:checked[id=' + $(this).attr('data-id') + ']').prop("checked", false); 
  });
});

// CALENDAR

$('[data-toggle="popover"]').popover()

var start = moment("03/04/2023"),
    end   = moment("04/08/2023");

function cb(start, end) {
    $('#reportrange').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
};

$('#reportrange').daterangepicker({
    startDate: start,
    endDate: end,
}, cb);

cb(start, end);

$('input[name="birthday1"]').daterangepicker({
  singleDatePicker: true,
  showDropdowns: true,
  minYear: 2000,
  maxYear: parseInt(moment().format('YYYY'),10)
});

});

// DRAG-N-DROP

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

