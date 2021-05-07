import React, { useState, useRef } from 'react'
import './InitialInfo.css';

function InitialInfo() {
    const [textPart, setTextPart] = useState('');
    const [arrowVisibility, setArrowVisibility] = useState('hidden');
    const [started, setStarted] = useState(false);

    const text = 'Lorem ipsum dummy text blabla. ';
    const introRef = useRef(null);
    const dialogSoundRef = useRef(null);

    const dialogArrow = {
        visibility: arrowVisibility,
        animation: 'MoveUpDown 1s linear infinite',
    }

    const typeWritter = () => {
        let textChar = '';
        let i = 0;

        document.onclick = () => {
            setStarted(true);
            setArrowVisibility('hidden');
            introRef.current.play();
            dialogSoundRef.current.play();
            const addCharacters = setInterval(() => {
                if(i >= text.length) {
                    setArrowVisibility('visible');
                    return clearInterval(addCharacters);
                } 
                textChar += text[i];
                setTextPart(textChar);
                i++;
            }, 50);
        }
    }
    
    return (
        <>
            <audio ref={introRef}>
                <source src="intro.mp3" type="audio/mpeg"></source>
            </audio>
            <audio ref={dialogSoundRef}>
                <source src="dialog-sound.mp3" type="audio/mpeg"></source>
            </audio>
            <div className="oak-div">
                <img src="oak.png" className="oak-img" alt="OAK" />
            </div>
            {started ?
            <div className="initial-info">
                {textPart}
                <img src="arrow.png" style={dialogArrow} alt="arrow" />
            </div> :
            null}
            {typeWritter()}
        </>
    )
}

export default InitialInfo;