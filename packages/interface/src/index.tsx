import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

class LookingGlass extends React.PureComponent {
    public render() {
        return (
            <div className="main">
                Hello World!
            </div>
        )
    }
}

ReactDOM.render(<LookingGlass />, document.getElementById("main-app"));
