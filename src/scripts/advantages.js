$(".advantage__btn-more").on("click", function() {
  const $this = $(this);
  $this.prev().find(".advantage__detail-text").toggleClass("active");
  $this.toggleClass("active");
  $this.hasClass("active") ? $this.text("Скрыть") : $this.text("Подробнее");

})
