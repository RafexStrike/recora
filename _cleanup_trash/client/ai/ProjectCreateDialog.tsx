import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, description: string) => Promise<void>;
  loading: boolean;
  children: React.ReactNode;
}

export default function ProjectCreateDialog({ open, onOpenChange, onSubmit, loading, children }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    
    try {
      await onSubmit(title, description);
      setTitle('');
      setDescription('');
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#141416] border-white/10 text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription className="text-gray-400">
            Keep your animations organized. A project can hold multiple animation generations.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Project Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. My Awesome 2D Short"
              className="bg-[#1a1a1f] border-white/10 text-white focus-visible:ring-primary"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="desc" className="text-sm font-medium">Description (Optional)</label>
            <Input
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of this project"
              className="bg-[#1a1a1f] border-white/10 text-white focus-visible:ring-primary"
              disabled={loading}
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading || !title.trim()}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
