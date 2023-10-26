import { Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';

const PredictedRawTable=({raw_data, dataPA})=>{

    return (
        <TableContainer key='rawmeat' component={Paper} sx={{width:'fitContent',overflow:'auto',marginTop:'40px'}}>
            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                <TableHead>
                </TableHead>
                <TableBody>
                    {rawPAField.map((f, idx)=>{
                        return(
                            <TableRow key={'raw-Row'+idx}>
                                <TableCell key={'raw-'+idx+'col1'}>{f}</TableCell>
                                <TableCell key={'raw-'+idx+'col2'} style={{display:'flex'}}>
                                    <div>
                                    {
                                    dataPA
                                    ?f === 'xai_gradeNum'
                                        ? dataPA['xai_gradeNum'] === 0 ? "0" : dataPA[f]
                                        : dataPA[f] ? dataPA[f].toFixed(2) : ""
                                    :""
                                    }
                                    </div>
                                    
                                    {// 오차 계산
                                        f !== "xai_gradeNum"
                                        && 
                                        (
                                            <div style={{marginLeft:'10px'}}>
                                                {dataPA
                                                ? dataPA[f] 
                                                    ? <span style={(dataPA[f].toFixed(2) - raw_data[f] )>0?{color:'red'}:{color:'blue'}}>
                                                        {
                                                            (dataPA[f].toFixed(2) - raw_data[f])>0
                                                            ? '(+'+(dataPA[f].toFixed(2) - raw_data[f]).toFixed(2)+')'
                                                            : '('+(dataPA[f].toFixed(2) - raw_data[f]).toFixed(2)+')'
                                                        }
                                                        
                                                        </span>  
                                                    : <span></span>
                                                :""}
                                                
                                            </div>
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PredictedRawTable;

const rawPAField =['marbling','color','texture','surfaceMoisture','overall','xai_gradeNum'];