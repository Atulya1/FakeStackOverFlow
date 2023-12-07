import React, {useState} from 'react';
import "../index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Questions from "./Questions";
import Tags from "./Tags";
import AskQuestions from "./AskQuestions";
import ComponentType from "./ComponentType";
import SearchComponent from "./SearchComponent";
import QuestionDetail from "./QuestionDetail";
import AnswerQuestion from "./AnswerQuestion";

const FakeStackOverFlow = () => {
    const initialState = {
        component : ComponentType.Question,
        questions : ""
    }

    const [searchInput, setSearchInput] = useState("");

    const [state, setState] = useState(initialState)
    const press = (button) => {
        if (button === "questions") {
            setState({component: ComponentType.Question, questions: ""});
        } else if (button === "tags") {
            setState({component: ComponentType.Tag, questions: ""})
        } else if (button === "askQuestion") {
            setState({component: ComponentType.AskQuestion, questions: ""})
        }
    }

    const handleSearch = async () => {
        const parsedSearchInput = await parseSearchInput();
        setState({component: ComponentType.SearchQuestion, questions: "", searchQuery: parsedSearchInput})
    };

    const parseSearchInput = async () => {
        let input = searchInput;

        let insideSquareBrackets = input.match(/\[([^\]]+)]/g);
        insideSquareBrackets = insideSquareBrackets ? insideSquareBrackets.map(match => match.replace(/\[|\]/g, '')) : [];

        let inputWithoutSquareBrackets = input.replace(/\[[^\]]+]/g, '');

        let outsideSquareBrackets = inputWithoutSquareBrackets.match(/[^[\]\s]+/g);

        return {
            tagParams: insideSquareBrackets,
            searchParams: outsideSquareBrackets || [],
        };
    }

    const handleInputChange = (event) => {
        setSearchInput(event.target.value)
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setSearchInput(event.target.value)
            handleSearch()
        }
    };

    return (
        <div className="container-fluid parent-div">
            <div className="fse-header">
                <div className="col-10 fsd-title">
                    <h1 className="title">Fake Stack Overflow</h1>
                </div>
                <div className="col-2 fse-searchBox">
                    <input type="text" className="searchBox" id="searchBar"
                           onChange={handleInputChange}
                           onKeyDown={handleKeyDown}
                           placeholder="Search . . ."/>
                </div>
            </div>
            <div className="secondDiv">
                <div className="row">
                    <div id="sideBarNav" className="col-md-auto list-div">
                        <div className="list-group list-group-div">
                            <button className={`list-group-item list-group-item-action ${state.component === ComponentType.Question ? 
                                'active' : ''}`} id="questions-menu-bar" onClick={() => press("questions")}>Questions
                            </button>
                            <button className={`list-group-item list-group-item-action ${state.component === ComponentType.Tag ? 
                                'active' : ''}`} id="tags-menu-bar" onClick={() => press("tags")}>Tags</button>
                        </div>
                    </div>
                    <div className="col" id="mainDiv">
                        {state.component === ComponentType.AskQuestion ? (<AskQuestions setComponent={setState}/>) : ""}
                        {state.component === ComponentType.Question ?
                            <Questions data={{state, setState, press}}/> :
                            state.component === ComponentType.Tag ?
                                <Tags data={{
                                    setState, press}}/> :
                                state.component === ComponentType.SearchQuestion ?
                                    <SearchComponent data={{state, setState, press}}/> :
                                    state.component === ComponentType.QuestionDetail ?
                                        <QuestionDetail data={{state, setState, press}}/> :
                                        state.component === ComponentType.AnswerQuestion ?
                                            <AnswerQuestion data={{state, setState}}/> :
                                    ""
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FakeStackOverFlow;
