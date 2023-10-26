import { useState, useEffect } from "react";
import { useParams, useLocation ,Link } from "react-router-dom";
import { Box, Typography, Button, IconButton} from '@mui/material';
import "bootstrap/dist/css/bootstrap.css"; 
import { FaArrowLeft } from "react-icons/fa";
import DataLoad from "../components/DataDetailPage/DetailDataController";

const navy =  '#0F3659';

function DataEdit(){
    //현재 로그인한 유저 이메일
    const [currentUser, setCurrUser] = useState("admin@admin.com");

    //로그인한 관리자의 관리번호 받아오기
    //const {editId} = useParams();
    //관리번호
     const idParam  = useParams();

    return (
      <Box>
        <Box >
          <div style={style.fixed}>
            <Link to={{pathname : '/DataManage'}} style={{textDecorationLine:'none',display:'flex', alignItems:'center',}}>
              <IconButton style={{color:`${navy}`, backgroundColor:'white', border:`1px solid ${navy}`, borderRadius:'10px', marginRight:'10px'}}>
                <FaArrowLeft/>
              </IconButton>
              <span style={{textDecoration:'none', color:`${navy}`, fontSize:'30px', fontWeight:'600'}}>
               {idParam.id}
              </span>
            </Link>
          </div>
        </Box>
        <DataLoad id = {idParam.id} page = {"수정및조회"} currentUser={currentUser}/>
        
      </Box>
    );
}
export default DataEdit;

const style={
  fixed:{
    position: 'fixed', 
    top:'95px',
    right:'0',
    left:'80px',
    zIndex: 1,
    width:'fit-content',
    borderRadius:'0',
    display:'flex',
    justifyContent:'space-between',
    //backgroundColor:'tran',
    height: "70px",
  },

}

