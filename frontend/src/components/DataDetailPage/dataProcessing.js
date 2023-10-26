// 축산물 이력 데이터를 json 객체로 변환하는 함수
function convertToApiData ( birthYmd, butcheryYmd,farmAddr,farmerNm,gradeNm, primalValue,secondaryValue,sexType,species,traceNum){
    const apiData = {
      birthYmd: birthYmd,
      butcheryYmd: butcheryYmd,
      farmAddr: farmAddr,
      farmerNm: farmerNm,
      gradeNm: gradeNm,
      primalValue: primalValue,
      secondaryValue: secondaryValue,
      sexType: sexType,
      species: species,
      traceNum: traceNum,
    };
    return apiData;
};

export default function dataProcessing (items) {
     // 3. API fetch가 정상적으로 일어난 경우 데이터를 JSON객체로 변환해서 반환
    console.log('items', items.birthYmd);
    // 3-1. 축산물 이력 데이터 json 객체로 만들기 
    const apiData = convertToApiData(
        items.birthYmd,
        items.butcheryYmd,
        items.farmAddr,
        items.farmerNm,
        items.gradeNum,
        items.primalValue,
        items.secondaryValue,
        items.sexType,
        items.specieValue,
        items.statusType,
        items.traceNum,
    );
    // 3-2. 처리육이 있는 경우 가열육, 실험실 추가 데이터 필요 -> 배열로 관리 , 기본 값은 원육 으로 
    let processedData = [];
    let heatedData = [items.rawmeat.heatedmeat_sensory_eval,];
    let labData = [items.rawmeat.probexpt_data];
    let processedMinute = [];
    //데이터 처리 횟수 parsing ex) 1회, 2회 ,...
    let processedDataSeq = ['원육',];
    // 처리육 이미지 
    let processedDataImgPath = [];

    // n회차 처리육에 대한 회차별 정보 
    for (let i in items.processedmeat){
    //processedDataSeq.push(i);
    processedDataSeq = [...processedDataSeq, i];
    processedData = [...processedData, items.processedmeat[i].sensory_eval];
    heatedData = [...heatedData, items.processedmeat[i].heatedmeat_sensory_eval];
    labData = [...labData, items.processedmeat[i].probexpt_data];
    processedMinute = [...processedMinute, items.processedmeat[i].sensory_eval.deepaging_data.minute];
    processedDataImgPath = [...processedDataImgPath, items.processedmeat[i].sensory_eval.imagePath];
    }
    // 처리육 데이터가 {} 인 경우 processedData, processedMinute, processedDataImgPath(ok) 은 [] 값이 됨.
    // 3-3. 데이터를 json 객체로 만들기 
    const data = {
        id: items.id,
        userId: items.userId,
        createdAt: items.createdAt.replace('T', ' '),
        qrImagePath: items.imagePath,
        raw_data: items.rawmeat.sensory_eval,
        raw_img_path : items.rawmeat.sensory_eval? items.rawmeat.sensory_eval.imagePath : "null",
        processed_data: processedData,
        heated_data : heatedData,
        lab_data: labData,
        api_data: apiData,
        processed_data_seq : processedDataSeq,
        processed_minute : processedMinute,
        processed_img_path : processedDataImgPath,
    };
    console.log('data process =', data);
    return data;
}



