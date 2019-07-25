<script>
  import Modal from './modal.svelte';
  export let message;
</script>

<Modal title="An error occurred!" on:close>
  <p>{message}</p>
</Modal>
