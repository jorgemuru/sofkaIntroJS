//Creo la clase tablero (clase board)
(function(){
    //Defino los atributos a traves de un constructor.
    self.Tablero = function(pAncho, pAlto){
        this.ancho = pAncho;
        this.alto = pAlto;
        this.jugando = false;
        this.finJuego = false;
        this.barras = [];
        this.pelota = null;
    }

    //Defino los metodos de la clase tablero
    self.Tablero.prototype = {
        //Getter y setter
        get elements(){
            var elements = this.barras;
            elements.push(this.pelota);

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

    }

    self.Barra.prototype = {
        abajo: function(){

        },
        arriba: function(){

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
        dibujar: function(){
            for(var i = this.tablero.elements.length -1; i >= 0; i--){
                var unElemento = this.tablero.elements[i];
                dibujar(this.contexto, unElemento);
            };
        }
    }
    //Funcion para dibujar los elementos en el Tablero
    function dibujar(pContexto, pElemento){
        if(pElemento != null && pElemento.hasOwnProperty("figura")){
            switch(pElemento.figura){
                case "rectangulo":
                    pContexto.fillRect(pElemento.x,pElemento.y,pElemento.ancho, pElemento.alto);
                    break;
            }
        }

    }   
        

})();//Fin clase tableroVista

//Ejecuto el main cuando "entro" en la ventana.
window.addEventListener("load", main)

function main(){
    //Declaro e instancio el Tablero y sus "manejadores"
    var unTablero = new Tablero(800, 400);
    var barraIzq = new Barra(20, 100, 20, 100, unTablero);
    var barraDer = new Barra(20, 700, 20, 100, unTablero);
    var canvas = document.getElementById('canvas');
    var unTableroVista = new TableroVista(canvas,unTablero);
    unTableroVista.dibujar();
}//fin main