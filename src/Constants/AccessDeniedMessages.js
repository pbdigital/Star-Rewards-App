import {Images} from 'src/Assets/Images';

export const ACCESS_DENIED_MESSAGE = {
  rewards: {
    title: 'Ahoy, little explorer!',
    message:
      "It seems you've stumbled upon a treasure trove of rewards. But hold on tight! These treasures are waiting for your parent's approval before they can be claimed.\n\nWhy not ask for their guidance and unlock the wonders of the universe together?",
    headerImage: {
      source: Images.AccessChildRewards,
      width: 120,
      height: 135,
    },
  },
  bonus: {
    title: 'Whoa there, star seeker!',
    message:
      "Those bonus stars are shimmering with potential, but they're waiting for your parent's magical touch to be claimed.\n\nWhy not share your accomplishments with them and unlock the galaxy together?",
    headerImage: {
      source: Images.AccessChildBonusRewards,
      width: 130,
      height: 150,
    },
  },
  starRewards: {
    title: "Oops! It looks like you're reaching for the stars.",
    message:
      'But hold tight! Only your amazing parent can help you collect stars for now.\n\nWhy not ask them to celebrate your stellar achievements together?',
    headerImage: {
      source: Images.AccessChildStarRewards,
      width: 140,
      height: 124,
    },
  },
};
