import styles from './Input.module.css'

const Input = (props) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>
        {props.label}
        {props.isRequired && <span style={{ color: '#DD4A3D', marginLeft: 0 }}>*</span> }
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder ? props.placeholder : "Marry Doe"}
        className={styles.inputField}
        required
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

export default Input;