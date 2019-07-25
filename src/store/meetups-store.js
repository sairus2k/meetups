import { writable } from 'svelte/store';

const meetups = writable([]);

export const meetupsStore = {
  subscribe: meetups.subscribe,
  setMeetups: meetups.set,
  addMeetup: meetup => {
    meetups.update(items => [meetup, ...items]);
  },
  updateMeetup: (id, meetup) => {
    meetups.update(items => {
      const updatedMeetupIndex = items.findIndex(m => m.id === id);
      const updatedMeetup = items[updatedMeetupIndex];
      items[updatedMeetupIndex] = { ...updatedMeetup, ...meetup };
      return items;
    });
  },
  toggleFavorite: id => {
    meetups.update(items => {
      const updatedMeetupIndex = items.findIndex(m => m.id === id);
      const updatedMeetup = items[updatedMeetupIndex];
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      items[updatedMeetupIndex] = updatedMeetup;
      return items;
    });
  },
  deleteMeetup: id => {
    meetups.update(items => items.filter(i => i.id !== id));
  },
};
