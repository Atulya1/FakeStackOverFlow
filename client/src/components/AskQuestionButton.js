import React from 'react';
import "../index.css"

const AskQuestionButton = (props) => {
    return (
        <div className="topButtons">
            <button id="askQuestions" onClick={() => props.press("askQuestion")}
                    className="askQuestions" style={{float: "right"}}>Ask a Question</button>
        </div>
    )
}

export default AskQuestionButton;