import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useField } from 'formik';

const ImageUpload = (props) => {
  const [{ value, ...restField }, meta, helpers] = useField(props.name);
  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  const { currentImage } = props;
  const imgRef = useRef(null);

  useEffect(() => {
    if (currentImage && imgRef.current && !value) {
      imgRef.current.src = currentImage;
    }
  }, [currentImage, value]);

  const onChange = (e) => {
    const node = window.document.getElementById('imagePreview');
    let file;
    if (!e.target.files[0]) {
      file = [];
    } else {
      file = e.target.files[0];
    }

    const imageType = /image.*/;
    if (!file.type?.match(imageType)) {
      e.target.value = '';
    } else {
      helpers.setValue(file, false);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          {...restField}
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Chose file</label>
      </div>
      <img
        id="imagePreview"
        ref={imgRef}
        className={classNames({ [imgStyle]: !!value })}
        alt="user"
        style={{
          width: '140px',
          height: '140px',
          margin: '0 auto',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default ImageUpload;
