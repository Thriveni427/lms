import React, { Component } from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export class MaterialAction extends Component {
    handleDelete = (id) => {
        console.log(id)
    }
    render() {

    const {
        handleClose,
        ITEM_HEIGHT,
        anchorEl,
        open,
        MaterialID
    } = this.props;
        return (
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
            >
                <MenuItem key={"edit"} >
                    Edit
                </MenuItem>
                <MenuItem key={MaterialID} onClick={ this.handleDelete(MaterialID) }>
                    {MaterialID}
                </MenuItem>
            </Menu>
        )
    }
}