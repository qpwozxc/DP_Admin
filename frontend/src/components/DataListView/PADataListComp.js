import { useState, useEffect, } from "react";
import { Box,} from "@mui/material";
import DataList from "./DataList";
import Pagination from "./Pagination";
import Spinner from "react-bootstrap/Spinner";
import getPredictedMeatList from "../../API/getPredictedMeatList";


const PADataListComp=({startDate, endDate})=>{
  const [isLoaded, setIsLoaded] = useState(true);
  const [meatList, setMeatList] = useState([]);
  // 페이지네이션 - api로 부터 받아오는 정보 전체 데이터 개수
  const [totalData, setTotalData] = useState(0);
  // 페이지네이션 컴포넌트와 공유하는 변수 -> current page 변화하면 api 새로 가져옴 
  const [currentPage, setCurrentPage] = useState(1);
  const count = 6; // 한페이지당 보여줄 개수 

  //API로부터 fetch 하는 함수
  const handlePredictedMeatListLoad = async () => {
     const json = await getPredictedMeatList((currentPage - 1), count, startDate, endDate);

    // 전체 데이터 수
    setTotalData(json["DB Total len"]);
    // 데이터 가공
    let data = [];
    json.id_list.map((m) => {
      data = [...data, json.meat_dict[m]];
    });
    setMeatList(data);

    // 데이터 로드 성공
    setIsLoaded(true);
  };

  //데이터 api 로 부터 fetch
  useEffect(() => {
    handlePredictedMeatListLoad(currentPage - 1 );
  }, [startDate, endDate, currentPage,]);


  /*// 예측 get
  const [predictItems, setPredictItems] = useState([]);
  const [isPredicted , setIsPredicted] = useState(false);
  const [data, setData] = useState();
  const [datas, setDatas] = useState([]);
  // 처음 한번만 받아오는 게 나을 듯 
  useEffect(()=>{
    for (let i = 0; i < meatList.length; i++){
        GetSingleData(meatList[i].id, setData);
        if (data){
            setDatas([...datas, data['butcheryYmd']]);
            console.log(meatList[i].id,data['butcheryYmd'] )
        }
            
    }
  },[meatList])
  console.log(currentPage,datas);*/

  return (
    <div>
      <div style={style.listContainer} >
        {
          isLoaded
          ? (//데이터가 로드된 경우 데이터 목록 반환
          <DataList
            meatList={meatList}
            pageProp={'pa'}
            //setChecked = {setPredictItems}
            offset={currentPage-1}
            count={count}
          />
          )
          : (// 데이터가 로드되지 않은 경우 로딩중 반환
             <Spinner animation="border" />
          )
        }
      </div>
      
      <Box sx={style.paginationBar}>
        <Pagination totalDatas={totalData} count={count} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </Box>
    </div>
  );
}

export default PADataListComp;


const style = {
  listContainer :{
    textAlign: "center",
    width: "100%",
    paddingRight:'0px',
    //padding: "0px 120px",
    paddingBottom: "0",
    height:'500px'
  },
  paginationBar : {
    display: "flex",
    position: "fixed",
    bottom: "10px",
    marginTop: "40px",
    width: "100%",
    justifyContent: "center",
  },
  PABtnContainer : {
    display:'flex', 
    margin:'20px 0', 
    padding:'0px 100px',  
    justifyContent:'start',
    position:'fixed',
    bottom:'10px',
    left:'50px'
  }
}