import React, { Component } from "react";
import ReactDOM from "react-dom";

const baseUrl = 'http://localhost:50150';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      discs: null,
      interpreters: null,
      genres: null
    };
  }

  componentDidMount(){
    fetch("http://localhost:50150/api/Discos")
    .then(response => response.json())
    .then(discs => this.setState({discs}));
  }

  render(){
    const {discs, interpreters, genres} = this.state;
    return(
        <div>
            {discs &&
                <DiscList list={discs} />
            }
        </div>
    )
  }
}

//FUNCIONA, ESTÁ VIVO
const DiscList = ({list}) => {
  return(
    <div>
    {list.map(item=>
              <li className="list-group-item" key={item.IdDisco}>{item.Titulo}</li>
    )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("listaDiscos"));
