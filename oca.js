var jugadores = [0,1];//Número de jugadores
var numTurnos = jugadores.length;
var tablero;//Asignar el canvas del html.
var contexto;//Asignar el contexto del canvas
var r ;//Casilla para la roja
var a ;//Casilla para la amarilla.
var rojaX, rojaY, amarillaX, amarillaY;//Coordenadas de las fichas.
//var dado = [1,2,3,4,5,6];
var turno;//Quien tira el dado.
var turnoRoja = false;
var turnoAmarilla = false;
var movimiento = 0;//Indica el avance o retroceso de la ficha que tiene el turno.

var turnosPerdidosRoja = 0;
var turnosPerdidosAmarilla = 0;
var turnosPerdidos = turnosPerdidosRoja + turnosPerdidosAmarilla;
/***************************************************************************/
function iniciar(){
	tablero = document.getElementById('tablero');
	tablero.width = 660;
	tablero.height = 660;
	contexto = tablero.getContext("2d");

	//Asignar las imagenes a sus objetos.
	fondo.imagen = new Image();//Una nueva imagen a la propiedad imagen del objeto fondo.
	fondo.imagen.src = fondo.imagenURL;//La dirección de la imagen.
	fondo.imagen.onload = confirmarFondo;//La carga de la imagen.
}
//Crear los objetos con las imagenes.
	var fondo = {
		imagenURL: "imagenes/juego_de_la_oca_tablero.png"
	};
//Confirmar la carga de las imágenes.
	function confirmarFondo(){
		fondo.imagenOK = true;
		dibujarFondo();
		dibujarFichaRoja();
		dibujarFichaAmarilla();
	}
function dibujarFondo(){
	var contexto = this.contexto;
	contexto.drawImage(fondo.imagen, 0,0);
}
function dibujarFichaRoja(){
	contexto.beginPath();
	contexto.arc(rojaX, rojaY, 15, 0, Math.PI *2, true);
	contexto.fillStyle = "#F00";
	contexto.fill();
	contexto.lineWidth = 3;
	contexto.strokeStyle = "black";
	contexto.stroke();
	contexto.closePath();
}
function dibujarFichaAmarilla(){
	contexto.beginPath();
	contexto.arc(amarillaX,amarillaY, 15, 0, Math.PI *2, true);
	contexto.fillStyle = "#FF0";
	contexto.fill();
	contexto.lineWidth = 3;
	contexto.strokeStyle = "black";
	contexto.stroke();
	contexto.closePath();
}
//Posiciones ficha roja.
var casillasRoja = [[],[125,590],[240,590],[300,590],[350,590],[405,590],[460,590],[518,590],[565,590],[595,560],[595,510],[595,460],[595,408],[595,353],[595,300],[595,248],[595,195],[595,142],[595,95],[565,65],[515,65],[465,65],[410,65],[360,65],[306,65],[253,65],[200,65],[147,65],[101,65],[67,94],[69,147],[69,200],[69,253],[69,308],[69,365],[69,418],[69,468],[100,495],[150,495],[203,495],[255,495],[308,495],[363,495],[417,495],[467,495],[503,465],[503,410],[503,352],[503,300],[503,245],[503,190],[470,155],[417,155],[361,155],[305,155],[250,155],[197,155],[165,197],[165,252],[165,310],[165,365],[195,407],[250,407],[310,330],[],[],[],[],[]];
//Posiciones ficha amarilla
	var casillasAmarilla = [[],[125,625],[240,625],[300,625],[350,625],[405,625],[460,625],[518,625],[575,625],[630,580],[630,510],[630,460],[630,408],[630,353],[630,300],[630,248],[630,195],[630,142],[630,70],[580,30],[515,30],[465,30],[410,30],[360,30],[306,30],[253,30],[200,30],[147,30],[80,30],[35,75],[35,147],[35,200],[35,253],[35,308],[35,365],[35,418],[35,488],[80,530],[150,530],[203,530],[255,530],[308,530],[363,530],[417,530],[480,530],[540,485],[540,410],[540,352],[540,300],[540,245],[540,160],[500,120],[417,120],[361,120],[305,120],[250,120],[170,120],[128,170],[128,252],[128,310],[128,385],[170,442],[250,442],[350,330],[],[],[],[],[]];
function situaFichas(){
	var posicionRoja = casillasRoja[r];
	rojaX = posicionRoja[0];
	rojaY = posicionRoja[1];
	var posicionAmarilla = casillasAmarilla[a];
	amarillaX = posicionAmarilla[0];
	amarillaY = posicionAmarilla[1];
}
function moverFichaRoja(){
	situaFichas();
	dibujarFondo();
	dibujarFichaRoja();
	dibujarFichaAmarilla();
	alerta(" ");
}
function moverFichaAmarilla(){
	situaFichas();
	dibujarFondo();
	dibujarFichaRoja();
	dibujarFichaAmarilla();
	alerta(" ");
}
function sorteoInicial(){
	turno = Math.round(Math.random()*(numTurnos-1));
	// console.log(turno);
	asignarTurno();
	iniciaPartida();
}
function iniciaPartida(){
	r = 1;
	a = 1;
	situaFichas();
	dibujarFondo();
	dibujarFichaRoja();
	dibujarFichaAmarilla();
	inicioJuego();
}
//turno de juego

function asignarTurno(){
	if(turno === 0){
		turnoRoja = true;
		turnoAmarilla = false;
		alerta("la ficha roja");
		cambiarCubilete();
	}
	if(turno == 1){
		turnoAmarilla = true;
		turnoRoja = false;
		alerta("la ficha Amarilla");
		cambiarCubilete();
	}
}
function cambiarTurno(){
	if(turnoRoja === true){
		turnoRoja = false;
		turnoAmarilla = true;
		 cambiarCubilete();
	}
	else if(turnoAmarilla === true){
		turnoAmarilla = false;
		turnoRoja = true;
		 cambiarCubilete();
	}
}
//Tirada de jugador
function tirada(){
	
	if(turnoRoja === true & turnosPerdidosRoja>0){
		turnosPerdidosRoja--;
		alerta("Turnos Perdidos Ficha Roja"+turnosPerdidosRoja);
		cambiarTurno();
		lanzarDado();
	}
	else if(turnoAmarilla === true & turnosPerdidosAmarilla>0){
		turnosPerdidosAmarilla--;
		alerta("Turnos Perdidos Ficha Amarilla"+turnosPerdidosAmarilla);
		cambiarTurno();
		lanzarDado();
	}	
	else if(turnosPerdidos ===0){
		// console.log("Turnos Perdidos"+turnosPerdidos);
		// console.log("Turnos Perdidos Ficha Roja"+turnosPerdidosRoja);
		// console.log("Turnos Perdidos Ficha Amarilla"+turnosPerdidosAmarilla);
		lanzarDado();
	}
	// console.log(dado.classList);
}
function lanzarDado(){
	movimiento = Math.round(Math.random()*(6-1)+1);
	// movimiento = 62;
	cambiarDado();
	alerta("...avanza "+ (movimiento) + " casillas");//Mostrar el movimiento que va ha realizar la ficha.
	window.setTimeout("moverFichas()",1500);//Retrasa el movimiento para que de tiempo de leer el mensaje.
}	
//Las fichas se mueven con la tirada del dado.
function moverFichas(){
		dado = document.getElementById("dadoEnJuego");
		cambiarCubilete();

	if(turnoRoja === true){
		r += movimiento;
		moverFichaRoja();
		//alert("Comprobando si es una casilla especial")
		comprobarCasilla(r);
		cambiarTurno();
	}
	else if(turnoAmarilla === true){
		a += movimiento;
		moverFichaAmarilla();
		//alert("Comprobando si es una casilla especial")
		comprobarCasilla(a);
		cambiarTurno();
	}
}
//Las fichas se mueven por haber caido en casillas especiales.
function moverFichasEspecial(){
	if(turnoRoja === true){
		r += movimiento;
		window.setTimeout("moverFichaRoja()",1500);
		//moverFichaRoja();
		cambiarTurno();
	}
	else if(turnoAmarilla === true){
		a += movimiento;
		window.setTimeout("moverFichaAmarilla()",1500);
		// moverFichaAmarilla();
		cambiarTurno();
	}
}
/*************************************************************************************/
//movimiento especiales
function comprobarCasilla(casilla){
	if(casilla == 5){
		casilla_5();
	}
	else if(casilla == 9){
		casilla_9();
	}
	else if(casilla == 14){
		casilla_14();
	}
	else if(casilla == 18){
		casilla_18();
	}
	else if(casilla == 23){
		casilla_23();
	}
	else if(casilla == 27){
		casilla_27();
	}
	else if(casilla == 32){
		casilla_32();
	}
	else if(casilla == 36){
		casilla_36();
	}
	else if(casilla == 41){
		casilla_41();
	}
	else if(casilla == 45){
		casilla_45();
	}
	else if(casilla == 50){
		casilla_50();
	}
	else if(casilla == 54){
		casilla_54();
	}
	else if(casilla == 59){
		casilla_59();
	}
	else if(casilla == 63){
		casilla_63();
	}
	//Puentes
	else if(casilla == 6){
		casilla_6();
	}
	else if(casilla == 12){
		casilla_12();
	}
	//Dados
	else if(casilla == 26){
		casilla_26();
	}
	else if(casilla == 53){
		casilla_53();
	}
	//Calavera
	else if(casilla == 58){
		casilla_58();
	}
	//El laberinto
	else if(casilla == 42){
		casilla_42();
	}
	//La posada 
	else if(casilla == 19){
		casilla_19();
	}
	//El pozo
	else if(casilla == 31){
		casilla_31();
	}
	//La carcel
	else if(casilla == 52){
		casilla_52();
	}
	//Casillas superiores al final cuando el movimiento lleva la ficha más alla de la meta.
	else if(casilla == 64){
		casilla_64();
	}
	else if(casilla == 65){
		casilla_65();
	}
	else if(casilla == 66){
		casilla_66();
	}
	else if(casilla == 67){
		casilla_67();
	}
	else if(casilla == 68){
		casilla_68();
	}
}
/************ Funciones para casillas con Oca *****************************************/
function alerta(mensaje){
	var alerta;
	alerta = document.getElementById("alerta");
	alerta.innerHTML = mensaje;

}
function casilla_5(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_9(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_14(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_18(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_23(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_27(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_32(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_36(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_41(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_45(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_50(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_54(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_59(){
	alerta('"De oca a oca y gane"');
	movimiento = 4;
	moverFichasEspecial();
	casilla_63();
}
function casilla_63(){
	alerta('"Gane!!!!!!!"');
	finPartida();
	ganador();
}
/************ Funciones para casillas con Puente *****************************************/
function casilla_6(){
	alerta('"De puente a puente y tiro porque me lleva la corriente"');
	movimiento = 6;
	moverFichasEspecial();
}
function casilla_12(){
	alerta('"De puente a puente y tiro porque me lleva la corriente"');
	movimiento = -6;
	moverFichasEspecial();
}
/************ Funciones para casillas con Dados *****************************************/
function casilla_26(){
	alerta('"De dados a dados y tiro porque me ha tocado"');
	movimiento = 27;
	moverFichasEspecial();
}
function casilla_53(){
	alerta('"De dados a dados y tiro porque me ha tocado"');
	movimiento = -27;
	moverFichasEspecial();
}
/************ Funcion para casilla Calavera *****************************************/
function casilla_58(){
	alerta('"Ohhhhhhhh vuelves a empezar"');
	movimiento = -57;
	moverFichasEspecial();
	cambiarTurno();
}
/************ Funcion para casilla Laberinto *****************************************/
function casilla_42(){
	alerta('"Del laberinto al 30"');
	movimiento = -12;
	moverFichasEspecial();
	cambiarTurno();
}
/************ Funciones de las casillas que pierden turnos ****************************/
function casilla_19(){
	alerta('"En la posada pierdes un turno"');
	if(turnoRoja === true){
		turnosPerdidosRoja = 1;
	}
	if(turnoAmarilla === true){
		turnosPerdidosAmarilla = 1;
	}
}
function casilla_31(){
	alerta('"En el pozo pierdes 2 turnos"');
	if(turnoRoja === true){
		turnosPerdidosRoja = 2;
	}
	if(turnoAmarilla === true){
		turnosPerdidosAmarilla = 2;
	}
}
function casilla_52(){
	alerta('"En la carcel te quedas por 3 turnos"');
	if(turnoRoja === true){
		turnosPerdidosRoja = 3;
	}
	if(turnoAmarilla === true){
		turnosPerdidosAmarilla = 3;
	}
}
/************ Funciones de las casillas más alla de la meta ****************************/
function casilla_64(){
	alerta('"Te pasaste retrocede una casilla"');
	movimiento = -2;
	moverFichasEspecial();
	cambiarTurno();
}
function casilla_65(){
	alerta('"Te pasaste retrocede 2 casillas"');
	movimiento = -4;
	moverFichasEspecial();
	cambiarTurno();
}
function casilla_66(){
	alerta('"Te pasaste retrocede 3 casillas"');
	movimiento = -6;
	moverFichasEspecial();
	cambiarTurno();
}
function casilla_67(){
	alerta('"Te pasaste retrocede 4 casillas"');
	movimiento = -8;
	moverFichasEspecial();
	cambiarTurno();
	casilla_59();
	alerta("Ganaste!!!");
}
function casilla_68(){
	alerta('"Te pasaste retrocede 5 casillas"');
	movimiento = -10;
	moverFichasEspecial();
	cambiarTurno();
	casilla_58();
}
//Modificar el cursor al pasar sobre elementos clickeables
function sobre(){
	var elementoDadoSorteo ;
	var elementoDado ;

	elementoDadoSorteo = document.getElementById("dadoSorteo");
	elementoDado = document.getElementById("dadoEnJuego");

	elementoDadoSorteo.style.cursor ="pointer";
	elementoDado.style.cursor ="pointer";
}
/***************************COMPORTAMIENTO DE LOS PANELES ***********************/
var panelInicio;
var panelSorteo;
var panelJuego;
var panelFinal;
function ocultarPanelInicio(){
	panelInicio = document.getElementById("panelInicio");
	panelInicio.classList.add("oculto");
	panelInicio.classList.remove("visible");
}
function mostrarPanelSorteo(){
	panelSorteo = document.getElementById("panelSorteo");
	panelSorteo.classList.remove("oculto");
	panelSorteo.classList.add("visible");
}
function ocultarPanelSorteo(){
	panelSorteo = document.getElementById("panelSorteo");
	panelSorteo.classList.remove("visible");
	panelSorteo.classList.add("oculto");
}
function mostrarPanelJuego(){
	panelJuego = document.getElementById("panelJuego");
	panelJuego.classList.remove("oculto");
	panelJuego.classList.add("visible");
}
function ocultarPanelJuego(){
	panelJuego = document.getElementById("panelJuego");
	panelJuego.classList.remove("visible");
	panelJuego.classList.add("oculto");
}
function mostrarPanelFinal(){
	panelFinal = document.getElementById("panelFinal");
	panelFinal.classList.remove("oculto");
	panelFinal.classList.add("visible");
}
function ocultarPanelFinal(){
	panelFinal = document.getElementById("panelFinal");
	panelFinal.classList.remove("visible");
	panelFinal.classList.add("oculto");
}
function jugar(){
	ocultarPanelInicio();
	ocultarPanelFinal();
	ocultarPanelJuego();
	mostrarPanelSorteo();
}
function inicioJuego(){
	ocultarPanelSorteo();
	mostrarPanelJuego();
}
function finPartida(){
	ocultarPanelJuego();
	mostrarPanelFinal();
}
/************************Ganador**************************************/
var victoriasRojo = 0;
var victoriasAmarillo = 0;
var marcadorRojo, marcadorAmarillo;
function ganador(){
	var dadoGanador = document.getElementById("dadoGanador");
	if(r == 63){
		dadoGanador.style.backgroundImage="url('imagenes/campeonRojo.png')";
		victoriasRojo = victoriasRojo + 1;
	}
	if(a == 63){
		dadoGanador.style.backgroundImage="url('imagenes/campeonAmarillo.png')";
		victoriasAmarillo = victoriasAmarillo + 1;
	}
actualizarMarcador();
console.log("Puntos amarillo " + victoriasAmarillo )
console.log("Puntos rojo " + victoriasRojo )
}
function actualizarMarcador(){
	marcadorAmarillo = document.getElementById("marcadorAmarillo");
	marcadorRojo = document.getElementById("marcadorRojo");
	marcadorRojo.value = victoriasRojo;
	marcadorAmarillo.value = victoriasAmarillo;
}
/*****************************Ficha en juego representada por el cubilete de su color.***********************/
	var dado ;
function cambiarCubilete(){
	dado = document.getElementById("dadoEnJuego");
	var dadoUrl;
	if(turnoRoja === true){
		// dado.classList.add("cubileteRojo");
		// dado.classList.remove("cubileteAmarillo")
		dadoUrl = "url(imagenes/cubileteRojo.png)";
		dado.style.backgroundImage=dadoUrl;
	}else if(turnoAmarilla ===true){
		// dado.classList.add("cubileteAmarillo");
		// dado.classList.remove("cubileteRojo");
		dadoUrl = "url(imagenes/cubileteAmarillo.png)";
		dado.style.backgroundImage=dadoUrl;
	}
}
/***************Cambiar el dado en función del  movimiento**************/
function cambiarDado(){
	dado = document.getElementById("dadoEnJuego");
	if(turnoRoja === true){
		var dadoUrl = "url(imagenes/dadoRojo_"+movimiento+".png)";
		dado.style.backgroundImage=dadoUrl;
	}
	else if(turnoAmarilla === true){
		var dadoUrl = "url(imagenes/dadoAmarillo_"+movimiento+".png)";
		dado.style.backgroundImage=dadoUrl;
	}
}
/*********************Jugador elige color*************************/
function seleccionarFicha(color){
	var colorJugador;
	var juegasCon;
	juegasCon = document.getElementById("colorJugador");
	if(color == "rojo"){
		colorJugador = color;
		juegasCon.innerHTML = "Juegas con la ficha roja"
		// alert("Color "+color);
	}
	else if(color == "amarillo"){
		colorJugador = color;
		juegasCon.innerHTML = "Juegas con la ficha amarilla"
		// alert("Color "+color)
	}
}