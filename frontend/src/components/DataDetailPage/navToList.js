const NavToList  = (pageOffset, idParam)=> {
    return (
        <div style={{display:'flex', alignItems:'center', marginLeft:'10px'}}>
              {/**link 컴포넌트화하기 */}
              <Link to={{pathname : '/DataManage', search: `?pageOffset=${pageOffset}`}}  style={{textDecorationLine:'none',display:'flex', alignItems:'center',}} >
                <IconButton style={{color:`${navy}`, backgroundColor:'white', border:`1px solid ${navy}`, borderRadius:'10px', marginRight:'10px'}}>
                  <FaArrowLeft/>
                </IconButton>
              </Link>
              {/**컴포넌트화 시키기 */}
              <span style={{textDecoration:'none', color:`${navy}`, fontSize:'30px', fontWeight:'600'}}>
                {idParam.id}
              </span>
            </div> 
    )
}
export default NavToList;