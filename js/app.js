(function(){
	/* ----------------------------- */
	/* Variables y Objetos Generales */
	/* ----------------------------- */

	// Variable donde guardamos el formulario de la app.
	var app = document.getElementById('app');

	// Variable donde guardamos el input de numero de caracteres.
	var inputCaracteres = document.getElementById('numero-caracteres');

	// Objeto que contiene toda la configuracion que usaremos para generar la contraseña.
	// Modificaremos este objeto para decidir si queremos o no simbolos, numeros o mayuculas.
	var configuracion = {
		caracteres: parseInt(inputCaracteres.value),
		simbolos: true,
		numeros: true,
		mayusculas: true,
		minusculas: true
	}

	// Objeto que contiene cadenas de texto con todos los caracteres que usaremos para generar la contraseña.
	// Caracteres separados por categoria (propiedad del objeto).
	var caracteres = {
		numeros: '0 1 2 3 4 5 6 7 8 9',
		simbolos: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
		mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
		minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
	}

	/* ----------------------------- */
	/* Eventos */
	/* ----------------------------- */

	// Evento para evitar que la app haga un submit para enviar los datos y se refresque la pagina.
	app.addEventListener('submit', function(e){
		e.preventDefault();
	});

	// Evento para el boton que incrementa en uno el numero de caracteres.
	app.elements.namedItem('btn-mas-uno').addEventListener('click', function(){
		configuracion.caracteres++;
		inputCaracteres.value = configuracion.caracteres;

		// console.log para comprobar que se incrementa el numero de caracteres
		// console.log('Numero de caracteres: ' + configuracion.caracteres);
	});

	// Evento para el boton que decrementa en uno el numero de caracteres.
	app.elements.namedItem('btn-menos-uno').addEventListener('click', function(){
		// Validamos que no puedan seleccionar un numero menor a 1
		if (configuracion.caracteres > 1) {
			configuracion.caracteres--;
			inputCaracteres.value = configuracion.caracteres;

			// console.log para comprobar que se incrementa el numero de caracteres.
			// console.log('Numero de caracteres: ' + configuracion.caracteres);
		}
	});

	// Evento para el boton de simbolos que activara o desactivara si queremos simbolos en la contraseña.
	app.elements.namedItem('btn-simbolos').addEventListener('click', function(){
		// Ejecutamos la funcion que alternara el icono y el fondo del boton.
		btnToggle(this);

		// Alternamos entre true y false en la propiedad del objeto de configuracion.
		configuracion.simbolos = !configuracion.simbolos;

		// console.log para comprobar que se activan y desactivan los simbolos.
		// console.log('Simbolos activados: ' + configuracion.simbolos);
	});

	// Evento para el boton de numeros que activara o desactivara si queremos numeros en la contraseña.
	app.elements.namedItem('btn-numeros').addEventListener('click', function(){
		// Ejecutamos la funcion que alternara el icono y el fondo del boton.
		btnToggle(this);

		// Alternamos entre true y false en la propiedad del objeto de configuracion.
		configuracion.numeros = !configuracion.numeros;

		// console.log para comprobar que se activan y desactivan los numeros.
		// console.log('Numeros activados: ' + configuracion.numeros);
	});

	// Evento para el boton de mayusculas que activara o desactivara si queremos mayusculas en la contraseña.
	app.elements.namedItem('btn-mayusculas').addEventListener('click', function(){
		// Ejecutamos la funcion que alternara el icono y el fondo del boton.
		btnToggle(this);

		// Alternamos entre true y false en la propiedad del objeto de configuracion.
		configuracion.mayusculas = !configuracion.mayusculas;

		// console.log para comprobar que se activan y desactivan los numeros.
		// console.log('Mayuscylas activadas: ' + configuracion.mayusculas);
	});

	// Evento para el boton de generar contraseña.
	app.elements.namedItem('btn-generar').addEventListener('click', function(){
		// Ejecutamos la funcion que generara la contraseña.
		generarPassword();
	});

	// Evento para el input de contraseña cuando reciba un click.
	app.elements.namedItem('input-password').addEventListener('click', function(){
		// Ejecutamos la funcion que copiara el texto.
		copiarPassword();
	});
	
	/* ----------------------------- */
	/* Funciones */
	/* ----------------------------- */
	
	// Funcion que permite alternar el estilo e icono de los botones.
	function btnToggle(elemento){
		elemento.classList.toggle('false');
		elemento.childNodes[0].classList.toggle('fa-check');
		elemento.childNodes[0].classList.toggle('fa-times');
	}
	
	// Funcion que genera la contraseña.
	function generarPassword(){
		// Variable en donde guardaremos la cadena de texto con todos los caracteres que podemos usar para generar la contraseña.
		var caracteresFinales = '';

		// Variable en donde guardaremos caracter por caractere la contraseña.
		var password = '';

		// Iteramos sobre el objeto configuracion para acceder a cada una de las propiedades.
		for(propiedad in configuracion){
			// Preguntamos si la propiedad es igual a true.
			// Entonces significa que si quiere aceptar simbolos / numeros / mayusculas.
			if (configuracion[propiedad] == true){
				// conso.log para identificar que es configuracion[propiedad].
				// console.log(configuracion[propiedad]);

				// A la variable de caracteres finales le sumamos la cadena de texto correspondiente a la iteracion actual.
				// En pocas palabras, vamos creando una cadena de texto que contiene todos los caracteres que si podemos usar.
				caracteresFinales += caracteres[propiedad] + ' ';
			}
		}

		// Eliminamos el ultimo espaciado que sobra en la cadena de texto.
		caracteresFinales = caracteresFinales.trim();

		// console.log para comprobar que la variable de caracteres finales contiene todos los caracteres que el usuario si quiere.
		// console.log(caracteresFinales);
		
		// Convertimos la cadena de texto de caracteres finales a un arreglo.
		caracteresFinales = caracteresFinales.split(' ');

		// Ciclo que genera la contraseña letra por letra al azar.
		for(var i = 0; i < configuracion.caracteres; i++){
			// A la variable password le vamos sumando una letra al azar por cada iteracion.
			// Primero tomamos un numero al azar que va del 0 al numero de caracteresFinales.
			// Y despues usamos ese numero para acceder a una posicion del arreglo al azar de caracteresFinales.
			password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)];
		}

		// Mostramos la password en el input de contraseña.
		app.elements.namedItem('input-password').value = password;
	}

	// Funcion que nos permite copiar el texto al portapapeles.
	function copiarPassword(){
		// Selecciona el texto de un input
		app.elements.namedItem('input-password').select();
		// Copiamos el Texto
		document.execCommand("copy");
		document.getElementById('alerta-copiado').classList.add('active');
		
		setTimeout(function(){
			document.getElementById('alerta-copiado').classList.remove('active');
		}, 2000)
	}

	// Generamos una password con la configuracion por defecto al cargar la pagina
	generarPassword();
}())