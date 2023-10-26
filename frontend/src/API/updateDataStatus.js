export default async function updateDataStatus(apiIP,confirmVal, id, setStateChanged){

    try{
        const response = await fetch(`http://${apiIP}/meat/${confirmVal}?id=${id}`);
        setStateChanged(true);
        if (!response.ok) {
            throw new Error('서버에서 응답 코드가 성공(2xx)이 아닙니다.');
        }
        // 서버에서 받은 JSON 응답 데이터를 해석
        const responseData = await response.json(); 
        return responseData;
    }catch(err){
        console.error(err);
    }
}