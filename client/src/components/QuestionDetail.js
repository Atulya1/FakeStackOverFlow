import React, {useState, useEffect} from "react";
import {formatDateMetadata} from "./utils";
import ComponentType from "./ComponentType";
import AskQuestionButton from "./AskQuestionButton";
import {getAllAnswer, getAnswersByQuestionId} from "../service/answer-service";
import { getQuestionById } from "../service/question-service";


const QuestionDetail = (props) => {
    const [questions] = useState(props.data.state.questions);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    
    useEffect(() => {
        getAnswersByQuestionId(questions).then(response => {
            setAnswer(response);
            setQuestion(questions)
        });
    }, []);

    const answerQuestion = () => {
        props.data.setState({component: ComponentType.AnswerQuestion, questions: question})
    }

    return (
        <div>
            {question && 
            <div>
                <div id="answersHeader" style={{display: "flex", height: "2rem", justifyContent: "space-between", padding: "1rem", marginBottom: '3rem'}}>
                <b>{answer.length} answers</b>
                <b style={{maxWidth: "50%"}}>{question.title}</b>
                <AskQuestionButton press={props.data.press}/>
            </div>
            <div id="questionBody" style={{display: "flex", justifyContent: "space-between", padding: "1rem"}}><b>{question.views} views</b>
                <p dangerouslySetInnerHTML={{__html:question.text}} style={{width: "70%"}}></p>
                <div style={{display: "flex", flexDirection: "column-reverse"}}><small style={{color: "lightslategray"}}>asked {formatDateMetadata(question.ask_date_time)}</small><small style={{color: "red"}}>{question.asked_by}</small></div>
            </div>
            <div>
                {answer.map(ans => (
                    <div key={ans._id} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "1rem",
                            borderTop: "2px dotted rgb(0, 0, 0)",
                            borderBottom: "2px dotted rgb(0, 0, 0)"
                        }}>
                        <div className="answerText"><p dangerouslySetInnerHTML={{__html:ans.text}} style={{marginRight: "3rem"}}></p></div>
                        <div className="answerAuthor" style={{display: "flex", flexDirection: "column", width: "20%"}}>
                            <small
                                style={{color: "green"}}>{ans.ans_by}</small><small style={{color: "lightslategray"}}>answered {formatDateMetadata(ans.ans_date_time)}</small></div>
                    </div>
                ))
                }
            </div>
            <div style={{padding: "1rem"}}>
                <button className="askQuestions" style={{marginBottom: "10px"}} onClick={() => answerQuestion()}>Answer Question</button>
            </div>
            </div>
            }
            
        </div>
    )
    
   
}
export default QuestionDetail;