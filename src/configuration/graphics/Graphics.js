import React from 'react';
import TopList from "../../common/TopList";
import LeftMenu from "../common/LeftMenu";
import "./Graphics.scss"
import AddGraphics from "./AddGraphics";

const Graphics = () => {

    return (
        <div>
            <TopList/>
            <div className="box-graphics">
                <LeftMenu/>

                <div className="box-graphics-right">
                    <div className="box-graphics-title">
                        <div className="box-graphics-title-text">
                            <div>图形</div>
                        </div>
                        <div className="graphics-top-right">
                            <div className="graphics-top-right-button">
                                <AddGraphics/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default Graphics;