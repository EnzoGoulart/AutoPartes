//Props:
//rate: numero da nota em ingles ex 4.5 OBRIGATÓRIO
//width: width e height DEFAULT 18px
//marginRight: Distância da string da nota DEFAULT não tem
import { useState, useEffect } from "react";
import "./stars.css";
export default function Stars(props) {
    const rate = Number(props.rate);
    const ratePercent = (rate % 1).toFixed(2) * 100;
    const [widthDiv, setWidthDiv] = useState(
        `linear-gradient(135deg, var(--Yellow) 0%, var(--Yellow) ${ratePercent}%, var(--Text) ${ratePercent}%, var(--Text) 100%)`
    );

    const [color1I, setColor1I] = useState("var(--Text)");
    const [color1C, setColor1C] = useState("var(--Text)");
    const [color2I, setColor2I] = useState("var(--Text)");
    const [color2C, setColor2C] = useState("var(--Text)");
    const [color3I, setColor3I] = useState("var(--Text)");
    const [color3C, setColor3C] = useState("var(--Text)");
    const [color4I, setColor4I] = useState("var(--Text)");
    const [color4C, setColor4C] = useState("var(--Text)");
    const [color5I, setColor5I] = useState("var(--Text)");
    const [color5C, setColor5C] = useState("var(--Text)");

    useEffect(() => {
        setColor1I("none");
        setColor1C("var(--Yellow)");

        if (rate >= 1 && rate < 2) {
            setColor2I(widthDiv);
            setColor2C("none");
        } else if (rate >= 2) {
            setColor2I("none");
            setColor2C("var(--Yellow)");
        }

        if (rate >= 2 && rate < 3) {
            setColor3I(widthDiv);
            setColor3C("none");
        } else if (rate >= 3) {
            setColor3I("none");
            setColor3C("var(--Yellow)");
        }

        if (rate >= 3 && rate < 4) {
            setColor4I(widthDiv);
            setColor4C("none");
        } else if (rate >= 4) {
            setColor4I("none");
            setColor4C("var(--Yellow)");
        }

        if (rate >= 4 && rate < 5) {
            setColor5I(widthDiv);
            setColor5C("none");
        } else if (rate === 5) {
            setColor5I("none");
            setColor5C("var(--Yellow)");
        }
    }, []);

    useEffect(() => {}, []);
    return (
        <div className="starsContainer">
            <div
                className="faStar"
                style={{
                    backgroundColor: color1C,
                    backgroundImage: color1I,
                    height: props.width || "18px",
                    width: props.width || "18px",
                }}
            ></div>
            <div
                className="faStar"
                style={{
                    backgroundColor: color2C,
                    backgroundImage: color2I,
                    height: props.width || "18px",
                    width: props.width || "18px",
                }}
            ></div>
            <div
                className="faStar"
                style={{
                    backgroundColor: color3C,
                    backgroundImage: color3I,
                    height: props.width || "18px",
                    width: props.width || "18px",
                }}
            ></div>
            <div
                className="faStar"
                style={{
                    backgroundColor: color4C,
                    backgroundImage: color4I,
                    height: props.width || "18px",
                    width: props.width || "18px",
                }}
            ></div>
            <div
                className="faStar"
                style={{
                    backgroundColor: color5C,
                    backgroundImage: color5I,
                    height: props.width || "18px",
                    width: props.width || "18px",
                    marginRight: props.marginRight || "0",
                }}
            ></div>
        </div>
    );
}
