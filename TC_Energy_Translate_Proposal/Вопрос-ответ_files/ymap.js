function init(city, address, myMapMark, myMapCentr, myZoom) {
	var myMap, 
		myPlacemark;
	
	var city    = (city === undefined) ? true : city,
		address = (address === undefined) ? true : address,
		myZoom    = (myZoom === undefined) ? 16 : myZoom;
		if (myMapMark !== undefined) {
			myMapMark = myMapMark.split(',').reverse();
			myMapMark[0] = parseFloat(myMapMark[0]);
			myMapMark[1] = parseFloat(myMapMark[1]);
		}
		if (myMapCentr !== undefined) {
			myMapCentr = myMapCentr.split(',').reverse();
			myMapCentr[0] = parseFloat(myMapCentr[0]);
			myMapCentr[1] = parseFloat(myMapCentr[1]);
		}
	
	// Поиск координат центра Нижнего Новгорода.
	ymaps.geocode( city + ' ' + address, { results: 1 }).then(function (res) {
		// Выбираем первый результат геокодирования.
		var firstGeoObject = res.geoObjects.get(0);
		myMapMark    = (myMapMark === undefined) ? firstGeoObject.geometry.getCoordinates() : myMapMark;	
		myMapCentr    = (myMapCentr === undefined) ? firstGeoObject.geometry.getCoordinates() : myMapCentr;
		myMap = new ymaps.Map ("map", {
			center: myMapCentr,
			zoom: myZoom
		}); 
		
		myPlacemark = new ymaps.Placemark(myMapMark, {
			hintContent: address,
			balloonContent: 'ООО "Энергия" <br> Офис <br> '+ city + " " + address
		});
			
		myMap.geoObjects.add(
			myPlacemark
		);
		
		// Создание экземпляра элемента управления
		myMap.controls.add(
		   new ymaps.control.ZoomControl()
		);

		// Обращение к конструктору класса элемента
		// управления по ключу
		myMap.controls.add(
			'typeSelector'
		);
		
	}, function (err) {
		// Если геокодирование не удалось, сообщаем об ошибке.
		alert(err.message);
	});
}