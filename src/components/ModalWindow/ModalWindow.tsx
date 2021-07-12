import React from "react";
import style from "./ModalWindow.module.css"

export const ModalWindow = () => {
    return (
        <div>
            <h1 style={{textAlign: "center", marginTop: "20px", marginBottom: "20px"}}>Модальное окно на чистом CSS</h1>
            <div className={"container"}>
                <div style={{textAlign: "center"}}>
                    <a href="#openModal">Открыть модальное окно</a>
                </div>
                <div id="openModal" className={style.modal}>
                    <div className={style.modalDialog}>
                        <div className={style.modalContent}>
                            <div className={style.modalHeader}>
                                <h3 className={style.modalTitle}>Название</h3>
                                <a href="#close" title="Close" className={style.close}>×</a>
                            </div>
                            <div className={style.modalBody}>
                                Содержимое модального окна...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
