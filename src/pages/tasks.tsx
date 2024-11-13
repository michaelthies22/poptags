import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: any;
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let unsubscribe: () => void;

    const setupTasksListener = async () => {
      try {
        const q = query(
          collection(db, 'tasks'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const taskList = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Task[];
            setTasks(taskList);
            setLoading(false);
            setError(null);
          },
          (error) => {
            console.error('Error fetching tasks:', error);
            setError(error.message);
            setLoading(false);
            if (error.code === 'failed-precondition') {
              toast({
                title: 'Index Creation Required',
                description: 'Please wait while the database index is being created. This may take a few minutes.',
                duration: 5000,
              });
            } else {
              toast({
                title: 'Error',
                description: `Failed to load tasks: ${error.message}`,
                variant: 'destructive',
              });
            }
          }
        );
      } catch (error) {
        const err = error as Error;
        console.error('Error setting up tasks listener:', err);
        setError(err.message);
        setLoading(false);
        toast({
          title: 'Error',
          description: `Failed to initialize tasks: ${err.message}`,
          variant: 'destructive',
        });
      }
    };

    setupTasksListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, toast]);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !user) return;

    try {
      await addDoc(collection(db, 'tasks'), {
        title: newTask,
        completed: false,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      setNewTask('');
      toast({
        title: 'Success',
        description: 'Task added successfully',
      });
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Error',
        description: `Failed to add task: ${err.message}`,
        variant: 'destructive',
      });
    }
  };

  const toggleTask = async (taskId: string, completed: boolean) => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'tasks', taskId), {
        completed: !completed,
      });
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Error',
        description: `Failed to update task: ${err.message}`,
        variant: 'destructive',
      });
    }
  };

  const updateTaskTitle = async (taskId: string, newTitle: string) => {
    if (!user || !newTitle.trim()) return;

    try {
      await updateDoc(doc(db, 'tasks', taskId), {
        title: newTitle.trim(),
      });
      setEditingTask(null);
      toast({
        title: 'Success',
        description: 'Task updated successfully',
      });
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Error',
        description: `Failed to update task: ${err.message}`,
        variant: 'destructive',
      });
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
      });
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Error',
        description: `Failed to delete task: ${err.message}`,
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Please sign in to manage your tasks</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error && error.includes('indexes')) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
          <p className="text-muted-foreground">
            Setting up the database. This may take a few minutes...
          </p>
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Manage your daily tasks and to-dos</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!newTask.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </form>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 border rounded-lg group hover:bg-accent/50 transition-colors"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id, task.completed)}
              />
              {editingTask === task.id ? (
                <Input
                  defaultValue={task.title}
                  onBlur={(e) => updateTaskTitle(task.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      updateTaskTitle(task.id, e.currentTarget.value);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <span
                  className={`flex-1 cursor-pointer ${
                    task.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                  onClick={() => setEditingTask(task.id)}
                >
                  {task.title}
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No tasks yet. Add your first task above!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}