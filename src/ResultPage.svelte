
<script>
    import { fly,fade,slide, scale } from 'svelte/transition';
    import {
      allData,attempted,unattempted,currentQuestion,correctanswer,pageNumber,useranswer
    } from './question-store';
    import { beforeUpdate,afterUpdate } from "svelte";
    import Button from "./Button.svelte";
    
    let correct_answer=0;
    let incorrect_answer=0;
    let review_page=false;
    let result_page=true;
    afterUpdate(()=>{
      Object.keys($useranswer).forEach((questionnumber)=>{
      if($useranswer[questionnumber].isCorrect==='1'){
        correct_answer=correct_answer+1;
      }
      else
      if($useranswer[questionnumber].isCorrect==='0'){
        incorrect_answer=incorrect_answer+1;
      }
      })
    })
   
  import { createEventDispatcher } from "svelte";
  
  let forwardDisabled=false;
  let backwardDisabled=true;
  const dispatch=createEventDispatcher();

  function tomoveright(){
  currentQuestion.update((item) => item + 1);
	initialstage($currentQuestion);
  }

  function gotoQuestion(type) {
    let dispatchitem = '';
    if (type == 'prev') {
      pageNumber.update((num) => num - 1);
      dispatchitem = 'prevques';
    dispatch(dispatchitem);
    } else if (type == 'next') {
      pageNumber.update((num) => num + 1);
      dispatchitem = 'nextques';
      dispatch(dispatchitem);
    }
  }

  function tomoveleft(){
  currentQuestion.update((item) => item - 1);
	initialstage($currentQuestion);
  }

  function goto(i){
      currentQuestion.set(i);
      pageNumber.set(i+1);
      console.log("link is disable");
      result_page=false;
      review_page=true;
    }


    function StartAgain(){
      location.reload();
    }

  afterUpdate(() => {
    
    if ($pageNumber >= $allData.length) {
      forwardDisabled = true;
    } else {
      forwardDisabled = false;
    }
    if ($pageNumber <= 1) {
      backwardDisabled = true;
    } else {
      backwardDisabled = false;
    }
  });

  </script>
  {#if review_page}
  <div class="reviewpage">
  {#each $allData as dataItem, i (dataItem)}
  {#if $currentQuestion==i}
      <p>{JSON.parse(dataItem.content_text).question}</p>
      <div id="question" >
        {#each JSON.parse(dataItem.content_text).answers as ans, index (ans)}
          <label 
          for="ans{index}" 
          id="option{index}" 
          class="{ans.is_correct=='1' ? 'correctanswertext':
          ($useranswer.hasOwnProperty(i)&&$useranswer[i].choosenAns==ans.answer)||($useranswer.hasOwnProperty(i)&&$useranswer[i].choosenAns=='0')?'incorrectanswertext':'text'}" 

          >
            <input 
              type="radio" name="ans"
              id="ans{index}" is_correct={ans.is_correct} value={ans.answer}
              disabled=true checked={$useranswer[$currentQuestion]?.choosenAns === ans.answer}
            />
          {@html ans.answer}
          </label>
        {/each}
        <p class="explanation">Explanation:</p>
        <p class="explanation-detail">{JSON.parse(dataItem.content_text).explanation}</p>
      </div>
      {/if}
  {/each}
</div>
<footer >
  <div class="list-previous">
  <Button type="button" on:click={()=>gotoQuestion('prev')} disabled={backwardDisabled}>Previous</Button></div>
  <div><p>{$pageNumber} of 
    {$allData.length}</p></div>
  <div class="next-end">
  <Button type="button" on:click={()=>gotoQuestion('next')} disabled={forwardDisabled}>Next</Button>
  </div>
  <div class="startagain">
  <Button type="button" class="startagain" on:click={()=>StartAgain()}>Start Again</Button>
  </div>
  </footer>
  {/if}
  {#if result_page}
  <section transition:fly={{ y: -550, opacity: 1 }}>
        <header transition:fly={{ y: -550, opacity: 1 }}>
      <div class="allquestion">
        All Item : {$allData.length}
      </div>
      <div class="attempted" >
        Attempted : {$attempted}
      </div>
      <div class="unattempted" >
        UnAttempted : {$unattempted}
      </div>
      <div class="correct" >
        Correct Answer : {correct_answer}
      </div>
      <div class="incorrect" >
        Incorrect Answer : {incorrect_answer}
      </div>
    </header>
    
    <table border="2px" class="table">
      <tr>
        <th>Index No.</th>
        <th>Question</th>
        <th>Answer</th>
      </tr>

        {#each $allData as dataItem, i (dataItem)}
        <tr>
        <td>{i+1}</td>
        <td><a  on:click={goto(i)}
          id="link" class="link"
          >{JSON.parse(dataItem.content_text).question}</a
        ></td>
        <td>
          <div class="answer">

          {#each JSON.parse(dataItem.content_text).answers as ans, index (ans)}
          <p 
          class="{ans.is_correct=='1' ? 'correctanswercircle':
        ($useranswer.hasOwnProperty(i)&&$useranswer[i].choosenAns==ans.answer)||($useranswer.hasOwnProperty(i)&&$useranswer[i].choosenAns=='0')?'incorrectanswercircle':'circle'}" 
          >
            {index + 1}
          </p>
        {/each}
      </div>
        </td>
        <tr>
        {/each}
    </table>
  </section>
  {/if}
  

  <style>
    .startagain{
      margin: 12px;
      margin-left: 30px;
}
    .answer{
      display: flex;
    }
    .correctanswertext{
      color:green;
      font-weight:bold ;
    }
    
    .incorrectanswertext{
      color:rgb(223, 10, 28);
      font-weight:bold ;
    }

    .text{
      color: black;
    }
    .explanation-detail{
      border: 2px solid red;
      padding: 16px;
    }
    .explanation{
      font-weight: bold;
    }
    footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4rem;
    background: white;
    display: flex;
    justify-content: center;
    border: 2px solid red;
    background: #DEF6CA;
    box-shadow: 0 -1px 6px rgba(0,0,0,0.26);
 
}
.list-previous{
    padding: 12px;
}
.next-end{
    padding: 12px;
}
p{
    margin: 22px;
}
    .reviewpage{
      margin-top: 4rem;
    }
    .correctanswercircle {
    border: 2px solid rgb(14, 233, 68);
    border-radius: 50%;
    padding: 4px;
  }
  .incorrectanswercircle {
    border: 2px solid red;
    border-radius: 50%;
    padding: 4px;
  }
  .circle {
    border: 2px solid rgb(17, 17, 17);
    border-radius: 50%;
    padding: 4px;
  }
    td{
      text-align: left;
    }
    th{
      text-align: center;
    }
  .table{
    margin-left: 2rem;
    margin-right: 2rem;
    margin-top: 2rem;
    border: 2px solid red;
  }
   
      header{
          display: flex;
          justify-content: space-around;
          border: 2px solid red;
          margin: 0rem,1rem;
      }
    section {
      position: absolute;
      top: 15%;
      left: 0;
      width: 100%;
      border-right: 1px solid rgb(253, 246, 246);
      background: #fff;
      white-space: pre-wrap;
      
    }
    
    .allquestion {
      background: white;
    
      font-weight: bold;
      cursor: pointer;
      padding: 33px;
    }
    .attempted {
      background: white;
     
      font-weight: bold;

      cursor: pointer;

      padding: 31px;
    }
    .unattempted {
      background: white;
     
      font-weight: bold;

      cursor: pointer;
      padding: 34px;
    }
    .correct {
      background: white;
      
      font-weight: bold;
      cursor: pointer;

      padding: 31px;
    }
    .incorrect {
      background: white;
      
      font-weight: bold;

      cursor: pointer;
      padding: 34px;
    }
  </style>
  