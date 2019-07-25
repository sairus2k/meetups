<script>
  import Header from './ui/header.svelte';
  import ErrorModal from './ui/error-modal.svelte';
  import LoadingSpinner from './ui/loading-spinner.svelte';
  import MeetupGrid from 'src/components/meetup-grid.svelte';
  import MeetupDetails from 'src/components/meetup-details.svelte';
  import EditMeetup from 'src/components/edit-meetup.svelte';
  import { meetupsStore } from './store/meetups-store';

  let editMode = false;
  let page = 'overview';
  let id;

  let isLoading = fetch('https://frontendmasters-1521299189822.firebaseio.com/meetups.json')
    .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      return res.json();
    })
    .then(data => {
      const loadedMeetups = Object.keys(data).map(id => ({ ...data[id], id }));
      meetupsStore.setMeetups(loadedMeetups.reverse());
    });

  const clearError = () => {
    isLoading = Promise.resolve();
  };

  const handleClose = () => {
    editMode = false;
    id = null;
  };

  const handleOpen = () => {
    editMode = true;
  };

  const handleShowDetails = event => {
    id = event.detail;
    page = 'details';
  };
  const handleCloseDetails = () => {
    page = 'overview';
    id = null;
  };
  const handleEditMeetup = event => {
    id = event.detail;
    editMode = true;
  };
  $: isOverview = page === 'overview';
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header>MeetUs</Header>
<main>
  {#if isOverview}
    {#if editMode}
      <EditMeetup on:close={handleClose} {id} />
    {/if}
    {#await isLoading}
      <LoadingSpinner />
    {:then}
      <MeetupGrid meetups={$meetupsStore} on:showDetails={handleShowDetails} on:edit={handleEditMeetup} />
    {:catch error}
      <ErrorModal message={error.message} on:close={clearError} />
    {/await}
  {:else}
    <MeetupDetails {id} on:close={handleCloseDetails} />
  {/if}
</main>
