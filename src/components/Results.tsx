import InkResult from "./InkResult.tsx"

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

function Results({ searchResults } : { searchResults: Ink[] }) {


    return (
        <div className="results" style={{display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {Array.isArray(searchResults) ? (
                searchResults.map(ink => (
                    <InkResult key={ink.id} ink={ink} />
                ))
            ) : (
                <></>
            )}
        </div>
    )
}

export default Results;
