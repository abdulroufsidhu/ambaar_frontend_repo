import { Branch } from "./Branch";

export interface Business {
  id?: string;
  name: string;
  email: string;
  location: Location;
  branches: Branch[];
}
