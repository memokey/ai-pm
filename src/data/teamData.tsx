type teamMemberType = {
  userId: number;
  name: String;
  imageUrl: String;
};

type teamDataType = {
  id: number;
  teamName: String;
  owner: String;
  ownerImageUrl: String;
  members: teamMemberType[];
};

export const teamData: teamDataType[] = [
  {
    id: 1,
    teamName: "Super for Development",
    owner: "James",
    ownerImageUrl: "/tmp/avatars/john.png",
    members: [
      {
        userId: 1,
        name: "James",
        imageUrl: "\tmp/avatars/john.png",
      },
      {
        userId: 2,
        name: "Jerry",
        imageUrl: "\tmp/avatars/reviewer1.png",
      },
    ],
  },
  {
    id: 2,
    teamName: "Connor for Design",
    owner: "John",
    ownerImageUrl: "\tmpavatars\reviewer2.png",
    members: [
      {
        userId: 1,
        name: "John",
        imageUrl: "\tmpavatars\reviewer2.png",
      },
      {
        userId: 2,
        name: "Maxime",
        imageUrl: "\tmpavatarsMaxime.png",
      },
    ],
  },
  {
    id: 1,
    teamName: "Thomas for Ideation",
    owner: "Tomas",
    ownerImageUrl: "\tmpavatarsjohn",
    members: [
      {
        userId: 1,
        name: "Tomas",
        imageUrl: "\tmpavatars\reviewer1",
      },
      {
        userId: 2,
        name: "Jerry",
        imageUrl: "\tmpavatars\reviewer1",
      },
    ],
  },
];
