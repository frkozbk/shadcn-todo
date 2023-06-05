"use client";
import {
  ITodosProviderProps,
  SortOptions,
  Todo,
  TodoStatus,
  TodosContextType,
} from "@/context/TodosContext/types";
import { createContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const todosContext = createContext<TodosContextType>({} as TodosContextType);
const _todos: Todo[] = [
  {
    id: 1,
    title: "Master the Art of Juggling",
    description:
      "Learn to juggle three flaming torches while riding a unicycle. Start with basic juggling techniques and gradually progress to advanced fire juggling skills.",
    createdAt: 1672345200,
    updatedAt: 1672345200,
    status: TodoStatus.ACTIVE,
  },
  {
    id: 2,
    title: "Conquer Mount Everest",
    description:
      "Embark on an epic adventure to scale the tallest peak in the world. Prepare physically and mentally for extreme conditions, altitude sickness, and unpredictable weather.",
    createdAt: 1672345200,
    updatedAt: 1672345200,
    status: TodoStatus.ACTIVE,
  },
  {
    id: 3,
    title: "Train a Dragon",
    description:
      "Become a dragon whisperer and train a majestic fire-breathing creature. Teach it tricks, agility, and even how to play fetch with sheep.",
    createdAt: 1672345200,
    updatedAt: 1672345200,
    status: TodoStatus.ACTIVE,
  },
  {
    id: 4,
    title: "Invent a Time Machine",
    description:
      "Dive into the realm of theoretical physics and create a time machine capable of traveling to any era in history. Be cautious of the space-time continuum!",
    createdAt: 1672345200,
    updatedAt: 1672345200,
    status: TodoStatus.ACTIVE,
  },
  {
    id: 5,
    title: "Build a Treehouse on Mars",
    description:
      "Use your engineering skills to construct a habitable treehouse on the Red Planet. Design an airtight structure with self-sustaining systems for water, food, and oxygen.",
    createdAt: 1672345200,
    updatedAt: 1672345200,
    status: TodoStatus.ACTIVE,
  },
  {
    id: 6,
    title: "Become a Ninja Warrior",
    description:
      "Train rigorously in various martial arts disciplines, acrobatics, and obstacle course challenges. Prepare for the ultimate test of agility, strength, and mental fortitude.",
    createdAt: 1672345200,
    updatedAt: 1672345200,
    status: TodoStatus.ACTIVE,
  },
  {
    id: 7,
    title: "Discover Atlantis",
    description:
      "Embark on an underwater expedition to uncover the mythical city of Atlantis. Dive deep into the ocean depths, explore ancient ruins, and decipher mysterious symbols.",
    createdAt: 1672345200,
    updatedAt: 1672345200,
    status: TodoStatus.ACTIVE,
  },
  {
    id: 8,
    title: "Win an Interplanetary Cooking Competition",
    description:
      "Showcase your culinary skills by participating in an interplanetary cooking competition. Create innovative dishes using extraterrestrial ingredients and out-of-this-world flavors.",
    createdAt: 1672345200,
    updatedAt: 1672345200,
    status: TodoStatus.ACTIVE,
  },
  {
    id: 9,
    title: "Become a Professional Pirate",
    description:
      "Set sail on a pirate ship, learn to navigate the high seas, and engage in swashbuckling adventures. Master the art of sword fighting and plunder hidden treasures.",
    createdAt: 1672345200,
    updatedAt: 1672345200,
    status: TodoStatus.ACTIVE,
  },
  {
    id: 10,
    title: "Solve the Riddle of the Sphinx",
    description:
      "Journey to the enigmatic Sphinx in Egypt and unravel its age-old riddle. Combine wit, logic, and historical knowledge to unlock the secrets of this ancient guardian.",
    createdAt: 1672345200,
    updatedAt: 1672345200,
    status: TodoStatus.ACTIVE,
  },
];

const TodosProvider = ({ children }: ITodosProviderProps) => {
  const [todoStatus, setTodoStatus] = useState<TodoStatus>(TodoStatus.ALL);
  const [sort, setSort] = useState<SortOptions>(SortOptions.NewestFirst);
  const [todos, setTodos] = useState(() => _todos.slice());

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => {
      return [todo, ...prevTodos];
    });
  };
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };
  const editTodo = (todo: Todo) => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) => {
        if (prevTodo.id === todo.id) {
          return todo;
        }
        return prevTodo;
      });
    });
  };
  const toggleTodoStatus = (id: number) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            status:
              todo.status === TodoStatus.ACTIVE
                ? TodoStatus.COMPLETED
                : TodoStatus.ACTIVE,
            updatedAt: Date.now(),
          };
        }
        return todo;
      });
    });
  };
  const sortBy = (sortOption: SortOptions) => {
    setSort(sortOption);
  };
  const filterBy = (todoStatus: TodoStatus) => {
    setTodoStatus(todoStatus);
  };
  const filteredTodos = useMemo(() => {
    if (todoStatus === TodoStatus.ALL) return todos;
    return todos.filter((todo) => {
      return todo.status === todoStatus;
    });
  }, [todoStatus, todos]);
  const sortedTodos = useMemo(() => {
    switch (sort) {
      case SortOptions.OldestFirst:
        return filteredTodos.sort((a, b) => a.createdAt - b.createdAt);
      case SortOptions.NewestFirst:
        return filteredTodos.sort((a, b) => b.createdAt - a.createdAt);
      case SortOptions.OldestUpdatedFirst:
        return filteredTodos.sort((a, b) => a.updatedAt - b.updatedAt);
      case SortOptions.NewestUpdatedFirst:
        return filteredTodos.sort((a, b) => b.updatedAt - a.updatedAt);
      default:
        return todos;
    }
  }, [todos, sort, filteredTodos]);
  return (
    <todosContext.Provider
      value={{
        todos: sortedTodos,
        addTodo,
        editTodo,
        deleteTodo,
        toggleTodoStatus,
        sortBy,
        filterBy,
        todoStatus,
        sort,
      }}
    >
      {children}
    </todosContext.Provider>
  );
};
export { TodosProvider, todosContext };
