import classes from "./FileItem.module.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteFile, editFile, getFile } from "../../redux/actions/files";

class FileItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editToggle: false,
      filename: this.props.file.name,
    };
  }

  render() {
    let filetype = null;
    let nextBtn = null;
    if (this.props.file.folder === true) {
      filetype = "/image/folder.png";
      nextBtn = (
        <input
          type="image"
          src="/image/right-arrow.png"
          alt="Next"
          className={classes.next_btn}
          onClick={() => this.props.folderClick(this.props.file.id)}
        />
      );
    } else {
      filetype = "/image/" + this.props.file.name.split(".")[1] + ".png";
      nextBtn = <div className={classes.dummy_btn}></div>;
    }

    const fileName = (
      <p className={classes.file_name}>{this.props.file.name.split(".")[0]}</p>
    );

    const submit = () => {
      const newData = this.props.file;
      newData["name"] = this.state.filename;
      this.props.editFile(newData["id"], newData);
      this.setState({ editToggle: !this.state.editToggle });
    };
    const editName = (
      <input
        type="text"
        className={classes.file_name}
        value={this.state.filename}
        onChange={(event) => this.setState({ filename: event.target.value })}
      />
    );
    const editBtn = (
      <input
        type="image"
        src="/image/edit.png"
        alt="edit Btn"
        className={classes.delete_btn}
        onClick={() => this.setState({ editToggle: !this.state.editToggle })}
      />
    );
    const doneBtn = (
      <input
        type="image"
        src="/image/done.png"
        alt="done Btn"
        className={classes.delete_btn}
        onClick={submit}
      />
    );
    return (
      <div className={classes.file_item}>
        <img
          src={filetype}
          alt={this.props.file.name}
          className={classes.file_type_img}
        />
        {this.state.editToggle ? editName : fileName}
        <p className={classes.file_user}>{this.props.file.user.username}</p>
        <p className={classes.file_date}>
          {new Date(this.props.file.created_date).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {this.state.editToggle ? doneBtn : editBtn}
        <input
          type="image"
          src="/image/delete.png"
          alt="delete Btn"
          className={classes.delete_btn}
          onClick={() => this.props.deleteFile(this.props.file.id)}
        />
        {nextBtn}
      </div>
    );
  }
}

export default connect(null, { deleteFile, editFile, getFile })(FileItem);
