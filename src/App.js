
import React from 'react';
import './App.css';

const keyList = [
  {
    key: "Q",
    keyName: "Heater 1",
    keyCode: 81,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },

  {
    key: "W",
    keyName: "Heater 2",
    keyCode: 87,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },

  {
    key: "E",
    keyName: "Heater 3",
    keyCode: 69,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },

  {
    key: "A",
    keyName: "Heater 4",
    keyCode: 65,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },

  {
    key: "S",
    keyName: "Clap",
    keyCode: 83,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },

  {
    key: "D",
    keyName: "Open-HH",
    keyCode: 68,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },

  {
    key: "Z",
    keyName: "Kick-n'-Hat",
    keyCode: 90,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },

  {
    key: "X",
    keyName: "Kick",
    keyCode: 88,
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },

  {
    key: "C",
    keyName: "Closed-HH",
    keyCode: 67,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }

]; 



class DrumMachine extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      clipId: '',
    };
    this.playDrum = this.playDrum.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playClip = this.playClip.bind(this);
    
  }
  
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }

  handleKeyPress = (event) => {
    console.log("handleKeyPress");
    event.preventDefault() ;
    // Test #6 of 8 needs the clip to be played based on the audio tag.
     var audios = document.querySelectorAll("audio");
  
     for (let i=0; i< keyList.length; i++) {
        if (event.keyCode === keyList[i].keyCode) {
          let clip = audios[i];
/*           console.log ("clip val next line");
          console.log(clip); */
          
          this.setState({clipId: event.key.toUpperCase()},  );
          clip.play();
          // clip.currentTime = 0;
        
       }
       
     }
    }


  playDrum(key) {
    console.log("playDrum");

    document.getElementById(key).play();
  
    this.setState({clipId: key});

    this.updateDisplay(key)
  };

  playClip() {  
    //document.getElementById(this.state.clipId).play()
    console.log("play clip" + this.state.clipId);
    const audio = document.getElementById(this.state.clipId);
    audio.play();
    this.updateDisplay(this.state.clipId);
  }

  updateDisplay(key) {
    const clip = keyList.find((item) => item.key === key);
    document.getElementById("display").innerHTML = clip.keyName;
  }

render() {

  return (
    <div className="App" id="drum-machine">
        

      <div className='container'>


        <div className="drum" tabIndex={0}>
        {
        
          keyList.map((keyItem) => (

            <button id={keyItem.keyName} className="drum-pad key" 
            onKeyDown={this.handleKeyPress} onClick={() => this.playDrum(keyItem.key)}
              >{keyItem.key}
                    <audio 
                    className='clip' 
                    id={keyItem.key} 
                    src={keyItem.url} 
                    type="audio/mpeg" 
                    preload="auto"
                    ></audio>
                  </button>
          
          )
        )
        }
        </div>
        <div className='controls'>
          <div id="display"></div>
        </div>
        
        
        

      </div>

    </div>
    );
  }
}


//const el = document.getElementById("root");
//ReactDOM.render(<DrumMachine />, el); 

  
export default DrumMachine;