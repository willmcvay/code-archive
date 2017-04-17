import { IAction } from '../../shared/interfaces/client';

export class MatchesUpcomingState {
  matchList: any[];
  upcomingStats: any;

  constructor() {
    this.matchList = [];
    this.upcomingStats = {};
  }
};

export const initialState = new MatchesUpcomingState();

export default ((
  state: MatchesUpcomingState = initialState,
  action: IAction<any>
  ): MatchesUpcomingState => {

  switch (action.type) {
    default:
      return state;
  }
});
