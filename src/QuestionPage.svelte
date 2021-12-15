<script>
    import { allData,currentQuestion,attempted,pageNumber,useranswer,correctanswer,show} from "./question-store";
   
    function isuserclicked(event){
      if($useranswer[$currentQuestion].isCorrect ==""){
        attempted.update((attempt)=>attempt+1);
      }
      let selected_answer=event.target.value;
      let is_correct=event.target.getAttribute('is_correct');
      let user_input={
        choosenAns:selected_answer,
        isCorrect:is_correct,
      };
      $useranswer[$currentQuestion]=user_input; 
  }
    
</script>
<style>
    section{
        margin: 4rem 0rem;
        margin-left: -1rem;
    }
    #question-section{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 1rem;
    }
    label{
      display: block;
      margin: 1rem 0rem;
    }
    /* .shift{
        margin: 4rem 0rem;
        margin-left: 28rem;
    } */
</style>
<section class:shift={$show} >
{#each $allData as dataItem, i (dataItem)}
{#if $currentQuestion==i}
    <p>{JSON.parse(dataItem.content_text).question}</p>
    <div id="section" >
      {#each JSON.parse(dataItem.content_text).answers as ans, index (ans)}
        <label for="ans{index}" id="option{index}" >
          <input type="radio" name="ans"id="ans{index}" is_correct={ans.is_correct} value={ans.answer}
            on:click="{isuserclicked}"checked={$useranswer[$currentQuestion]?.choosenAns === ans.answer}
          />
        {@html ans.answer}
        </label>
      {/each}
    </div>
    {/if}
{/each}
</section>