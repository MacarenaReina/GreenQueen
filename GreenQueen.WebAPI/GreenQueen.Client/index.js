import React, { Component } from "react";
import ReactDOM from "react-dom";

//URL del servidor sobre la que hacer todas las peticiones
const baseUrl = 'http://localhost:50150/api/';
//Al no poder hacer login, creamos un user aleatorio cada vez que se visita la web -SAD-
const user = Math.floor(Math.random() * 99999);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discs: null,
            interpreters: null,
            genres: null
        };
        this.selectDisc = this.selectDisc.bind(this);
        this.selectInterpreter = this.selectInterpreter.bind(this);
        this.letsVote = this.letsVote.bind(this);
    }

    componentDidMount() {
        this.getDiscs();
        fetch(`${baseUrl}Interpretes/GetInterpretes`)
            .then(response => response.json())
            .then(interpreters => this.setState({ interpreters }));
        fetch(`${baseUrl}Generos/GetGeneros`)
            .then(response => response.json())
            .then(genres => this.setState({ genres }));
    }

    render() {
        const {discs, interpreters, genres} = this.state;
        return (
            <div>
                <div className="col-sm-4">
                    <h2 className="title"><span className="glyphicon glyphicon-cd"></span>Discos</h2>
                    <ul id="listaDiscos" className="list-group">
                        {discs
                            ? <DiscList list={discs} selectDisc={this.selectDisc} letsVote={this.letsVote} />
                            : <p>Cargando...</p>
                        }
                    </ul>
                </div>
                <div className="col-sm-4">
                    <h2 className="title"><span className="glyphicon glyphicon-user"></span>Intérpretes</h2>
                    <ul id="listaInterpretes" className="list-group">
                        {interpreters
                            ? <InterpretersList list={interpreters} selectInterpreter={this.selectInterpreter} />
                            : <p>Cargando...</p>
                        }
                    </ul>
                </div>
                <div className="col-sm-4">
                    <h2 className="title"><span className="glyphicon glyphicon-music"></span>Géneros</h2>
                    <ul id="listaGeneros" className="list-group">
                        {genres
                            ? <GenresList list={genres} />
                            : <p>Cargando...</p>
                        }
                    </ul>
                </div>
            </div>
        );
    }

    //Función para recoger los discos (Ya que la vamos a usar además de la primera vez, siempre que votemos)
    getDiscs() {
        fetch(`${baseUrl}Discos/GetDiscos`)
            .then(response => response.json())
            .then(discs => this.setState({ discs }));
    }

    //Para buscar qué intérpretes y géneros tiene un disco al hacerle click
    selectDisc(idInter, idDisc) {
        //Para seleccionar nuestro actual Disco
        const discs = this.state.discs;
        discs.map(disc => {
            disc.IdDisco === idDisc
                ? disc.selected = true
                : disc.selected = false
        })
        this.setState({
            discs
        })

        //Funciones para el filter del Interprete
        const sameId = item => item.IdInterprete === idInter;
        const notSameId = item => item.IdInterprete !== idInter;

        //Para ordenar el interprete
        const areTheId = this.state.interpreters.filter(sameId);
        areTheId.map(item => {
            item.selected = true;
        })
        const arentTheId = this.state.interpreters.filter(notSameId);
        arentTheId.map(item => {
            item.selected = false;
        })
        const interpreters = areTheId.concat(arentTheId);
        this.setState({
            interpreters
        });

        //Para coger los géneros
        fetch(`${baseUrl}Generos/GetGenerosDisco/${idDisc}`)
            .then(response => response.json())
            .then(genres => this.setSelectedGenres(genres));
    }

    //Para buscar qué discos y géneros tiene un intérprete al hacerle click
    selectInterpreter(idInter) {
        //Para seleccionar nuestro actual Interprete
        const interpreters = this.state.interpreters;
        interpreters.map(interpreter => {
            interpreter.IdInterprete === idInter
                ? interpreter.selected = true
                : interpreter.selected = false
        });
        this.setState({
            interpreters
        });

        //Funciones para el filter del Disc
        const sameId = item => item.IdInterprete === idInter;

        //Para ordenar los discos
        let updatedList = this.state.discs;
        let areTheId = this.state.discs.filter(sameId);
        areTheId.map(disc => {
            let index;
            updatedList.map(uList => {
                uList.selected = false;
                if (uList.IdDisco === disc.IdDisco) {
                    index = updatedList.indexOf(uList);
                }
            })
            updatedList.splice(index, 1);
            disc.selected = true;
        })
        const discs = areTheId.concat(updatedList);
        this.setState({
            discs
        })


        //Para coger los géneros
        fetch(`${baseUrl}Generos/GetGenerosInterprete/${idInter}`)
            .then(response => response.json())
            .then(genres => this.setSelectedGenres(genres));
    }

    //Función que usan las demás funciones de búsqueda para buscar el género
    setSelectedGenres(receivedGenres) {
        //Para ordenar el Género
        let updatedList = this.state.genres;
        receivedGenres.map(genre => {
            let index;
            updatedList.map(uList => {
                uList.selected = false;
                if (uList.IdTipo === genre.IdTipo) {
                    index = updatedList.indexOf(uList);
                }
            })
            updatedList.splice(index, 1);
            genre.selected = true;
        })
        const genres = receivedGenres.concat(updatedList);
        this.setState({
            genres
        })
    }

    //Función para votar
    //Falta por arreglar la parte servidor (está hecho a ciegas). No sé si los then están bien así, esperemos que sí D:
    letsVote(idDisc, vote) {
        if (user !== null) {
            var data = {
                IdCliente: user,
                IdDisco: idDisc,
                Puntuacion1: vote
            }
            fetch(`${baseUrl}Puntuaciones/PostPuntuacion`,
                {
                    method: "POST",
                    body: data
                })
                .then(toastr.success("¡Voto recibido!"))
                .then(this.getDiscs());
        }
        toastr.error("Por favor, inicia sesión antes");
    }
}

const DiscList = ({list, selectDisc, letsVote}) => {
    return (
        <div>
            {list.map(item =>
                <li className={item.selected === true
                    ? "list-group-item selec"
                    : "list-group-item"
                } key={item.IdDisco}><span onClick={() => selectDisc(item.IdInterprete, item.IdDisco)}>{item.Titulo}</span>
                    <div className="justify-content-between"><span className="badge badge-default badge-pill">{
                        item.Agno
                            ? item.Agno
                            : "Desconocido"
                    }
                        <span>
                            <label id="estrella" onClick={() => letsVote(item.IdDisco, 1)} className={item.Puntuacion >= 1 ? "starSelected" : "starNoSelected"}>&#9733;</label>
                            <label id="estrella" onClick={() => letsVote(item.IdDisco, 2)} className={item.Puntuacion >= 2 ? "starSelected" : "starNoSelected"}>&#9733;</label>
                            <label id="estrella" onClick={() => letsVote(item.IdDisco, 3)} className={item.Puntuacion >= 3 ? "starSelected" : "starNoSelected"}>&#9733;</label>
                            <label id="estrella" onClick={() => letsVote(item.IdDisco, 4)} className={item.Puntuacion >= 4 ? "starSelected" : "starNoSelected"}>&#9733;</label>
                            <label id="estrella" onClick={() => letsVote(item.IdDisco, 5)} className={item.Puntuacion >= 5 ? "starSelected" : "starNoSelected"}>&#9733;</label>
                            <label id="estrella" onClick={() => letsVote(item.IdDisco, 6)} className={item.Puntuacion >= 6 ? "starSelected" : "starNoSelected"}>&#9733;</label>
                            <label id="estrella" onClick={() => letsVote(item.IdDisco, 7)} className={item.Puntuacion >= 7 ? "starSelected" : "starNoSelected"}>&#9733;</label>
                            <label id="estrella" onClick={() => letsVote(item.IdDisco, 8)} className={item.Puntuacion >= 8 ? "starSelected" : "starNoSelected"}>&#9733;</label>
                            <label id="estrella" onClick={() => letsVote(item.IdDisco, 9)} className={item.Puntuacion >= 9 ? "starSelected" : "starNoSelected"}>&#9733;</label>
                            <label id="estrella" onClick={() => letsVote(item.IdDisco, 10)} className={item.Puntuacion >= 10 ? "starSelected" : "starNoSelected"}>&#9733;</label>
                        </span>
                    </span>
                    </div>
                </li>
            )}
        </div>
    );
}

const InterpretersList = ({list, selectInterpreter}) => {
    return (
        <div>
            {list.map(item =>
                <li className={item.selected === true
                    ? "list-group-item selec"
                    : "list-group-item"
                } key={item.IdInterprete} onClick={() => selectInterpreter(item.IdInterprete)}>{item.Interprete1}</li>
            )}
        </div>
    );
}

const GenresList = ({list}) => {
    return (
        <div>
            {list.map(item =>
                <li className={item.selected === true
                    ? "list-group-item selec"
                    : "list-group-item"
                } key={item.IdTipo}>{item.tipo1}{item.tipo}</li>
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("listado"));