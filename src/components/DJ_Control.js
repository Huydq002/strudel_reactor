import './compsStyle.css';

function DJControl({ onVolumeChange, volume, setCPM , cpmError, onDrumToggle, drums, onResetCPM}) {
    
    return (  
    <>
    {/* Set CPM */}
    <div className="input-group mb-3">   
        <span className="input-group-text" id="cpm_label">Set CPM</span>
    
        <input type="text" className="form-control" id="cpm_input" placeholder="120..." aria-label="cpm" onChange={(e) => setCPM(e.target.value)} aria-describedby="cpm_label"/>
    </div>
    <div className='mb-3'>
        <button className="reset-cpm-btn" onClick={onResetCPM}>
            ⏻️ Reset CPM
        </button>
    </div>
    
     {cpmError && <p style={{ color: "purple", fontWeight: "600" }}>{cpmError}</p>}


    {/* Volume */}
    <label htmlFor="volume" className="form-label">Volume: {Math.round((volume * 100) / 2)}%</label>
    <input type="range" className="form-range" min="0" max="2" step="0.1" id="volume_range" value={volume}
        onChange={(e) => onVolumeChange(e.target.value) }></input>

    {/* Check Boxes */}
    <div className="drum-controls">
        <h5 className="drum-title">Drum Controls</h5>
        
        <label className="drum-checkbox" htmlFor="d1">
            <input className="drum-input" type="checkbox" id="d1" checked={drums.d1} onChange={(e) => onDrumToggle('d1', e.target.checked)}/>
            <span className="drum-label">🥁 Drums 1</span>
        </label>
        
        <label className="drum-checkbox" htmlFor="d2">
            <input className="drum-input" type="checkbox" id="d2" checked={drums.d2} onChange={(e) => onDrumToggle('d2', e.target.checked)}/>
            <span className="drum-label">🥁 Drums 2</span>
        </label>
    </div>
    </>   
    );
}
export default DJControl