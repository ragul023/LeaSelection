import './application.css'

const Applicationfeild=({title,inputtype,tamil,onChange,value})=>{
  return(
    <>
      <div className="feild">
        <div className="det">
          {title} <br />
          <span>{tamil}</span>
        </div>
        <input className='next' type={inputtype} onChange={(e) => onChange(inputtype, e.target.value)} value={value}/>
      </div>
    </>
  )
}
export default Applicationfeild;