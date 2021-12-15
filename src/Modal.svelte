<script>
    import { createEventDispatcher } from "svelte";
    import { fly, fade } from "svelte/transition";
    import Button from "./Button.svelte";
    import { attempted,unattempted } from "./question-store";
    import { allData } from "./question-store";

    import { beforeUpdate } from "svelte";
    beforeUpdate(()=>{
      $unattempted=$allData.length-$attempted;
    })
  
    // export let title;
  

    const dispatch = createEventDispatcher();
  
    function confirmModal() {
      dispatch("confirm");
    }
    function closeModal() {
      dispatch("cancel");
    }
  </script>
  
  <style>
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.75);
      z-index: 10;
    }
  
    .modal {
      position: fixed;
      top: 10vh;
      left: 10%;
      width: 80%;
      max-height: 80vh;
      background: white;
      border-radius: 5px;
      z-index: 100;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
      overflow: scroll;
    }
  
    h1 {
      text-align: center;
      padding: 1rem;
      margin: 0;
      border-bottom: 1px solid rgb(14, 6, 6);
      font-family: "Roboto Slab", sans-serif;
    }
    h2{
      text-align: center;
    }
  
    .content {
      padding: 1rem;
    }
  
    footer {
      padding: 1rem;
      display: flex;
      justify-content: space-evenly;
    }
  
    @media (min-width: 768px) {
      .modal {
        width: 40rem;
        left: calc(50% - 20rem);
      }
    }
  </style>
  
  <div transition:fade class="modal-backdrop" on:click={closeModal} />
  <div transition:fly={{ y: 300,opacity:1 }} class="modal">
    <h1>Unattempted:{$unattempted}</h1>
    <h1>Attempted:{$attempted}</h1>
    <h2>Are You Sure,You want to end the test??</h2>
    <div class="content">
      <slot />
    </div>
    <footer>
      <slot name="footer">
        <Button on:click={confirmModal}>Confirm</Button>
        <Button on:click={closeModal}>Close</Button>
      </slot>
    </footer>
  </div>
  