import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import PlayButton from './components/Play_Button'; 
import ProcessButton from './components/Process_Button';
import DJControl from './components/DJ_Control';
import Header from './components/Header';
import TextArea from './components/Text_Area';
import Graph from "./components/Graph";



let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

const hasRun = useRef(false);

const handlePlay = () =>{
    globalEditor.evaluate()

}
const handleStop = () =>{
    globalEditor.stop()

}

const handleProcess = () => {
    const processed = songText;  
    globalEditor.setCode(processed);
}

const handleProcessAndPlay = () => {
    const processed = songText; 
    globalEditor.setCode(processed);
    globalEditor.evaluate();
}

const [volume, setVolume] = useState(1)
const handleVolume = (value) => {
    const volValue = parseFloat(value);
    setVolume(volValue);
    
    console.log('Volume changed to:', volValue);
    
    if (globalEditor) {

        let Originalcode = songText;
        const codeWithGain = Originalcode.trim() + `\nall(v => v.gain(${volValue}))`;
        
        globalEditor.setCode(codeWithGain);

        if (globalEditor.repl?.state?.started) {
            globalEditor.evaluate();
            console.log('Volume updated');
        }
    }
}

const [cpmError, setCpmError] = useState("");
const handleCPM = (value) => {
  const cpm = parseFloat(value);
  console.log("Set CPM:", cpm);

   if (isNaN(cpm) || cpm <= 0) {
    setCpmError("🎧 Oops! Invalid CPM — beat unchanged 🎚️Invalid CPM! Keeping previous tempo.");
    return;
  }

  setCpmError("");

  if (globalEditor) {
    const codeWithCpm = songText.trim() + `\nsetcpm(${cpm})`;
    globalEditor.setCode(codeWithCpm);

    if (globalEditor.repl?.state?.started) {
      globalEditor.evaluate();
      console.log("CPM updated:", cpm);
    }
  }
}



const [songText, setSongText] = useState(stranger_tune)

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = stranger_tune
        // SetupButtons()
        // Proc()
    }
    globalEditor.setCode(songText);
}, [songText]);


return (
    <div>
        <Header/>
        <main>
            <div className="row g-3">
                <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                    <TextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>
                </div>
                <div className="col-md-4">
                    <nav className='container d-flex flex-column'  style={{ gap: "10px", marginTop: "40px" }}>
                        <ProcessButton onProcess={handleProcess} onProcessAndPlay={handleProcessAndPlay}/>
                        <PlayButton onPlay={handlePlay} onStop={handleStop}/>
                    </nav>
                </div>
                               
        </div>
            <div className="container-fluid">
                
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                <div className="col-md-4" >
                    <DJControl onVolumeChange={handleVolume} volume={volume} setCPM={handleCPM} cpmError={cpmError}/>
                </div>
                </div>
                <div className="col-md-8" style={{ maxHeight: '70vh', overflowY: 'auto' }}><Graph /></div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);
}