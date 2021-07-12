import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPacksListTC} from "../../reducers/r9-PacksReducer";
import {Slider} from "@material-ui/core";
import s from "./Search.module.css";
import { setCurrentDataAC} from "../../reducers/r12-CurrentDataReducer";
import {AppRootStateType} from "../../app/store";

export const Search: React.FC = () => {

    const {pageCount} = useSelector((state: AppRootStateType)=> state.currentData)
    const [text, setText] = useState<string>("")
    const dispatch = useDispatch()

    const [value, setValue] = useState<number[]>([0, 1000]);
    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    const searchCallback = () => {
        dispatch(setPacksListTC(undefined, pageCount, undefined, text, value[0], value[1]))
        dispatch(setCurrentDataAC(text, value[0], value[1]))
    }

    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    return (
        <div>
            <input onChange={onChangeTextHandler} value={text}/>
            <div className={s.range}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    // getAriaValueText={valuetext}
                />
            </div>
            <button onClick={searchCallback}>Search</button>
        </div>
    )
}