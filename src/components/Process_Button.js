import './compsStyle.css';

function ProcessButton({onProcess, onProcessAndPlay}) {
    return (
        <>
            <button id="process" onClick={onProcess}>Preprocess</button>
            <button id="process_play" onClick={onProcessAndPlay}>Proc & Play</button>
        </> 
    );
}

export default ProcessButton