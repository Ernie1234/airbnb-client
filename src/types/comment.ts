export interface CreateCommentData {
  listingId: string;
  content: string;
  rating: number;
}

export interface UpdateCommentData {
  commentId: string;
  content: string;
  rating: number;
}

export interface IComment {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  userId: {
    id: string;
    name: string;
    imageSrc: string;
    createdAt: string;
  };
}

export interface ICommentApiResponse {
  data: {
    comments: IComment[];
    total: number;
    page: number;
    limit: number;
  };
}
