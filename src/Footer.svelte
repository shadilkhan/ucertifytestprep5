<script>
import Button from "./Button.svelte";
import { beforeUpdate, onMount } from "svelte";
import {allData,pageNumber} from "./question-store";
import { afterUpdate } from "svelte";
	import { createEventDispatcher } from "svelte";
  let minute = 29;
  let second = 59;
  let timer;
  let forwardDisabled=false;
  let backwardDisabled=true;
  const dispatch=createEventDispatcher();
  function navigateQuestion(type) {
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

  beforeUpdate(() => {
    
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
onMount(() => {
    timer = setInterval(() => {
      second--;
      if (second == 0) {
        minute--;
        second = 60;
        if (minute < 0) {
          clearInterval(timer);
          minute = 0;
          second = 0;
          alert("timeover");
        }
      }
    }, 1000);
  });
</script>
<style>
footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4rem;
    background: rgb(244, 246, 247);
    display: flex;
    justify-content: center;
    border: 2px solid rgb(245, 13, 13);
    box-shadow: 0 -1px 6px rgba(0,0,0,0.26);
    /* border: 2px solid black; */
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
/* .glow-on-hover {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
} */

.glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 0px;
}

.glow-on-hover:active {
    color: rgb(242, 248, 248)
}

.glow-on-hover:active:after {
    background: transparent;
}

.glow-on-hover:hover:before {
    opacity: 1;
}

.glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #DEF6CA;
    left: 0;
    top: 0;
    border-radius: 0px;
}

@keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
}

</style>

<footer class="glow-on-hover">
<div id="timer">
    <p>{minute}:
      {second}</p>
</div>
<div class="list-previous">

<Button type="button" on:click={()=>dispatch('show')}>List</Button>

<Button type="button" on:click={()=>navigateQuestion('prev')} disabled={backwardDisabled}>Previous</Button></div>
<div><p>{$pageNumber}
   of {$allData.length}</p></div>
<div class="next-end">

<Button type="button" on:click={()=>navigateQuestion('next')} disabled={forwardDisabled}>Next</Button>

<Button type="button" on:click={()=>dispatch('isopen')
}>End Test</Button>

</div>

</footer>