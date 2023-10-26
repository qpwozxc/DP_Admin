import { useState, useEffect } from "react";
import { Box, IconButton,FormControl, MenuItem, Select, Divider,} from '@mui/material';
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";

const navy = '#0F3659';

function Pagination({count,totalDatas,currentPage, setCurrentPage }){
      // 페이지네이션 - 전체 페이지 개수 
  const totalPages = Math.ceil(totalDatas / count);

    //count - 한페이지당 보여줄 데이터 개수 
    const pageArr = Array.from({length: totalPages}, (undefined, i) => i+1); 
    // 이전 버튼 클릭
    const handlePrevClick = () => {
        setCurrentPage((prev)=> (prev-1));
    }
    // 다음 버튼 클릭
    const handleNextClick = () => {
        setCurrentPage((prev)=> (prev+1) );
    }

    return(
        <Box style={{display:'flex', justifyContent:'space-between', width:'100%', paddingRight:'130px', alignItems:'center'}}>
            <span>
                {(currentPage-1)*count+1}-{(currentPage*count)>totalDatas? totalDatas:(currentPage*count)} of {totalDatas}
            </span>
            <Box style={{display:'flex', alignItems:'center'}}>
                <Box style={{display:'flex' , alignItems:'center'}}>
                    <span>현재 페이지</span>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                        value={currentPage}
                        onChange={(event)=>setCurrentPage(event.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        style={{height:'35px'}}
                        >
                        {
                            pageArr.map((pageNum)=>(
                                <MenuItem value={pageNum}>{pageNum}</MenuItem>
                            ))
                        }
                        </Select>
                    </FormControl>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box style={{display:'flex', alignItems:'center'}}>
                    <IconButton variant="contained" size="small" sx={{height:'40px', width:'40px', borderRadius:'10px', marginRight:'5px', padding:'0', border:'1px solid black'}} onClick={handlePrevClick} 
                        disabled={currentPage === 1}
                    >
                        <FaArrowLeft/>
                    </IconButton>
                    <IconButton variant="contained" size="small" sx={{height:'40px', width:'40px', borderRadius:'10px', padding:'0', border:'1px solid black'}}  
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                    >
                        <FaArrowRight/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export default Pagination;
