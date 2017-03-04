import React, { Component } from "react";
import ReactDOM from "react-dom";

const baseUrl = 'http://localhost:50150/api/';

class Discos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discs: null/*,
            votes: null*/
        };
    }

    componentDidMount() {
        fetch(`${baseUrl}Discos/GetDiscos`)
            .then(response => response.json())
            .then(discs => this.setState({ discs }));

        //Falta pillar puntuaciones
        //fetch(`${baseUrl}Discos/GetDiscos`)
        //    .then(response => response.json())
        //    .then(discs => this.setState({ discs }));
    }

    render() {
        const {discs} = this.state;
        return (
            <div>
                {discs //&& votes
                    ? <DiscList list={discs} /* votes={votes} */ />
                    : <p>Cargando...</p>
                }
            </div>
        )
    }
}

const DiscList = ({list/*, votes*/}) => {
    //let actualVotes;
    return (
        <div>
            {list.map(item => //{
                //actualVotes = [];
                //votes.map(vote => {
                //    if (vote.IdDisco == item.IdDisco) {
                //        actualVotes.push(vote.IdDisco);
                //    }
                //});
                //const average = actualVotes.reduce(({ a, b }) => {
                //    return a + b;
                //}) / actualVotes.length;
                <li className="list-group-item" key={item.IdDisco}>{item.Titulo}
                    <p className="justify-content-between"><span className="badge badge-default badge-pill">{item.Agno}</span></p> //<span>Puntuación: {actualVotes}</span>
                </li>
            //}
            )}
        </div>
    );
}



class Interpretes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interpreters: null
        };
    }

    componentDidMount() {
        fetch(`${baseUrl}Interpretes/GetInterpretes`)
            .then(response => response.json())
            .then(interpreters => this.setState({ interpreters }));
    }

    render() {
        const {interpreters} = this.state;
        return (
            <div>
                {interpreters
                    ? <InterpretersList list={interpreters} />
                    : <p>Cargando...</p>
                }
            </div>
        )
    }
}

const InterpretersList = ({list}) => {
    return (
        <div>
            {list.map(item =>
                <li className="list-group-item" key={item.IdInterprete}>{item.Interprete1}</li>
            )}
        </div>
    );
}

class Generos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: null
        };
    }

    componentDidMount() {
        fetch(`${baseUrl}Generos/GetGeneros`)
            .then(response => response.json())
            .then(genres => this.setState({ genres }));
    }

    render() {
        const {genres} = this.state;
        return (
            <div>
                {genres
                    ? <GenresList list={genres} />
                    : <p>Cargando...</p>
                }
            </div>
        )
    }
}

const GenresList = ({list}) => {
    return (
        <div>
            {list.map(item =>
                <li className="list-group-item" key={item.IdTipo}>{item.tipo1}</li>
            )}
        </div>
    );
}

ReactDOM.render(<Discos />, document.getElementById("listaDiscos"));
ReactDOM.render(<Interpretes />, document.getElementById("listaInterpretes"));
ReactDOM.render(<Generos />, document.getElementById("listaGeneros"));