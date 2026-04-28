 const FormGroup = ({type, name, placeholder, value, onChange}) => {
   return (
     <div className='form-group'>
       <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
     </div>
   )
 }
 
 export default FormGroup
 