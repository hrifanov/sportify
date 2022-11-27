import { EventGoal } from 'src/modules/matches/molecules/EventGoal';
import { EventPenalty } from 'src/modules/matches/molecules/EventPenalty';

export const MatchEvent = ({ event, ...rest }) => {
  const Component = {
    goal: EventGoal,
    penalty: EventPenalty,
  }[event.type];

  return <Component event={event} {...rest} />;
};
