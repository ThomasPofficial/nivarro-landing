// Shared by middleware.ts (edge) and the /api/machine handler. Kept apart from
// fetchMachineView so the edge bundle doesn't pull in the HTML parser.
export const MACHINE_HEADER = 'x-nivarro-machine'
export const MACHINE_PATH_HEADER = 'x-nivarro-machine-path'
