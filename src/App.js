import React from 'react';
import './App.css';

export default class Main extends React.Component {
  constructor(){
    super()

    this.state = {
      players: 3,
      playersData: []
    }

    this.onChange=this.onChange.bind(this)
  }

  componentDidMount() {
    let playersData = Object.assign([], this.state.playersData)
    for (var i = 0; i < this.state.players; i++) {
      playersData.push({name: 'da', winnings: 0, losings: 0, fouls: 0})
    }

    this.setState({playersData})
  }

  onChange(e, index) {
    let playersData = Object.assign([], this.state.playersData)
    playersData[index].name = e.target.value
    this.setState({playersData})
  }

  renderPlayers() {
    if (this.state.playersData.length > 0) {
      let renderPlayers = []
      for (var i = 0; i < this.state.players; i++) {
        let index = i
        renderPlayers.push(
          <div key={i} className="main-container-players">
            <div className="main-container-player-subContainers">
              <input className='main-container-player-subContainers-input' value={this.state.playersData[index].name} type="text" onChange={(e) => this.onChange(e,index)}/>
            </div>
            <div className="main-container-player-subContainers">
              <div className="main-container-player-subContainers-value">
                {this.state.playersData[index].winnings}
              </div>
            </div>
            <div className="main-container-player-subContainers">
              <div className="main-container-player-subContainers-value">
                {this.state.playersData[index].winnings}
              </div>
            </div>
            <div className="main-container-player-subContainers">
              <div className="main-container-player-subContainers-value">
                {this.state.playersData[index].winnings}
              </div>
            </div>
          </div>
        )
      }

      return renderPlayers
    }
  }

  renderActions() {
    let renderActions = []

    for (var i = 0; i < this.state.players; i++) {
      renderActions.push(
        <div className="main-actions-container" key={i}>
          <div className="main-actions-container-undo">
            <div className="main-actions-container-undoPlus">
              Undo +
            </div>
            <div className="main-actions-container-undoFoul">
              Undo Foul
            </div>
          </div>
          <div className="main-actions-container-plus">
            +
          </div>
          <div className="main-actions-container-foul">
            Foul
          </div>
        </div>
      )
    }

    return renderActions
  }

  render() {
    return (
      <div className="main">
        <div className="main-container">
          <div className="main-container--wrapper">
            {this.renderPlayers()}
          </div>
          <div className="main-actions">
            {this.renderActions()}
          </div>
        </div>
      </div>
    )
  }
}
