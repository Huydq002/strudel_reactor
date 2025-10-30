function PlayButton({onPlay, onStop}) {
    return (
        <>
            <button id="play" className="btn btn-success w-50 mb-2" onClick={onPlay}>Play</button>
            <button id="stop" className="btn btn-danger w-50 mb-2" onClick={onStop}>Stop</button>
        </>
    );
}

export default PlayButton