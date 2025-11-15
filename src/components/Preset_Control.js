function PresetControl({ volume, currentCPM, drums, onLoadPreset }) {
  const handleSave = () => {
    const preset = { volume, cpm: currentCPM, drums };
    const json = JSON.stringify(preset, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "preset.json"; a.click();
  };

  const handleLoad = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { try { const preset = JSON.parse(ev.target.result); onLoadPreset(preset); } catch { alert("❌ Invalid preset file"); } };
    reader.readAsText(file);
  };

  return (
    <div className="preset-box mt-3">
      <h5 className="preset-title">🎛 Preset Controls</h5>
      <button className="preset-btn save-btn" onClick={handleSave}>💾 Save Preset</button>
      <label htmlFor="load" className="preset-btn load-btn">📁 Load Preset</label>
      <input id="load" type="file" accept=".json" style={{ display:"none" }} onChange={handleLoad}/>
    </div>
  );
}

export default PresetControl;
