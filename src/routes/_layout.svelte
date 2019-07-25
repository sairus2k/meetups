<script>
  import Header from '../ui/header.svelte';
	export let segment;
</script>

<style>

  main {
    margin-top: 5rem;
  }
</style>

<Header>MeetUs</Header>
<main>
	<slot></slot>
</main>
