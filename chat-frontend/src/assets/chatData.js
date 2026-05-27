export const contacts = [
  {
    id: "1",
    name: "Margot Fenn",
    avatar: "MF",
    lastMessage: "The files are on the shared drive now.",
    lastTime: "11:42",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Oscar Richter",
    avatar: "OR",
    lastMessage: "Can we push Thursday's call to Friday?",
    lastTime: "10:15",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Lena Vasquez",
    avatar: "LV",
    lastMessage: "That looks perfect. Let's go with it.",
    lastTime: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Theo Nakamura",
    avatar: "TN",
    lastMessage: "I'll send over the revised proposal.",
    lastTime: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Cleo Andersen",
    avatar: "CA",
    lastMessage: "Did you see the new brief from the client?",
    lastTime: "Mon",
    unread: 0,
    online: true,
  },
  {
    id: "6",
    name: "Rue Halliday",
    avatar: "RH",
    lastMessage: "Thanks for the feedback on the deck.",
    lastTime: "Sun",
    unread: 0,
    online: false,
  },
  {
    id: "7",
    name: "Felix Morrow",
    avatar: "FM",
    lastMessage: "The API keys should be in your inbox.",
    lastTime: "Sat",
    unread: 0,
    online: false,
  },
];

export const initialThreads = {
  1: [
    {
      id: "m1",
      text: "Hey, are the assets ready from yesterday's session?",
      from: "me",
      time: "11:20",
      status: "read",
    },
    {
      id: "m2",
      text: "Just finished exporting them. Give me five minutes.",
      from: "them",
      time: "11:24",
      status: "read",
    },
    {
      id: "m3",
      text: "Great, no rush. The deadline isn't until 3pm.",
      from: "me",
      time: "11:25",
      status: "read",
    },
    {
      id: "m4",
      text: "The files are on the shared drive now.",
      from: "them",
      time: "11:42",
      status: "read",
    },
    {
      id: "m5",
      text: "Also left some notes in the folder about the color variants.",
      from: "them",
      time: "11:42",
      status: "read",
    },
  ],

  2: [
    {
      id: "m1",
      text: "Hey Oscar, do you have the slides from last week?",
      from: "me",
      time: "09:50",
      status: "read",
    },
    {
      id: "m2",
      text: "Yes, will send them over shortly.",
      from: "them",
      time: "10:02",
      status: "read",
    },
    {
      id: "m3",
      text: "Can we push Thursday's call to Friday?",
      from: "them",
      time: "10:15",
      status: "delivered",
    },
  ],

  3: [
    {
      id: "m1",
      text: "Here's the revised layout for the landing page.",
      from: "me",
      time: "Yesterday",
      status: "read",
    },
    {
      id: "m2",
      text: "That looks perfect. Let's go with it.",
      from: "them",
      time: "Yesterday",
      status: "read",
    },
  ],

  4: [
    {
      id: "m1",
      text: "When can I expect the proposal revisions?",
      from: "me",
      time: "Yesterday",
      status: "read",
    },
    {
      id: "m2",
      text: "I'll send over the revised proposal.",
      from: "them",
      time: "Yesterday",
      status: "read",
    },
  ],

  5: [
    {
      id: "m1",
      text: "Did you see the new brief from the client?",
      from: "them",
      time: "Mon",
      status: "read",
    },
  ],

  6: [
    {
      id: "m1",
      text: "Thanks for the feedback on the deck.",
      from: "them",
      time: "Sun",
      status: "read",
    },
  ],

  7: [
    {
      id: "m1",
      text: "The API keys should be in your inbox.",
      from: "them",
      time: "Sat",
      status: "read",
    },
  ],
};

export const avatarColors = {
  1: "#8b6e4e",
  2: "#4e6e8b",
  3: "#6e4e8b",
  4: "#4e8b6e",
  5: "#8b4e4e",
  6: "#6e8b4e",
  7: "#8b8b4e",
};
