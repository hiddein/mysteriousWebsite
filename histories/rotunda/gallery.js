$(document).ready(function(){
	// Заполнить галерею
	appendPicToGallery();

	var preventClick=false;
	
	// Отключить открытие изображения после его перетаскивания
	$(".pic a").bind("click",function(e){
		if(preventClick)
		{
			e.stopImmediatePropagation();
			e.preventDefault();
		}
	});

	// Для работы перетаскивания фоток
	$(".pic").draggable({
		containment: 'parent',

		start: function(e,ui){
			preventClick=true;
		},
		
		stop: function(e, ui) {
			setTimeout(function(){ preventClick=false; }, 250);
		}
	});


	// Перемещение изображения на передний план после клика по нему
	$('.pic').mousedown(function(e){
		
		var maxZ = 0;
		$('.pic').each(function(){
			var thisZ = parseInt($(this).css('zIndex'))
			if(thisZ>maxZ) maxZ=thisZ;
		});
		
		// Нажатие по блоку картинки
		if($(e.target).hasClass("pic"))
		{
			$(e.target).css({zIndex:maxZ+1});
		} // Нажатие по ссылке на картинку
		else $(e.target).closest('.pic').css({zIndex:maxZ+1});
	});


	$.fancybox.defaults.animationDuration = 1000;
	
});


/// Генерация случайного числа из заданного диапазона
function randBetween(n1, n2) {
    var r = (Math.random() * (n2 - n1)) + n1;
    return r;
}

/// Добавить картинки в галерею
function appendPicToGallery()
{
	// Настройки откуда брать фотки
	const previewDir = "/img/rotunda/fancyboxGallery/thumbs/";
	const fullDir = "/img/rotunda/fancyboxGallery/original/";
	// Количество картинок, названия фоток цифрами по порядку от 1
	const pitureCount = 20;

	var gallery = $(".boardGallery");

	for (var i = 1; i <= pitureCount; i++) {

		var top = randBetween(50, gallery.height() - 150) + "px";
		var left = randBetween(100, gallery.width() - 200) + "px";
		var rot = randBetween(-45, 45) + "deg";
		var pathPreview = previewDir + i + ".jpg";
		var pathFull = fullDir + i + ".jpg";

		gallery.append(
			`<div class="pic" style="top:${top};left:${left};background:url(${pathPreview}) no-repeat 50% 50%; -moz-transform:rotate(${rot}); -webkit-transform:rotate(${rot});">` +
			`<a data-fancybox="gallery" href="${pathFull}"></a>`
		);
	}
}