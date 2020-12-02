import React, { Component } from "react";
import classes from "./GridItem.module.css";

export class GridItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editToggle: false,
      filename: this.props.file.name,
    };
  }
  render() {
    let filetype = null;

    if (this.props.file.folder === true) {
      filetype = "/image/folder.png";
    } else {
      filetype = "/image/" + this.props.file.name.split(".")[1] + ".png";
    }
    const fileName = (
      <p
        className={classes.file_name}
        onClick={() => this.setState({ editToggle: !this.state.editToggle })}
      >
        {this.props.file.name.split(".")[0]}
      </p>
    );
    const handleKeyPress = (target) => {
      if (target.charCode === 13) {
        const newData = this.props.file;
        newData["name"] = this.state.filename;
        const form_data = new FormData();
        for (let key in newData) {
          form_data.append(key, newData[key]);
        }
        this.props.editFile(newData["id"], form_data);
        this.setState({ editToggle: !this.state.editToggle });
      }
    };
    const editName = (
      <input
        type="text"
        className={classes.file_name}
        onKeyPress={handleKeyPress.bind(this)}
        value={this.state.filename}
        onChange={(event) => this.setState({ filename: event.target.value })}
      />
    );
    return (
      <div
        className={classes.file_item}
        onClick={() => this.props.folderClick(this.props.file.id)}
      >
        <img
          src={filetype}
          alt={this.props.file.name}
          className={classes.file_type_img}
        />
        {this.state.editToggle ? editName : fileName}
      </div>
    );
  }
}

export default GridItem;
