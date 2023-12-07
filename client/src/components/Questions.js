import React, {useState, useEffect} from "react";
import {formatDateMetadata} from "./utils.js";
import ComponentType from "./ComponentType";
import AskQuestionButton from "./AskQuestionButton.js";
import {getAllQuestion, incrementView} from './../service/question-service';
import {getAllTags} from './../service/tag-service';
const Questions = (props) => {
    const [questions, setQuestions] = useState(null);
    const [tags, setTags] = useState(null);
    const [sortType, setSortType] = useState('newest');
    useEffect(() => {
            getAllQuestion(sortType).then(response => {
                setQuestions(response);
            });
        
        getAllTags().then(response => {
            setTags(response);
        });
    }, [sortType])
    const getTagName = (tagId) => {
        return tags.find(t => t._id === tagId).name;
    }

    const tagSearch = (tagId) => {
        props.data.setState({component: ComponentType.SearchQuestion, questions: "", tagQuery: getTagName(tagId)});
    }

    const sort = (sortType) => {
        if (sortType === "newest") {
            setSortType("newest")
        } else if (sortType === "active") {          
            setSortType("active")
        } else if (sortType === "unanswered") {
            setSortType("unanswered")
        }
    }

    const getQuestionDetails = (qid) => {
        incrementView(qid);
        props.data.setState({component: ComponentType.QuestionDetail, questions: qid});
    }

    return (
        <div>
            {questions &&
            <div>
                <div className="row">        
                <AskQuestionButton press={props.data.press} />
            </div>
            {<div className="question-header">
            <div className="col-4 noOfQuestions" id="noOfQuestions"><h2>All Questions</h2>
                <p>{questions.length} questions</p>
            </div>
            <div className="col-8 topButtons">
                <div className="sortButtons">
                    <button className="sort" id="newest" onClick={() => sort("newest")}>Newest</button>
                    <button className="sort" id="active" onClick={() => sort("active")}>Active</button>
                    <button className="sort" id="unanswered" onClick={() => sort("unanswered")}>Unanswered</button>
                </div>
            </div>
        </div>}
            <div className="scroll">
                <div id="questions">
                    {questions.map(question => (
                        <div key={question._id}>
                            <div className="row questionRow" style={{borderBottom: "2px dotted rgb(0, 0, 0)"}}>
                                <div className="col-2 postStats"><span
                                    style={{color: "red", fontSize: "13px", marginTop: "10px"}}>{question.answers.length} answers</span><br/><span
                                    style={{color: "red", fontSize: "13px", marginTop: "10px"}}>{question.views ? question.views : 0} views</span></div>
                                <div className="col-7 questionMiddle">
                                    <button key={question._id} id={question._id} onClick={() => {getQuestionDetails(question._id)}} className="postTitle" style={{
                                        border: "none",
                                        background: "inherit",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        color: "black"
                                    }}>{question.title}
                                    </button>
                                    <br/>
                                    {tags && question.tags.map(tagId => (
                                        <button onClick={() => tagSearch(tagId)} key={tagId} id={tagId} className="tag">{getTagName(tagId)}</button>
                                    ))}
                                </div>
                                <div className="col-3 lastActivity">
                                <span className="name"
                                      style={{color: "red", fontSize: "13px", marginTop: "10px"}}>{question.asked_by} </span>
                                    <span className="time"
                                          style={{color: "lightgray", marginTop: "20px", fontSize: "13px"}}>{"asked " + formatDateMetadata(question.ask_date_time)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
            }
            
        </div>
    )
}
export default Questions;