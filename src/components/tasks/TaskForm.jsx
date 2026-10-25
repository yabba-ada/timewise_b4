import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TaskFormBody from "@/components/tasks/TaskFormBody";

export default function TaskForm({ open, onOpenChange, task, goals, onSubmit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>{task ? "Edit task" : "New task"}</DialogTitle>
        </DialogHeader>
        <TaskFormBody task={task} goals={goals} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}