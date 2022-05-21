import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

class MenuDot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      open: Boolean(null)
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: Boolean(event.currentTarget)
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: Boolean(null)
    });
  };

  render() {
    const { open, anchorEl } = this.state;
    const { onDelete, note_id, note_value,onEdit } = this.props
    return (
      <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button"
          }}
        >
          <MenuItem onClick={() => {this.props.onDelete(note_id);this.handleClose}} >Delete</MenuItem>
          <MenuItem onClick={()=>{this.props.onEdit(note_id, note_value);this.handleClose}}>Edit</MenuItem>
        </Menu>
      </div>
    );
  }
}
export default MenuDot;
