import React from 'react';
import './App.css';

let mouseTimer

export default class Main extends React.Component {
  constructor(){
    super()

    this.state = {
      winningStake: 1,
      foulStake: 3,
      gameStake: 5,
      playersData: [],
      counter: 0,
    }
    this.onChange=this.onChange.bind(this)
    this.addPlayer=this.addPlayer.bind(this)
    this.deletePlayer=this.deletePlayer.bind(this)
    this.initiateDelete=this.initiateDelete.bind(this)
    this.changeValue=this.changeValue.bind(this)
    this.shuffleRotation=this.shuffleRotation.bind(this)
    this.setFoulStake=this.setFoulStake.bind(this)
  }

  componentDidMount() {
    let playersDataLS = localStorage.playersData
    if (playersDataLS) {
      this.setState({playersData: JSON.parse(playersDataLS)},() => this.setFoulStake())
    }
    else {
      let playersData = Object.assign([], this.state.playersData)
      for (var i = 0; i < 3; i++) {
        playersData.push({name: '', pl: 0, fouls: 0, position: 0})
      }
      localStorage.setItem('playersData', JSON.stringify(playersData))
      this.setState({playersData},() => this.setFoulStake())
    }
  }

  setFoulStake() {
    let foulStake = this.state.playersData.length-1 * 1
    this.setState({foulStake})
  }

  onChange(method, e, index, values) {
    if (method === 'name') {
      let playersData = Object.assign([], this.state.playersData)
      playersData[index].name = e.target.value
      this.setState({playersData},() => {
        localStorage.setItem('playersData', JSON.stringify(playersData))
      })
    }
    else if (method === 'fouls') {
      let value = e.target.value
      if (value > 0) {
        value = -value
      }
      let playersData = Object.assign([], this.state.playersData)
      playersData[index].fouls = parseInt(value, 10)
      this.setState({playersData},() => {
        localStorage.setItem('playersData', JSON.stringify(playersData))
      })
    }
    else if (method === 'winningStake') {
      this.setState({winningStake: e.target.value})
    }
    else if (method === 'foulStake') {
      this.setState({foulStake: e.target.value})
    }
    else if (method === 'gameStake') {
      this.setState({gameStake: e.target.value})
    }
    else if (method === 'values') {
      let value = e.target.value
      if (values === 'negative' && value > 0) {
        value = -value
      }
      let playersData = Object.assign([], this.state.playersData)
      playersData[index].pl = parseInt(value, 10)
      this.setState({playersData},() => {
        localStorage.setItem('playersData', JSON.stringify(playersData))
      })
    }
  }

  initiateDelete(index) {
    clearTimeout(mouseTimer)
    if (this.state.counter > 6) {
      this.deletePlayer(index)
      this.setState({counter: 0})
    }
    else {
      this.setState({counter: this.state.counter + 1})
      mouseTimer = setTimeout(() => {
        this.setState({counter: 0})
      }, 1500)
    }
  }

  deletePlayer(index) {
    let newPlayers = this.state.players - 1
    let playersData = Object.assign([], this.state.playersData)
    playersData.splice(index, 1)

    this.setState({playersData},() => {
      localStorage.setItem('playersData', JSON.stringify(playersData))
    })
  }

  renderPlayers() {
    if (this.state.playersData.length > 0) {
      let renderPlayers = []
      for (var i = 0; i < this.state.playersData.length; i++) {
        let index = i
        let winnings
        let losings
        if (this.state.playersData[i].pl < 0) {
          losings = <input className='main-container-player-subContainers-valueInput' value={this.state.playersData[i].pl} type="number" onChange={(e) => this.onChange('values',e,index, 'negative')} />
        }
        else if (this.state.playersData[i].pl > 0) {
          winnings = <input className='main-container-player-subContainers-valueInput' value={this.state.playersData[i].pl} type="number" onChange={(e) => this.onChange('values',e,index)} />
        }
        else {
          winnings = <input className='main-container-player-subContainers-valueInput' value={this.state.playersData[i].pl} type="number" onChange={(e) => this.onChange('values',e,index)} />
          losings =  <input className='main-container-player-subContainers-valueInput' value={this.state.playersData[i].pl} type="number" onChange={(e) => this.onChange('values',e,index, 'negative')} />
        }
        let color = '#ff8080'
        if (this.state.counter > 2) color = '#ff3333'
        if (this.state.counter > 4) color = '#e60000'
        renderPlayers.push(
          <div key={i} className="main-container-players">
            <div className="main-container-player-subContainers">
              <div className="main-container-player-subContainers-remove" style={{backgroundColor:color}} onClick={() => this.initiateDelete(index)}>
                <div style={{marginBottom: '0vh', color: '#4c4c4c'}}>x</div>
              </div>
              <div className="main-container-player-subContainers-postion">
                {this.state.playersData[i].position}
              </div>
              <input className='main-container-player-subContainers-input' placeholder='-' value={this.state.playersData[index].name} type="text" onChange={(e) => this.onChange('name',e,index)}/>
            </div>
            <div className="main-container-player-subContainers">
              <div className="main-container-player-subContainers-value">
                {winnings}
              </div>
            </div>
            <div className="main-container-player-subContainers">
              <div className="main-container-player-subContainers-value">
                {losings}
              </div>
            </div>
            <div className="main-container-player-subContainers">
              <div className="main-container-player-subContainers-value">
                <input className='main-container-player-subContainers-valueInput' value={this.state.playersData[i].fouls} type="number" onChange={(e) => this.onChange('fouls',e,index)} />
              </div>
            </div>
          </div>
        )
      }

      return renderPlayers
    }
  }

  changeValue(method, index) {
    let playersData = Object.assign([], this.state.playersData)
    if (method === '+') {
      for (var i = 0; i < playersData.length; i++) {
        if (i === index) {
          playersData[i].pl = playersData[i].pl + (this.state.winningStake * (this.state.playersData.length-1))
        }
        else {
          playersData[i].pl = playersData[i].pl - this.state.winningStake
        }
      }
    }
    else if (method === 'undoPlus') {
      for (var i = 0; i < playersData.length; i++) {
        if (i === index) {
          playersData[i].pl = playersData[i].pl - (this.state.winningStake * (this.state.playersData.length-1))
        }
        else {
          playersData[i].pl = playersData[i].pl + this.state.winningStake
        }
      }
    }
    else if (method === 'game') {
      for (var i = 0; i < playersData.length; i++) {
        if (i === index) {
          playersData[i].pl = playersData[i].pl + (this.state.gameStake * (this.state.playersData.length-1))
        }
        else {
          playersData[i].pl = playersData[i].pl - this.state.gameStake
        }
      }
    }
    else if (method === 'undoGame') {
      for (var i = 0; i < playersData.length; i++) {
        if (i === index) {
          playersData[i].pl = playersData[i].pl - (this.state.gameStake * (this.state.playersData.length-1))
        }
        else {
          playersData[i].pl = playersData[i].pl + this.state.gameStake
        }
      }
    }
    else if (method === 'foul') {
      for (var i = 0; i < playersData.length; i++) {
        if (i === index) {
          playersData[i].fouls = playersData[i].fouls - this.state.foulStake
        }
      }
    }
    else if (method === 'undoFoul') {
      for (var i = 0; i < playersData.length; i++) {
        if (i === index) {
          playersData[i].fouls = playersData[i].fouls + parseInt(this.state.foulStake)
        }
      }
    }

    this.setState({playersData},() => {
      localStorage.setItem('playersData', JSON.stringify(playersData))
    })
  }

  renderActions() {
    let renderActions = []

    for (var i = 0; i < this.state.playersData.length; i++) {
      let index = i
      renderActions.push(
        <div className="main-actions-container" key={i}>
          <div className="main-actions-container-undo">
            <div className="main-actions-container-undoPlus" onClick={() => this.changeValue('undoPlus', index)}>
              Undo +
            </div>
            <div className="main-actions-container-undoFoul" onClick={() => this.changeValue('undoFoul', index)}>
              Undo Foul
            </div>
            <div className="main-actions-container-undoGame" onClick={() => this.changeValue('undoGame', index)}>
              Undo Game
            </div>
          </div>
          <div className="main-actions-container-foul" onClick={() => this.changeValue('foul', index)}>
            Foul
          </div>
          <div className="main-actions-container-game" onClick={() => this.changeValue('game', index)}>
            Game
          </div>
          <div className="main-actions-container-plus" onClick={() => this.changeValue('+', index)}>
            +
          </div>
        </div>
      )
    }

    return renderActions
  }

  addPlayer() {
    if (this.state.playersData.length < 4) {
      let newPlayers = this.state.playersData.length + 1
      let playersData = Object.assign([], this.state.playersData)
      playersData.push({name: '', pl: 0, fouls: 0, position: 0})

      this.setState({playersData},() => {
        localStorage.setItem('playersData', JSON.stringify(playersData))
      })
    }
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  shuffleRotation() {
    let array = []
    let order = []
    this.state.playersData.forEach((data,index) => array.push(index))
    let shuffleArray = this.shuffle(array)

    let position = 1
    for (var i = 0; i < shuffleArray.length; i++) {
      let playersData = Object.assign([], this.state.playersData)
      playersData[shuffleArray[i]].position = position
      this.setState({playersData})
      position++
    }
  }

  render() {
    return (
      <div className="main">
        <div className="main-container">
          <div className="main-gameOptions">
            <div className="main-gameOptions-container">
              Money Ball:
              <input className='main-gameOptions-container-input' value={this.state.winningStake} type="number" onChange={(e) => this.onChange('winningStake',e)}/>
            </div>
            <div className="main-gameOptions-container">
              Foul:
              <input className='main-gameOptions-container-input' value={this.state.foulStake} type="number" onChange={(e) => this.onChange('foulStake',e)}/>
            </div>
            <div className="main-gameOptions-container">
              Game:
              <input className='main-gameOptions-container-input' value={this.state.gameStake} type="number" onChange={(e) => this.onChange('gameStake',e)}/>
            </div>
            <div className="main-gameOptions-container-addPlayer" onClick={this.addPlayer}>
              Add Player
            </div>
            <div className="main-gameOptions-container-shufflePosition" onClick={this.shuffleRotation}>
              Shuffle Rotation
            </div>
          </div>
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
