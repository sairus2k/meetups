<script context="module">
  export function preload() {
    return this.fetch('https://frontendmasters-1521299189822.firebaseio.com/meetups.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res.json();
      })
      .then(data => {
        const loadedMeetups = Object.keys(data).map(id => ({ ...data[id], id }));
        loadedMeetups.reverse();
        return { loadedMeetups };
      })
      .catch(() => {
        this.error(500, 'could not fetch meetups');
      });
  }
</script>

<script>
  import ErrorModal from '../ui/error-modal.svelte';
  import LoadingSpinner from '../ui/loading-spinner.svelte';
  import MeetupGrid from '../components/meetup-grid.svelte';
  import EditMeetup from '../components/edit-meetup.svelte';
  import { meetupsStore } from '../store/meetups-store';

  export let loadedMeetups = [];

  meetupsStore.setMeetups(loadedMeetups);

  let editMode = false;
  let id;

  const clearError = () => {
    console.log('clear');
  };

  const handleClose = () => {
    editMode = false;
    id = null;
  };

  const handleOpen = () => {
    editMode = true;
  };

  const handleCloseDetails = () => {
    id = null;
  };
  const handleEditMeetup = event => {
    id = event.detail;
    editMode = true;
  };
</script>

<style>

</style>

<svelte:head>
  <title>All Meetups</title>
</svelte:head>
{#if editMode}
  <EditMeetup on:close={handleClose} {id} />
{/if}
<MeetupGrid meetups={$meetupsStore} on:edit={handleEditMeetup} />
