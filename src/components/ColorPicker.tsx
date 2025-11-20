import { HexColorPicker, HexColorInput } from "react-colorful";
import { useState } from "react";
import "../styles.css";

const ColorPicker = ({ getInks } : { getInks: Function }) => {
    const [color, setColor] = useState<string>("#BF5700");
    const [limit, setLimit] = useState<number>(5);

    function getBrightness(hexStr: string): number {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexStr);
        if (!result) {
            return 0
        }

        let brightness = 0

        try {
            let rgb = [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16)
            ];
            brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        }
        catch (error: any) {
            brightness = 0;
        }

        return brightness;
    }

    const previewStyle = {
        backgroundColor: color,
        borderRadius: "5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: getBrightness(color) > 128 ? "black" : "white",
    };

    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("event:", event);
        const result = event.target.value.replace(/\D/g, '');
        setLimit(Number(result))
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        getInks({hexColor: color, limit: limit});
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ paddingLeft: "2%" }}>
                <div className="picker">
                    <HexColorPicker color={color.toUpperCase()} onChange={setColor} />
                    <span style={previewStyle}>{color.toUpperCase()}</span>
                </div>
                <div className="hexField" style={{ display: "flex" }}>
                    <HexColorInput color={color.toUpperCase()} onChange={setColor} prefixed />
                    <div className="colorPreview" style={{ backgroundColor: color }}></div>
                </div>
                <input 
                    type="text"
                    value={limit}
                    onChange={handleLimitChange}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default ColorPicker;
