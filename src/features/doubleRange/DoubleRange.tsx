import React, {useState} from "react";
import {Slider} from "@material-ui/core";

type DoubleRangePropsType = {

}

export const DoubleRange: React.FC<DoubleRangePropsType> = (props) => {

    const [value, setValue] = useState<number[]>([0, 1000]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[])
    };

    return (
        <div>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                // getAriaValueText={valuetext}
            />
        </div>
    )
}