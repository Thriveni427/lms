import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
//import LinearProgress from '@material-ui/core/LinearProgress'
const styled = require("styled-components").default;

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#6c6";
  }
  return "#666";
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${props => getColor(props)};
  border-style: ${props => (props.isDragActive ? "solid" : "dashed")};
  background-color: ${props => (props.isDragActive ? "#eee" : "")};
`;
const MediaUpload = props => {
  //console.log("props in mediaupload");
  //console.log(props);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      props.handleFiles(file);
    });
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({ onDrop });
  //console.log(acceptedFiles);
  const files = acceptedFiles.map(file => <li key={file.path}>{file.name}</li>);

  return (
    <div className="c-mediaUpload">
      <Container
        className="d-flex"
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p className="msg">
          Drag 'n' drop some files here, or click to select files......
        </p>

        
      </Container>
      {acceptedFiles ? (
          <p className="c-mediaUpload__files">
            <ul className="details">{files}</ul>
          </p>
        ) : null}
    </div>
  );
};
export default MediaUpload;
