export const FileInput = ({ onChange, value, ...props }) => {
  // console.log('props: ' + JSON.stringify(props));
  const localOnChange = (e) => {
    // value = e.target.files[0];
    onChange(e.target.files[0]);
  };
  return <input type="file" onChange={localOnChange} {...props}></input>;
};
