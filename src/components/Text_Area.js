import './compsStyle.css';

function TextArea({defaultValue, onChange}) {
    return (
        <>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
            <textarea className="music-text" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
        </>
    );
}

export default TextArea