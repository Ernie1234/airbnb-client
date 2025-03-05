import { Comment } from "./Comment";

const commentsArr = [
  {
    id: "1",
    user: "John Doe",
    content:
      "Stayed here for the first part of a road trip around Norway and it was absolutely perfect. The views were stunning and it was incredibly peaceful. It was just a beautiful spot to stay.",
    date: new Date("2022-02-10"),
    since: "5 years on Airbnb",
    rating: 4.5,
    imgSrc: "/Images/avatar.webp",
  },
  {
    id: "2",
    user: "Jane Smith",
    content:
      "I had a great time in this place. The staff were friendly and the food was delicious. I highly recommend it to anyone looking for a nice place to stay.",
    date: new Date("2021-12-05"),
    since: "3 years on Airbnb",
    rating: 4.8,
    imgSrc: "/Images/avatar.webp",
  },
  {
    id: "3",
    user: "Mike Johnson",
    content:
      "This place was perfect for a family vacation. The staff were attentive and the food was delicious. I would definitely stay here again.",
    date: new Date("2021-09-20"),
    since: "2 years on Airbnb",
    rating: 4.7,
    imgSrc: "/Images/avatar.webp",
  },
  {
    id: "4",
    user: "Sarah Brown",
    content:
      "This place was perfect for a family vacation. The staff were attentive and the food was delicious. I would definitely stay here again.",
    date: new Date("2021-07-15"),
    since: "1 year on Airbnb",
    rating: 4.6,
    imgSrc: "/Images/avatar.webp",
  },
];

export const ListingComments = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      {commentsArr.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};
