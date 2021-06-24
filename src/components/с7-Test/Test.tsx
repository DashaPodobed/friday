import React, {useState} from "react";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";

export const Test = () => {
    const [text, setText] = useState('')

    const changeText = (newValue: string) => {
        setText(newValue)
        console.log(text)
    }
    const onBtnClick = () => {
        console.log("btn")
        alert(text)
        setText("")
    }
    const onChangeCheckboxValue = () => {
        console.log("Checkbox")
    }
    return (
        <div>
            <div><SuperButton onClick={onBtnClick}>add</SuperButton></div>
            <div><SuperInputText value={text} onChangeText={changeText}/></div>
            <div><SuperCheckbox onChange={onChangeCheckboxValue}/></div>
        </div>
    )
}