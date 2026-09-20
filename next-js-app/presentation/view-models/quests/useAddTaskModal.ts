'use client';

import { useState } from 'react';
import { TaskAssignee } from '../../types';

export interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  questId: number | null;
  onAddTask: (questId: number, content: string, assignee: TaskAssignee) => void;
}

export interface TaskAssigneeOption {
  value: TaskAssignee;
  label: string;
  sublabel: string;
}

const ASSIGNEE_OPTIONS: TaskAssigneeOption[] = [
  {
    value: 'ME',
    label: '나',
    sublabel: '내 담당',
  },
  {
    value: 'PARTNER',
    label: '팀원',
    sublabel: '다른 팀원',
  },
  {
    value: 'BOTH',
    label: '공동 (모두 함께)',
    sublabel: '다 같이 하기',
  },
];

export function useAddTaskModal({
  isOpen,
  onClose,
  questId,
  onAddTask,
}: AddTaskModalProps) {
  const [content, setContent] = useState('');
  const [assignee, setAssignee] = useState<TaskAssignee>('BOTH');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || questId === null) return;
    onAddTask(questId, content.trim(), assignee);
    setContent('');
    setAssignee('BOTH');
    onClose();
  };

  return {
    isOpen,
    content,
    assignee,
    assigneeOptions: ASSIGNEE_OPTIONS,
    handlers: {
      onClose,
      onContentChange: setContent,
      onAssigneeChange: setAssignee,
      onSubmit: handleSubmit,
    },
  };
}

export type AddTaskModalViewModel = ReturnType<typeof useAddTaskModal>;
