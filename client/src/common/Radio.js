import styles from './Input.module.css'

const Radio = (props) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
            type="radio"
            style={{ marginRight: '5px' }}
        />
        <label>{props.label}</label>
    </div>
  );
}

export default Radio;