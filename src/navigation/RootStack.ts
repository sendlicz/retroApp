import { Sprint, TableKey } from '../models';

export type RootStack = {
  SprintList: undefined;
  Sprint: { sprint: Sprint };
  AddSprint: undefined;
  AddRetroEntry: { tableKey: TableKey; sprintId: string };
};
