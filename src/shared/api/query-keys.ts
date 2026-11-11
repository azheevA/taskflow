export const queryKeys = {
  system: {
    all: ["system"] as const,
    health: () => [...queryKeys.system.all, "health"] as const
  },
  tasks: {
    all: ["tasks"] as const,
    lists: () => [...queryKeys.tasks.all, "list"] as const,
    detail: (taskId: string) => [...queryKeys.tasks.all, "detail", taskId] as const
  }
} as const;
