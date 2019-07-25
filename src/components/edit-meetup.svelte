<script>
  import { createEventDispatcher } from 'svelte';
  import TextInput from '../ui/text-input.svelte';
  import Button from '../ui/button.svelte';
  import Modal from '../ui/modal.svelte';
  import { isEmpty, isValidEmail } from '../utils/validation';
  import { meetupsStore } from '../store/meetups-store';

  export let id = null;

  let title = '';
  let subtitle = '';
  let description = '';
  let imageUrl = '';
  let address = '';
  let email = '';

  if (id) {
    const unsubscribe = meetupsStore.subscribe(items => {
      const selectedMeetup = items.find(i => i.id === id);
      if (selectedMeetup) {
        title = selectedMeetup.title;
        subtitle = selectedMeetup.subtitle;
        description = selectedMeetup.description;
        imageUrl = selectedMeetup.imageUrl;
        address = selectedMeetup.address;
        email = selectedMeetup.email;
      }
    });
    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: urlValid = !isEmpty(imageUrl);
  $: emailValid = !isEmpty(email) && isValidEmail(email);
  $: descriptionValid = !isEmpty(description);
  $: formValid = [titleValid, subtitleValid, addressValid, urlValid, emailValid, descriptionValid].every(Boolean);

  const handleSubmit = () => {
    const newMeetup = { title, subtitle, description, imageUrl, address, email };
    if (id) {
      fetch(`https://frontendmasters-1521299189822.firebaseio.com/meetups/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify(newMeetup),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(() => {
          meetupsStore.updateMeetup(id, newMeetup);
        })
        .catch(console.log);
    } else {
      fetch('https://frontendmasters-1521299189822.firebaseio.com/meetups.json', {
        method: 'POST',
        body: JSON.stringify({ ...newMeetup, isFavorite: false }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(data => {
          meetupsStore.addMeetup({ ...newMeetup, isFavorite: false, id: data.name });
        })
        .catch(console.log);
    }
    dispatch('close');
  };

  const handleClose = () => {
    dispatch('close');
  };

  const handleDelete = () => {
    fetch(`https://frontendmasters-1521299189822.firebaseio.com/meetups/${id}.json`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        meetupsStore.deleteMeetup(id);
        dispatch('close');
      })
      .catch(console.log);
  };
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:close>
  <form on:submit|preventDefault={handleSubmit}>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title"
      value={title}
      on:input={e => (title = e.target.value)} />

    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle"
      value={subtitle}
      on:input={e => (subtitle = e.target.value)} />
    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address"
      value={address}
      on:input={e => (address = e.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      valid={urlValid}
      validityMessage="Please enter a valid url"
      value={imageUrl}
      on:input={e => (imageUrl = e.target.value)} />
    <TextInput
      id="email"
      type="email"
      label="Email"
      valid={emailValid}
      validityMessage="Please enter a valid email"
      value={email}
      on:input={e => (email = e.target.value)} />
    <TextInput
      id="description"
      controlType="textarea"
      label="Description"
      valid={descriptionValid}
      validityMessage="Please enter a valid description"
      value={description}
      on:input={e => (description = e.target.value)} />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={handleClose}>Cancel</Button>
    <Button type="button" on:click={handleSubmit} disabled={!formValid}>Save</Button>
    {#if id}
      <Button type="button" on:click={handleDelete}>Delete</Button>
    {/if}
  </div>
</Modal>
