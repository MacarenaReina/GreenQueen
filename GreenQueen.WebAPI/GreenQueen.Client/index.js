import React, { Component } from "react";
import ReactDOM from "react-dom";

const baseUrl = 'http://localhost:50150/api/';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discs: null,
            interpreters: null,
            genres: null
        };
        this.selectDisc = this.selectDisc.bind(this);
    }

    componentDidMount() {
        fetch(`${baseUrl}Discos/GetDiscos`)
            .then(response => response.json())
            .then(discs => this.setState({ discs }));
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
                    <h2><span className="glyphicon glyphicon-cd"></span>Discos</h2>
                    <ul id="listaDiscos" className="list-group">
                        {discs
                            ? <DiscList list={discs} selectDisc={this.selectDisc} />
                            : <p>Cargando...</p>
                        }
                    </ul>
                </div>
                <div className="col-sm-4">
                    <h2><span className="glyphicon glyphicon-user"></span>Intérpretes</h2>
                    <ul id="listaInterpretes" className="list-group">
                        {interpreters
                            ? <InterpretersList list={interpreters} />
                            : <p>Cargando...</p>
                        }
                    </ul>
                </div>
                <div className="col-sm-4">
                    <h2><span className="glyphicon glyphicon-music"></span>Géneros</h2>
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

    selectDisc(idInter) {
        //Funciones para el filter del Interprete
        const sameId = item => item.IdInterprete == idInter;
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
        fetch(`${baseUrl}Generos/GetGenerosDisco/${idInter}`)
            .then(response => response.json())
            .then(genres => this.setSelectedGenres(genres));
    }

    setSelectedGenres(receivedGenres) {
        //Para ordenar el Género
        let updatedList = this.state.genres;
        receivedGenres.map(genre => {
            genre.selected = true;
            let index;
            updatedList.map(uList => {
                uList.selected = false;
                if (uList.IdTipo == genre.IdTipo) {
                    index = updatedList.indexOf(uList);
                }
            })
            updatedList.splice(index, 1);
        })
        const genres = receivedGenres.concat(updatedList);
        this.setState({
            genres
        })
    }
}

const DiscList = ({list, selectDisc}) => {
    return (
        <div>
            {list.map(item =>
                <li className="list-group-item" key={item.IdDisco}><span onClick={() => selectDisc(item.IdInterprete)}>{item.Titulo}</span>
                    <div className="justify-content-between"><span className="badge badge-default badge-pill">{
                        item.Agno
                            ? item.Agno
                            : "Desconocido"
                    }</span><span>Puntuación: {
                            item.Puntuacion
                                ? item.Puntuacion
                                : "No hay"
                    }</span></div>
                </li>
            )}
        </div>
    );
}

const InterpretersList = ({list}) => {
    return (
        <div>
            {list.map(item =>
                <li className={item.selected == true
                    ? "list-group-item selec"
                    : "list-group-item"
                } key={item.IdInterprete}>{item.Interprete1}</li>
            )}
        </div>
    );
}

const GenresList = ({list}) => {
    return (
        <div>
            {list.map(item =>
                <li className={item.selected == true
                    ? "list-group-item selec"
                    : "list-group-item"
                } key={item.IdTipo}>{item.tipo1}{item.tipo}</li>
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("listado"));