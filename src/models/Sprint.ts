import RetroEntry from './RetroEntry';

export default interface Sprint {
  id: string;
  name: string;
  start: Date;
  end: Date;
  good: RetroEntry[];
  bad: RetroEntry[];
  todo: RetroEntry[];
}
