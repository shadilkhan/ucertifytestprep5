
<script>
  import { fly,fade,slide, scale } from 'svelte/transition';
  // import { flip } from "svelte/animate";
  import { afterUpdate,beforeUpdate } from "svelte";
  import {
    allData,attempted,unattempted,currentQuestion,useranswer,pageNumber
  } from './question-store';
 let show = true;
 let showattempt=false;
 let attemptedlength=false;
 let unattemptedlength=false;
 let showunattempt=false;


afterUpdate(()=>{
  $unattempted=$allData.length-$attempted;
})

 function itemsclicked(action){
  if(action=='unattempted'){
    if($unattempted==0){
  unattemptedlength=true;
    }
    show=false;
    showattempt=false;
    showunattempt=true;
    console.log($unattempted);
    allquestion=$allData.filter((ques,index)=>{
return(
  !$useranswer.hasOwnProperty(index) ||
  ($useranswer.hasOwnProperty(index)&&
  $useranswer[index].isCorrect==''
))
    });
   

  }else if(action=='attempted'){
    console.log($attempted);
    if($attempted==0){
  attemptedlength=true;
    }
    allquestion=$allData.filter((ques,index)=>{
    return(
      $useranswer.hasOwnProperty(index)&&
      $useranswer[index].isCorrect!=""
    )
  })
  showattempt=true;
  show=false;
  showunattempt=false;
  }
  else
  if(action=='allitem'){
    allquestion=$allData;
    show=true;
    showattempt=false;
    showunattempt=false;
  
  }
 }
 let allquestion=$allData;

 function goto(i){
   currentQuestion.set(i);
   pageNumber.set(i+1);
   let user_input = { choosenAns: '', isCorrect: ''};
    if ($useranswer[i]) {
      user_input = { choosenAns: $useranswer[i].choosenAns,isCorrect: $useranswer[i].isCorrect,};
    } else {$useranswer[i] = user_input;
    }
 }
</script>

{#if showattempt}
  <section transition:fly={{ x: -300,duration:0.00}}>
    <div class="allitem">
    <div class="allquestion" on:click="{()=>{itemsclicked('allitem')}}">
      All Item : {$allData.length}</div>
    <div class="attempted" on:click="{()=>{itemsclicked('attempted')}}">
      Attempted : {$attempted}</div>
    <div class="unattempted" on:click="{()=>{itemsclicked('unattempted')}}" >
      UnAttempted : {$unattempted}</div>
    </div>
    
    <ol type="1">
      {#if attemptedlength}
    <button class="linkattempt">Nothing is Attempted Yet!!!</button>
    {/if}
      {#each allquestion as dataItem, i (dataItem)}
        <li id="list{i}">
          
          <button  id="ques-btn{i}" class="linkattempt" on:click={goto(i)}
            >{JSON.parse(dataItem.content_text).question}</button
          >
        </li>
      {/each}
      
    </ol>
  </section>
{/if}
{#if show}
  <section transition:fly={{ x: -300,duration:0.000}}>
    <div class="allitem">
    <div class="allquestion" on:click="{()=>{itemsclicked('allitem')}}">
      All Item : {$allData.length}</div>
    <div class="attempted" on:click="{()=>{itemsclicked('attempted')}}">
      Attempted : {$attempted}</div>
    <div class="unattempted" on:click="{()=>{itemsclicked('unattempted')}}" >
      UnAttempted : {$unattempted}</div>
    </div>
    <ol type="1">
      {#each allquestion as dataItem, i (dataItem)}
        <li id="list{i}">
          <button  id="ques-btn{i}" class="link" on:click={goto(i)}
            >{JSON.parse(dataItem.content_text).question}</button
          >
        </li>
      {/each}
    </ol>
  </section>
{/if}
{#if showunattempt}
  <section transition:fly={{ x: -300,duration:0.000}}>
    <div class="allitem">
    <div class="allquestion" on:click="{()=>{itemsclicked('allitem')}}">
      All Item : {$allData.length}</div>
    <div class="attempted" on:click="{()=>{itemsclicked('attempted')}}">
      Attempted : {$attempted}</div>
    <div class="unattempted" on:click="{()=>{itemsclicked('unattempted')}}" >
      UnAttempted : {$unattempted}</div>
    </div>
    <ol type="1">  
      <!-- {#if unattemptedlength}
    <button class="linkunattempt">All Question Is Attempted!!!</button>
    {/if} -->
      {#each allquestion as dataItem, i (dataItem)}
        <li id="list{i}">
          <button  id="ques-btn{i}" class="linkunattempt" on:click={goto(i)}
            >{JSON.parse(dataItem.content_text).question}</button
          >
        </li>
      {/each}
    </ol>
  </section>
{/if}

<style>
  .allitem{
    display: inline-flex;
  }
  section {
    position: fixed;
    top: 11%;
    left: 0px;
    height: 78%;
    border: 1px solid rgb(12, 11, 11);
    background: white;
    white-space: nowrap;
    overflow: scroll;
  }
  .linkunattempt{
    width: 407px;
    height: 34px;
    background-color: rgb(136, 239, 247);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .linkattempt{
    width: 407px;
    height: 34px;
    background-color: rgb(252, 252, 180);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .link {
    width: 407px;
    height: 34px;
    background-color: rgb(248, 201, 201);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .allquestion {
    background: rgb(248, 201, 201);
    font-weight: bold;
    font-size: 20px;

    text-align: left;
    cursor: grab;
    padding: 6px;
  }
  .attempted {
    background: rgb(252, 252, 180);
    
    font-weight: bold;

    font-size: 20px;
    text-align: left;
    cursor: grab;
    padding: 6px;
  }
  .unattempted {
    background: rgb(136, 239, 247);
   
    font-size: 20px;
    font-weight: bold;
    cursor: grab;
    text-align: left;
    padding: 6px;
  }
</style>

