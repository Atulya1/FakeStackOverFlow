import React, {useState} from "react";
import "../index.css"
import { parseStringForUrl } from "./utils.js"
import ComponentType from "./ComponentType";
import {saveAnswer} from './../service/answer-service';
import {addAnswerId} from './../service/question-service';

const AnswerQuestion = (props) => {
    const [user, setUser] = useState("");
    const [text, setText] = useState("");
    const [userWarning, setUserWarning] = useState(false);
    const [textWarning, setTextWarning] = useState(false);
    const [invalidUrl, setInvalidUrl] = useState(false);
    const [question] = useState(props.data.state.questions);

    const newAnswer = () => {
        if(!user) {
            setUserWarning(true);
            return;
        } else if(!text) {
            setTextWarning(true);
            return;
        }

        const urlParsedText = parseStringForUrl(text);
        if(!urlParsedText) {
            setInvalidUrl(true);
            return null;
        }

        const answer = {
            text: urlParsedText,
            ans_by: user,
            ans_date_time: new Date()
        }

        saveAnswer(answer).then(response => {
            addAnswerId(response._id, question).then(r => {
                props.data.setState({component: ComponentType.QuestionDetail, questions: question});
            })
        })
    }

    return (
        <div style={{paddingRight: "5rem", paddingBottom:"2rem"}}>
            <div className="form-group" style={{paddingTop: "2rem"}}>
            <h3>Username*</h3>
            <input onChange={e => setUser(e.target.value)} value={user}
                type="text" className="form-control" id="answerUsernameInput" placeholder="Enter username" required/>
                {userWarning && <p style={{color: "red"}}>Username cannot be empty</p>}
            </div>
            <div className="form-group" style={{paddingTop: "2rem"}}>
                <h3>Answer Text*</h3>
            <textarea onChange={e => setText(e.target.value)} value={text}
                className="form-control" id="answerTextInput" placeholder="Enter answer text" required></textarea>
                {textWarning && <p style={{color: "red"}}>Answer text cannot be empty</p>}
                {invalidUrl && <p style={{color: "red"}}>Invalid hyperlink</p>}
            </div>
            <div className="newAnswerButtonContainer">
                <button onClick={() => newAnswer()} id="postAnswerButton" className="btn btn-primary">Post Answer</button>
                <small style={{color: "red"}}>* indicates mandatory fields</small>
            </div>
        </div>
    )
}
export default AnswerQuestion;