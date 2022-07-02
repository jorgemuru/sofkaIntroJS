//Creo la clase tablero (clase board)
(function(){
    //Defino los atributos a traves de un constructor.
    self.Tablero = function(pAncho, pAlto){
        this.ancho = pAncho;
        this.alto = pAlto;
        this.jugando = false;
        this.finJuego = false;
        this.barras = [];
        //this.pelota = null;
    }

    //Defino los metodos de la clase tablero
    self.Tablero.prototype = {
        //Getter y setter
        get elements(){
            var elements = this.barras;
            //elements.push(this.pelota);

            return elements;
        }
    }
})();//Fin clase tablero

//Creo la clase Barras
(function(){
    //Defino atributos y creo su constructor
    self.Barra = function(x, y, pAncho, pAlto, pTablero){
        this.x = x;
        this.y = y;
        this.ancho = pAncho;
        this.alto = pAlto;
        this.tablero = pTablero;
        this.figura = "rectangulo";
        this.tablero.barras.push(this);
        this.velocidad = 10;

    }

    self.Barra.prototype = {
        abajo: function(){
            this.y += this.velocidad;
        },
        arriba: function(){
            this.y -= this.velocidad;
        },
        toString: function(){
            return "x: " + this.x + " y: " + this.y; 
        }
    }


})();//Fin clase Barras

//Creo la clase ke muestra el tablero
(function(){
    //Defino atributos y creo su constructor
    self.TableroVista = function(pCanvas,pTablero){
        this.canvas = pCanvas;
        this.canvas.alto = pTablero.alto;
        this.canvas.ancho = pTablero.ancho;
        this.tablero = pTablero;
        this.contexto = pCanvas.getContext("2d");
    }

    //Declaro metodos de la clase
    self.TableroVista.prototype = {
        limpiar: function(){
            this.contexto.clearRect(0, 0, this.tablero.ancho, this.tablero.alto);
        },
        dibujar: function(){
            for(var i = this.tablero.elements.length -1; i >= 0; i--){
                var unElemento = this.tablero.elements[i];
                dibujar(this.contexto, unElemento);
            };
        }
    }
    //Funcion para dibujar los elementos en el Tablero
    function dibujar(pContexto, pElemento){
        switch(pElemento.figura){
            case "rectangulo":
                pContexto.fillRect(pElemento.x, pElemento.y, pElemento.ancho, pElemento.alto);
                break;
            case "circulo":
                pContexto.beginPath();
                pContexto.arc(pElemento.x, pElemento.y, radius, 0,7);
                pContexto.fill();
                pContexto.closePath();
                break;
        }
    }   
})();//Fin clase tableroVista

//Declaro e instancio el Tablero y sus "manejadores"
var unTablero = new Tablero(400, 800);
var barraUno = new Barra(20, 100, 20, 100, unTablero);
var barraDos = new Barra(700, 100, 20, 100, unTablero);
var canvas = document.getElementById('canvas');
var unTableroVista = new TableroVista(canvas,unTablero);

//Agrego evento ke permite el movimiento de las barras.
document.addEventListener("keydown", function(ev){
    ev.preventDefault();
    //Control de la barra Derecha
    if(ev.keyCode==38){
        barraUno.arriba();
    }
    if(ev.keyCode==40){
        barraUno.abajo();
    }
    //Control de la barra Izquierda
    if(ev.keyCode==87){
        barraDos.arriba();
    }
    if(ev.keyCode==83){
        barraDos.abajo();
    }
});

//Ejecuto el main cuando "entro" en la ventana.
self.addEventListener("load", controller);

window.requestAnimationFrame(controller);

function controller(){
    unTableroVista.limpiar();
    unTableroVista.dibujar();
    window.requestAnimationFrame(controller);
}//fin controller