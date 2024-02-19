export interface User {
  Email: string;
  Password: string;
  Firstname: string;
  Lastname: string;
  Username: string;
  DOB: Date;
  Image: File | null;
  Gender: string;
}

export interface Host extends User {
  Bio: string;
}

export interface Host extends User {
  Bio: string;
  Interest: string[];
}

export type Participant = User;
export type Participant = User;

export const createHost = () => {
  const user: Host = {
    Firstname: "",
    Lastname: "",
    Username: "",
    Bio: "",
    Gender: "",
    Email: "",
    Password: "",
    DOB: new Date(),
    Interest: [],
    Image: null,
  };
  return user;
};

export const createParticipant = () => {
  const user: Participant = {
    Firstname: "",
    Lastname: "",
    Username: "",
    Gender: "",
    Email: "",
    Password: "",
    DOB: new Date(),
    Image: null,
  };
  return user;
};

export const isHost = (obj: User): obj is Host => {
  return "Bio" in obj;
};

export const isParticipant = (obj: User): obj is Participant => {
  return !("Bio" in obj);
};
