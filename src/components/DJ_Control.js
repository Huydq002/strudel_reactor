function DJControl({ onVolumeChange, volume }) {
    
    return (  
    <>
    {/* Set CPM */}
    <div className="input-group mb-3">   
        <span className="input-group-text" id="cpm_label">Set CPM</span>
    
        <input type="text" className="form-control" id="cpm_input" placeholder="120..." aria-label="cpm" aria-describedby="cpm_label"/>
    </div>

    {/* Volume */}
    <label htmlFor="volume" className="form-label">Volume: {Math.round((volume * 100) / 2)}%</label>
    <input type="range" className="form-range" min="0" max="2" step="0.1" id="volume_range" value={volume}
        onChange={(e) => onVolumeChange(e.target.value) }></input>

    {/* Check Boxes */}
    <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="s1"/>
        <label className="form-check-label" htmlFor="flexCheckDefault">
            s1
        </label>
    </div>
    <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="d1"/>
        <label className="form-check-label" htmlFor="flexCheckDefault">
            d1
        </label>
    </div>
    <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="d2"/>
        <label className="form-check-label" htmlFor="flexCheckDefault">
            d2
        </label>
    </div>
    
    {/* <div className="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
            p1: ON
        </label>
    </div>
    <div className="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
            p1: HUSH
        </label>
    </div> */}
    </>   
    );
}
export default DJControl