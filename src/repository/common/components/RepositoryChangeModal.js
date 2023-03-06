import React, { useEffect, useRef, useState } from "react";
import "./RepositoryChangeModal.scss";
import { useTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react";

const ChangeRepositoryModel = (props) => {
    const { repositorylist, searchrepository, setWorkType, repository } = props;

    const [showMenu, setShowMenu] = useState(false);
    const [selectRepository, setSelectRepository] = useState(false)

    const modelRef = useRef()
    const setButton = useRef()

    const showMoreMenu = () => {
        setShowMenu(!showMenu)
        modelRef.current.style.left = setButton.current.clientWidth
    }


    useEffect(() => {
        window.addEventListener("mousedown", closeModal, false);
        return () => {
            window.removeEventListener("mousedown", closeModal, false);
        }
    }, [showMenu])

    const closeModal = (e) => {
        if (!modelRef.current) {
            return;
        }
        if (!modelRef.current.contains(e.target) && modelRef.current !== e.target) {
            setShowMenu(false)
        }
    }

    /**
     * 切换项目
     * @param {id} id 
     */
    const selectRepositoryId = (id) => {
        // 切换选中项目，获取项目详情
        searchrepository(id).then(data => {
            if (data.code === 0) {
                props.history.push(`/index/repositorydetail/${id}/survey`)
                // 重置事项id
                // 关闭切换弹窗
                setShowMenu(false)
                location.reload();
            }
        });
        // 讲当前项目id存入localStorage
    }

    const handleMouseOver = (id) => {
        setSelectRepository(id)
    }

    const handleMouseOut = () => {
        setSelectRepository("")
    }

    return (
        <div className="change-repository">
            <div ref={setButton}>
                <div className='repository-title-icon' onClick={showMoreMenu} >
                    <div className={`repository-toggleCollapsed`}>
                        <svg className="svg-icon" aria-hidden="true">
                            <use xlinkHref="#icon-down"></use>
                        </svg>
                    </div>
                </div>
            </div>

            <div
                className={`change-repository-box ${showMenu ? "menu-show" : "menu-hidden"}`}
                ref={modelRef}
                style={{}}
            >
                <div className="change-repository-head">切换知识库</div>
                {
                    repositorylist && repositorylist.map((item) => {
                        return <div className={`change-repository-name ${item.id === selectRepository ? "change-repository-selectName" : ""}`}
                            onClick={() => selectRepositoryId(item.id)}
                            key={item.id}
                            onMouseOver={() => handleMouseOver(item.id)}
                            onMouseOut={handleMouseOut}

                        >
                            {
                                item.iconUrl ?
                                    <img
                                        src={('images/' + item.iconUrl)}
                                        className="img-icon"
                                        title={item.name}
                                        alt=""
                                    />
                                    :
                                    <img
                                        className="img-icon"
                                        src={('images/repository1.png')}
                                        title={item.name}
                                        alt=""
                                    />
                            }
                            {item.name}
                        </div>
                    })
                }
            </div>
        </div>
    )
}
export default withRouter(inject("repositoryDetailStore")(observer(ChangeRepositoryModel)));