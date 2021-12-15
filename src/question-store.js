
import { writable } from "svelte/store";
export const pageNumber = writable(1);
export const currentQuestion = writable(0);
export const useranswer=writable({});
export const correctanswer=writable(0);
export const incorrectanswer=writable(0);
export const attempted = writable(0);
export const unattempted = writable(0);
export const allData=writable([fetchData()]);
export const show = writable(false);


async function fetchData(){
fetch("copy.json").
    then(response=>response.json()).
    then(data=>{
        // const updatedData=data;
        allData.set(data);
    })
};


 