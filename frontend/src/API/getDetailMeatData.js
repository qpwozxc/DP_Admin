//import useSWR from "swr"

export default async function GetDetailMeatData (id){
    const apiIP = '3.38.52.82';
    const json = await (
      await fetch(
        `http://${apiIP}/meat/get?id=${id}`
        )
    ).json();
    console.log("connected!!", json);
    /*const response = await (fetch('/meat').catch(handleError));
    if (response.ok){ -> try catch 문 고려 
        const json = await(response).json();
        setItems(json);
        setIsLoaded(true);
    } else{
        // error 
        setIsLoaded(true);
        setError();
        return Promise.reject(response);
    }*/
    return json;
};