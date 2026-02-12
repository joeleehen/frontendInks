import ColorPicker from "./ColorPicker.tsx"
import Results from "./Results.tsx"
import { useState } from "react";
import api from "../api.ts"

interface GetInksProps {
    hexColor: string;
    limit: Number;
}

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

function Inks() {
    const [searchResults, setSearchResults] = useState<Ink[]>([]);
    const [searchFailed, setSearchFailed] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const throbberAfterStyle: React.CSSProperties = {
        overflow: "hidden",
        display: "inline-block",
        verticalAlign: "bottom",
        animation: "ellipsis steps(4, end) 1000ms infinite",
        position: "relative",
        bottom: "-5px",
        width: "0px",
    }

    const getInks = async ({ hexColor, limit }: GetInksProps ) => {
        setIsSearching(true);
        const params = { hex: hexColor, limit: Number(limit) }
        try {
            const { data, status } = await api.get<Ink[]>(
                '/inks/', { params });

            if (status !== 200) {
                console.error("Error querying API: status", status);
                setSearchFailed(true);
            }

            setSearchResults(data);
            setSearchFailed(false);

        } catch (error) {
            console.error("Error searching inks:", error);
            setSearchFailed(true);
        }

        setIsSearching(false);
    };

    return (
        <div>
            <h1>Search Inks by Color</h1>
            <div>
                <ColorPicker getInks={getInks}/>
                <div className="throbber">
                    { isSearching && 
                        <div className="throbber-container">
                            <span>loading results</span>
                            <div style={throbberAfterStyle}>{"\u2026"}</div>
                        </div>
                    }
                </div>

                <div className="searchErrorNotif">
                    { searchFailed && <span>There was an error querying the database!</span>}
                </div>

                <div>
                    <hr/>
                    <Results searchResults={searchResults} />
                </div>
            </div>
        </div>
    )
}

export default Inks;
