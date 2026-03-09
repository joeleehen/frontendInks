interface Ink {
    name: string;
    id: string;
    brand: string;
    review_url: string;
    image_url: string;
    shimmer: string;
    sheen: string;
    shading: string;
    hex: string[];
    lab: number[][];
    distance: number
};

function InkResult({ ink: ink } : { ink: Ink }) {

    let swatchCaptionStyle = {
        backgroundColor: ink.hex[0],
        padding: "2%",
        borderRadius: "9%",
        margin: "auto",
        display: "table",
        color: "white",
        fontFamily: "M2cregular"
    }

    if (ink.lab[0] !== undefined) {
        swatchCaptionStyle.color = ink.lab[0][0] > 50 ? "black" : "white";
    }

    return (
        <div className="InkResult" style={{ padding: "1% 2%" }}>
            {ink === undefined ? (
                <></>
            ) : (
                <>
                    <a href={ink.review_url} target="_blank">
                        <img src={ink.image_url} />
                    </a>
                    <span className="swatchCaption" style={swatchCaptionStyle}>{ink.hex[0].toUpperCase()}</span>
                </>

            )}
        </div>
    )
}

export default InkResult;
