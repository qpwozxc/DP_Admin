import { useState, useEffect, useSyncExternalStore } from "react"
import {Backdrop,Box, Modal, Fade,Button, Typography} from '@mui/material';
import {FaRegTrashAlt} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import updateDataStatus from "../../API/updateDataStatus";
const apiIP = '3.38.52.82';
const navy =  '#0F3659';

export default function DelWarningModal({idArr, setIsDelClick}) {
    //화면 창 닫기
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const handleClose = () => {
      setOpen(false); 
      setIsDelClick(false); 
      //window.location.reload();
    };
    const ondelete = async(id) =>{
      const resp= await fetch(`http://${apiIP}/meat/delete?id=${id}`);
      console.log('response', resp, id);
    }
  
    /*let idArr = [];
    if (typeof(id) !== 'string'){
      idArr = Array.from({ length: id.length }, (_, index) => id[index]);
    }else{
      idArr.push(id);
    }
    console.log('삭제할 배열 목록',idArr, id);*/
    const handleOnDelete=async()=>{
        for (let i = 0; i < idArr.length; i++){
          await ondelete(idArr[i]);
        }
        window.location.reload();
        handleClose();
    }
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" key={"transition-modal-title"} variant="h6" component="h2">
                <span style={{color:navy, fontSize:'20px', fontWeight:'600'}}>
                정말로 삭제하시겠습니까?
                </span>
                <div></div>
                <span style={{color: '#b0bec5', fontSize:'12px', lineHeight:'5px'}}>
                삭제 버튼 클릭 시 아래 관리 번호에 해당하는 데이터가 바로 삭제됩니다. 삭제된 데이터는 복원할 수 없습니다.
                </span>
              </Typography>

              <Box style={{border:'1px solid #b0bec5',borderRadius:'10px',margin:'10px 0px', height:'130px'}}>
              {idArr.map(id => (
                <Typography id="transition-modal-description" key={"transition-modal-description"}  sx={{ mt: 2 }}>
                  {id}
                </Typography>
              ))}
              </Box>
              
              <div style={{display:'flex', width:'100%', justifyContent:'end'}}>
                <Button 
                  variant="outlined" sx={{marginRight:'5px'}} 
                  onClick={handleClose}  
                  style={{backgroundColor:'white',marginRight:'10px',border:`1px solid ${navy}`, height:'35px', borderRadius:'10px', width:'100px', fontSize:'17px'}}>
                  아니오
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleOnDelete} 
                  style={{backgroundColor:navy, height:'35px', borderRadius:'10px', width:'100px', fontSize:'17px',}}>
                 <FaRegTrashAlt/>
                 삭제
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:'10px'
  };