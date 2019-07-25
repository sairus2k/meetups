<script>
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import MeetupItem from './meetup-item.svelte';
  import MeetupFilter from './meetup-filter.svelte';
  import Button from '../ui/button.svelte';
  export let meetups = [];

  const dispatch = createEventDispatcher();

  let favorite = 0;
  let favoritesOnly = false;

  const setFilter = event => {
    favorite = event.detail;
    favoritesOnly = favorite === 1;
  };

  $: filteredMeetups = favoritesOnly ? meetups.filter(m => m.isFavorite) : meetups;

  const handleOpen = () => {
    dispatch('edit');
  };
</script>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  #meetups-controls {
    display: flex;
    justify-content: space-between;
    margin: 1rem;
  }
  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section id="meetups-controls">
  <MeetupFilter {favorite} on:filter={setFilter} />
  <Button on:click={handleOpen}>New Meetup</Button>
</section>
<section id="meetups">
  {#if filteredMeetups.length === 0}
    <div>Add more meetups</div>
  {/if}
  {#each filteredMeetups as meetup (meetup.id)}
    <div transition:scale animate:flip={{ duration: 300 }}>
      <MeetupItem {...meetup} on:edit />
    </div>
  {/each}
</section>
