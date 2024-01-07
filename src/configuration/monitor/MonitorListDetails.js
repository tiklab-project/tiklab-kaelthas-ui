import React, {useState} from "react";
import {Button, Drawer, Radio, Space} from "antd";
import {withRouter} from "react-router-dom";

const MonitorListDetails = (props) => {
    // const [open, setOpen] = useState(false);

    const {open, setOpen} = props;

    const [placement, setPlacement] = useState('right');

    /*const showDrawer = () => {
        setOpen(true);
    };*/

    const onChange = (e) => {
        setPlacement(e.target.value);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            {/*<Button type="primary" onClick={showDrawer}>
                Open
            </Button>*/}

            <Drawer
                title="Drawer with extra actions"
                placement={placement}
                width={500}
                onClose={onClose}
                visible={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >

                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    );
};

export default withRouter(MonitorListDetails);