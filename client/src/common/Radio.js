import styles from './Input.module.css'

const Radio = ({ label, name, checked, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="radio"
        name={name}       // ✅ group banane ke liye
        checked={checked} // ✅ state ke hisaab se select hoga
        onChange={onChange} // ✅ state update karega
        style={{ marginRight: '5px' }}
      />
      <label>{label}</label>
    </div>
  );
}

export default Radio;
