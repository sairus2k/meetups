<script context="module">
  export function preload({ params }) {
    const { id } = params;
    return this.fetch(`https://frontendmasters-1521299189822.firebaseio.com/meetups/${id}.json`)
      .then(res => {
        if (!res.ok) {
          throw new Error('it`s not okay');
        }
        return res.json();
      })
      .then(data => {
        return { meetup: data };
      })
      .catch(() => {
        this.error(404, 'meetup not found');
      });
  }
</script>

<script>
  import MeetupDetails from '../components/meetup-details.svelte';
  export let meetup;
</script>

<MeetupDetails {meetup} />
