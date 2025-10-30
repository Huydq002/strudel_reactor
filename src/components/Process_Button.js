function ProcessButton({onProcess, onProcessAndPlay}) {
    return (
        <>
            <button id="process" className="btn btn-primary w-50 mb-2" onClick={onProcess}>Preprocess</button>
            <button id="process_play" className="btn btn-warning w-50 mb-2" onClick={onProcessAndPlay}>Proc & Play</button>
        </> 
    );
}

export default ProcessButton