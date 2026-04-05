import bull from 'bull';
export const taskqueue = new bull("taskss", "redis://127.0.0.1:6379");
//# sourceMappingURL=workerqueue.js.map