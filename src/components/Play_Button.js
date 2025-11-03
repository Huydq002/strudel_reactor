import './compsStyle.css';
function PlayButton({onPlay, onStop}) {
    return (
        <>
            <button id="play" onClick={onPlay}>Play 🎵</button>
            <button id="stop" onClick={onStop}>Stop ⏹</button>
        </>
    );
}

export default PlayButton