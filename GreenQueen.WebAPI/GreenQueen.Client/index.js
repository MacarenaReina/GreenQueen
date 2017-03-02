import React, { Component } from "react";
import ReactDOM from "react-dom";

const baseUrl = 'http://localhost:50150/api/';

class Discos extends Component {
  constructor(props){
    super(props);
    this.state={
      discs: null
    };
  }

  componentDidMount(){
    fetch(`${baseUrl}Discos/GetDiscos`)
    .then(response => response.json())
    .then(discs => this.setState({discs}));
  }

  render(){
    const {discs} = this.state;
    return(
        <div>
            {discs
                ? <DiscList list={discs} />
                : <p>Cargando...</p>
            }
        </div>
    )
  }
}

const DiscList = ({list}) => {
  return(
    <div>
    {list.map(item=>
              <li className="list-group-item" key={item.IdDisco}>{item.Titulo}</li>
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