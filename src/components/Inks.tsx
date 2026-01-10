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

    const getInks = async ({ hexColor, limit }: GetInksProps ) => {
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
    };

    return (
        <div>
            <h1>Search Inks by Color</h1>
            <div>
                <ColorPicker getInks={getInks}/>
                <div className="searchErrorNotif">
                    { searchFailed ? (
                        <span>There was an error querying the database!</span>
                    ) : (
                        <></>
                    )}
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
