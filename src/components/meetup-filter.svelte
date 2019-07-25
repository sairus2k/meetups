<script>
  import { createEventDispatcher } from 'svelte';
  export let favorite;

  const dispatch = createEventDispatcher();

  const handleFilterClick = filter => () => {
    dispatch('filter', filter);
  };
</script>

<style>
  div {
    font-size: 0px;
  }

  button {
    background: #aaaaaa;
    font: inherit;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid #aaaaaa;
    padding: 0.5rem 1rem;
  }

  button:focus {
    outline: none;
  }

  button:first-of-type {
    border-radius: 5px 0 0 5px;
  }

  button:last-of-type {
    border-radius: 0 5px 5px 0;
  }

  button:hover,
  button:active,
  button.active,
  .active {
    background: #cf0056;
    border-color: #cf0056;
    color: white;
  }
</style>

<div>
  <button class:active={favorite === 0} type="button" on:click={handleFilterClick(0)}>All</button>
  <button class:active={favorite === 1} type="button" on:click={handleFilterClick(1)}>Favorites</button>
</div>
