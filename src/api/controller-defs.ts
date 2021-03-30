import { SWAPIEndpoint } from './generic-api';

interface ControllerDefs {
  detailsData: string[];
}

const controllerData: Map<string, ControllerDefs> = new Map();

controllerData.set('people', {
  detailsData: ['name', 'mass', 'hair_color', 'skin_color', 'gender'],
});

export const getDetailData = (controller: SWAPIEndpoint): string[] | null => {
  const column = controllerData.get(controller);
  if (!column) return null;
  else return column.detailsData;
};
