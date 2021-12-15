<script>
	import NavigationBar from "./NavigationBar.svelte";
	import Button from "./Button.svelte";
	import Footer from "./Footer.svelte";
	import QuestionPage from "./QuestionPage.svelte";
	import Modal from "./Modal.svelte";
	import ResultPage from "./ResultPage.svelte";
	import { currentQuestion, useranswer ,show} from "./question-store";
	import ListPage from "./ListPage.svelte";

	
	let startpage=true;
	let isopenModal=false;
	let isconfirmModal=false;
	function startPage(){
		startpage=!startpage;
	}
	function showSidebar(){
	show.set(!$show);
	}
	
   function backwardQuestion() {
    currentQuestion.update((item) => item - 1);
	initialstage($currentQuestion);
  }

function openModal(){
	isopenModal=!isopenModal;
}
function closeModal(){
	isopenModal=!isopenModal;

}
initialstage($currentQuestion);
function forwardQuestion() {
    currentQuestion.update((item) => item + 1);
	initialstage($currentQuestion);

  }
function confirmModal(){
isconfirmModal=!isconfirmModal;
}

function initialstage($currentQuestion) {
    if (!$useranswer[$currentQuestion]) {
      let user_input = { choosenAns: '', isCorrect: ''};
      $useranswer[$currentQuestion] = user_input;
    }
  }
</script>

<main>
	<NavigationBar/>
	{#if isconfirmModal}
	<ResultPage on:nextques={()=>forwardQuestion()}
		on:prevques={()=>backwardQuestion()}/>
	{:else}
	{#if startpage}
	<div id="startbutton">
		<Button type="button" on:click={startPage}>Start Test</Button>
	</div>
	{:else}
	<QuestionPage/>
	<Footer 
	on:show={showSidebar} 
	on:nextques={()=>forwardQuestion()}
	on:prevques={()=>backwardQuestion()}
	on:isopen={openModal}
	/>
	{#if $show}
	<ListPage/>
	{/if}
	{#if isopenModal}
	<Modal on:cancel={closeModal} on:confirm={confirmModal}/>
	{/if}
	{/if}
{/if}
</main>

<style>
	#startbutton{
	 position: absolute;
	 left: 39.5rem;
	 top: 21rem;
	}
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>