import './application.css'

const Applicationfeild=({title,inputtype})=>{
  return(
    <>
      <div className="feild">
        <div className="det">
          {title}
        </div>
        <input className='next' type={inputtype}/>
      </div>
    </>
  )
}
export default Applicationfeild;